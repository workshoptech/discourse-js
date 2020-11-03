import Categories, { ICategories } from './resources/Categories';
import Groups, { IGroups } from './resources/Groups';
import Messages, { IMessages } from './resources/Messages';
import Notifications, { INotifications } from './resources/Notifications';
import Posts, { IPosts } from './resources/Posts';
import Preferences, { IPreferences } from './resources/Preferences';
import Topics, { ITopics } from './resources/Topics';
import Uploads, { IUploads } from './resources/Uploads';
import Users, { IUsers } from './resources/Users';

import { buildQueryString, createBody, ApiError } from './utils';
import { decamelizeKeys, camelizeKeys } from 'humps';

export * from './resources/index';
export * from './types/index';
export * from './utils';

const VERSION = require('../package.json').version;

const resources = {
  Categories,
  Groups,
  Messages,
  Notifications,
  Posts,
  Preferences,
  Topics,
  Uploads,
  Users,
} as const;

interface RequestOptions {
  path?: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  method?: string;
}

type FinalRequestOptions = Omit<RequestOptions, 'body'> & {
  body?: BodyInit;
};

interface ConfigInterface {
  apiKey: string | null;
  apiUsername: string | null;
  userApiKey?: string | null;
  baseUrl?: string | null;
}

export default class Discourse {
  _BASE_URL: string;
  _USER_API_KEY: string;
  _API_KEY: string | null;
  _API_USERNAME: string | null;
  isUsingAdminAPI: string;
  categories: ICategories;
  groups: IGroups;
  messages: IMessages;
  notifications: INotifications;
  posts: IPosts;
  preferences: IPreferences;
  topics: ITopics;
  uploads: IUploads;
  users: IUsers;

  constructor(
    userApiKey: string,
    baseUrl: string,
    apiKey: string | null = null,
  ) {
    this._BASE_URL = baseUrl;
    this._USER_API_KEY = userApiKey;

    // Admin User API
    this._API_KEY = apiKey;

    let resource: keyof typeof resources;
    for (resource in resources) {
      this[resource.toLowerCase()] = new resources[resource](this);
    }
  }

  config = (
    { userApiKey, baseUrl, apiUsername, apiKey }: ConfigInterface = {
      apiUsername: null,
      apiKey: null,
    },
  ): void => {
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

  requestHeaders(): Record<string, string> {
    return {
      'User-Agent': `DiscourseJS ${VERSION}`,
      ...(this._USER_API_KEY ? { 'User-Api-Key': this._USER_API_KEY } : {}),
    };
  }

  createBody = (body: Record<string, string | number | Blob>): FormData => {
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

  request = (options: FinalRequestOptions): Promise<any> => {
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
            return response.json().then(camelizeKeys);
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
