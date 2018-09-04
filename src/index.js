/** Discourse JS */
import Posts from "./resources/Posts";
import Topics from "./resources/Topics";

import { createBody } from "./utils";

const resources = {
  Posts,
  Topics
};

export default class Discourse {
  constructor(apiKey, baseUrl) {
    // Set our api key to the Discourse class.
    this._API_KEY = apiKey;
    this._BASE_URL = baseUrl;

    for (resource in resources) {
      this[resource.toLowerCase()] = new resources[resource](this)
    }
  }

  DiscourseResource = options => {
    return new Promise((resolve, reject) => {
      const { body, method, path } = options;

      const fetchOptions = {
        method,
        mimeType: "multipart/form-data"
      };

      if (method === "POST") {
        (fetchOptions.body = createBody(body)), (fetchOptions.body.api_key = this._API_KEY);
      }

      return fetch(`${this._BASE_URL}/${path}`, fetchOptions)
        .then(response => {
          if (response.ok) {
            return resolve(response.json());
          } else {
            return reject(new Error(response.statusText, response.status));
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
