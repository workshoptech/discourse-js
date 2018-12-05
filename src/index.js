/** Discourse JS */
import Posts from "./resources/Posts";
import Topics from "./resources/Topics";
import Messages from "./resources/Messages";
import Groups from "./resources/Groups";
import Categories from "./resources/Categories";
import Notifications from "./resources/Notifications";

import { createBody, ApiError } from "./utils";

const resources = {
  Posts,
  Topics,
  Messages,
  Groups,
  Categories,
  Notifications
};

export default class Discourse {
  constructor(apiKey, baseUrl) {
    // Set our api key to the Discourse class.
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

  DiscourseResource = options => {
    return new Promise((resolve, reject) => {
      const { body, method, path, headers } = options;

      const fetchOptions = {
        method,
        headers,
        mimeType: "multipart/form-data"
      };

      if (method === "POST" || method === "DELETE" || method === "PATCH" || method === "PUT") {
        fetchOptions.body = createBody({
          ...body,
          api_key: this._API_KEY,
          api_username: this._API_USERNAME
        });
      }

      return fetch(`${this._BASE_URL}/${path}`, fetchOptions)
        .then(response => {
          if (response.ok) {
            return resolve(response.json());
          } else {
            const { status, statusText } = response;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json().then(json => {
                return reject(new ApiError(status, statusText, "", json.errors));
              });
            } else {
              return response.text().then(text => {
                return reject(new ApiError(status, statusText, text));
              });
            }
          }
        })
        .catch(function(error) {
          if (error) {
            return reject(new Error(error));
          }
        });
    });
  };
}
