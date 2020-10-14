import Categories, { ICategories } from './resources/Categories';
import Groups, { IGroups } from './resources/Groups';
import Messages, { IMessages } from './resources/Messages';
import Notifications, { INotifications } from './resources/Notifications';
import Posts, { IPosts } from './resources/Posts';
import Preferences, { IPreferences } from './resources/Preferences';
import Tags, { ITags } from './resources/Tags';
import Topics, { ITopics } from './resources/Topics';
import Uploads, { IUploads } from './resources/Uploads';
import Users, { IUsers } from './resources/Users';

import { buildQueryString, createBody, ApiError } from './utils';
import { decamelizeKeys, camelizeKeys } from 'humps';

const VERSION = require('../package.json').version;

const resources = {
  Categories,
  Groups,
  Messages,
  Notifications,
  Posts,
  Preferences,
  Tags,
  Topics,
  Uploads,
  Users,
};

interface RequestOptions {
  path?: string;
  headers?: { [key: string]: string };
  body?: Object;
  method?: string;
}

interface GenObject {
  [key: string]: any;
}

interface ConfigInterface {
  apiKey: string | null;
  apiUsername: string | null;
  userApiKey?: string | null;
  baseUrl?: string | null;
}

export interface DiscourseInterface {
  _API_USERNAME: string | null;
  config(options: ConfigInterface): void;
  requestHeaders(): Object;
  createBody(body: Object): Object;
  get(options: RequestOptions): Promise<any>;
  post(options: RequestOptions): Promise<any>;
  put(options: RequestOptions): Promise<any>;
  delete(options: RequestOptions): Promise<any>;
  request(options?: { [key: string]: any }): Promise<any>;
  categories?: ICategories;
  groups?: IGroups;
  messages?: IMessages;
  notifications?: INotifications;
  posts?: IPosts;
  preferences?: IPreferences;
  tags?: ITags;
  topics?: ITopics;
  uploads?: IUploads;
  users?: IUsers;
}

export default class Discourse implements DiscourseInterface {
  _BASE_URL: string;
  _USER_API_KEY: string;
  _API_KEY: string | null;
  _API_USERNAME: string | null;
  isUsingAdminAPI: string;

  constructor(
    userApiKey: string,
    baseUrl: string,
    apiKey: string | null = null,
  ) {
    this._BASE_URL = baseUrl;
    this._USER_API_KEY = userApiKey;

    // Admin User API
    this._API_KEY = apiKey;

    for (let resource in resources) {
      this[resource.toLowerCase()] = new resources[resource](this);
    }
  }

  config = (
    { userApiKey, baseUrl, apiUsername, apiKey }: ConfigInterface = {
      apiUsername: null,
      apiKey: null,
    },
  ) => {
    this._USER_API_KEY = userApiKey;
    this._BASE_URL = baseUrl;

    // Admin User API
    this._API_KEY = apiKey;
    this._API_USERNAME = apiUsername;

    // If we are using the Admin API then we'll need to include
    // the API key and username in each request either as part
    // of our URL params or as part of our POST body
    this.isUsingAdminAPI = this._API_KEY && this._API_USERNAME;
  };

  requestHeaders() {
    return {
      'User-Agent': `DiscourseJS ${VERSION}`,
      ...(this._USER_API_KEY ? { 'User-Api-Key': this._USER_API_KEY } : {}),
    };
  }

  createBody = (body: Object): Object => {
    return this.isUsingAdminAPI
      ? createBody({
          ...body,
          api_key: this._API_KEY,
          api_username: this._API_USERNAME,
        })
      : createBody(body);
  };

  get = ({ path, headers }: RequestOptions = {}): Promise<any> => {
    return this.request({
      method: 'GET',
      headers,
      path: this.isUsingAdminAPI
        ? buildQueryString(path, {
            api_key: this._API_KEY,
            api_username: this._API_USERNAME,
          })
        : path,
    });
  };

  post = ({ path, headers, body }: RequestOptions): Promise<any> => {
    return this.request({
      method: 'POST',
      headers,
      path,
      body: this.createBody(body),
    });
  };

  put({ path, headers, body }: RequestOptions): Promise<any> {
    return this.request({
      method: 'PUT',
      headers,
      path,
      body: this.createBody(body),
    });
  }

  delete({ path, headers, body }: RequestOptions): Promise<any> {
    return this.request({
      method: 'DELETE',
      headers,
      path,
      body: this.createBody(body),
    });
  }

  request = (options: GenObject): Promise<any> => {
    const { body, method, path, headers } = options;

    const fetchOptions = {
      method,
      headers: {
        ...this.requestHeaders(),
        ...headers,
      },
      body,
      mimeType: 'multipart/form-data',
    };

    return fetch(`${this._BASE_URL}/${path}`, fetchOptions)
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (response.ok) {
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return camelizeKeys(response.json());
          } else {
            /**
             * If our response is OK but is not json
             * just resolve with response.text().
             * This happens when we DELETE a topic
             * because nothing is returned from the request.
             */
            return response.text();
          }
        } else {
          const { status, statusText } = response;
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json().then(json => {
              throw new ApiError(status, statusText, '', json.errors);
            });
          } else {
            return response.text().then(text => {
              throw new ApiError(status, statusText, text);
            });
          }
        }
      })
      .catch(error => {
        if (error instanceof ApiError) throw error;
        throw new Error(error);
      });
  };
}
