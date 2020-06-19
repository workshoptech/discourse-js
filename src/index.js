import Categories from './resources/Categories';
import Groups from './resources/Groups';
import Messages from './resources/Messages';
import Notifications from './resources/Notifications';
import Posts from './resources/Posts';
import Preferences from './resources/Preferences';
import Tags from './resources/Tags';
import Topics from './resources/Topics';
import Uploads from './resources/Uploads';
import Users from './resources/Users';

import { buildQueryString, createBody, ApiError } from './utils';

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

export default class Discourse {
  constructor(apiKey, baseUrl) {
    this._API_KEY = apiKey;
    this._BASE_URL = baseUrl;

    for (let resource in resources) {
      this[resource.toLowerCase()] = new resources[resource](this);
    }
  }

  config = ({ apiKey, apiUsername, baseUrl } = {}) => {
    this._API_KEY = apiKey;
    this._BASE_URL = baseUrl;
    this._API_USERNAME = apiUsername;
  };

  requestHeaders() {
    return {
      'User-Agent': `DiscourseJS ${VERSION}`,
    };
  }

  get = ({ path, headers } = {}) => {
    return this.request({
      method: 'GET',
      headers,
      path: buildQueryString(path, {
        api_key: this._API_KEY,
        api_username: this._API_USERNAME,
      }),
    });
  };

  post = ({ path, headers, body }) => {
    console.log('body', {
      ...body,
      api_key: this._API_KEY,
      api_username: this._API_USERNAME,
    });

    return this.request({
      method: 'POST',
      headers,
      path,
      body: createBody({
        ...body,
        api_key: this._API_KEY,
        api_username: this._API_USERNAME,
      }),
    });
  };

  put({ path, headers, body }) {
    return this.request({
      method: 'PUT',
      headers,
      path,
      body: createBody({
        ...body,
        api_key: this._API_KEY,
        api_username: this._API_USERNAME,
      }),
    });
  }

  delete({ path, headers, body }) {
    return this.request({
      method: 'DELETE',
      headers,
      path,
      body: createBody({
        ...body,
        api_key: this._API_KEY,
        api_username: this._API_USERNAME,
      }),
    });
  }

  request = options => {
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
            return response.json();
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
