import { createBody, objectValidator } from "../utils";

export default function Posts(discourse) {
  this.create = ({ api_username, topic_id, raw }) => {
    return new Promise((resolve, reject) => {
      if (!api_username)
        return reject(
          new Error("No api_username defined. You must pass a username to the create function.")
        );
      if (!topic_id)
        return reject(new Error("No topic_id defined. You must pass a topic to create function."));

      discourse
        .DiscourseResource({
          method: "POST",
          path: "posts",
          body: {
            api_key: discourse._API_KEY,
            api_username,
            topic_id,
            raw
          }
        })
        .then(response => {
          if (response.ok) {
            return resolve(response.json())
          } else {
            return reject(new Error(response.statusText, response.status))
          }
        })
        .catch(function(error) {
          if (error) {
            return reject(new Error(error));
          }
        });
    });
  };

  this.reply = ({ api_username, topic_id, raw, reply_to_post_number }) => {
    return new Promise((resolve, reject) => {
      if (!api_username)
        return reject(
          new Error("No api_username defined. You must pass a username to the reply function.")
        );
      if (!topic_id)
        return reject(new Error("No topic_id defined. You must pass a topic to reply function."));

      const body = createBody({
        api_key: discourse._API_KEY,
        api_username,
        topic_id,
        raw,
        reply_to_post_number,
        archetype: "regular",
        nested_post: true
      });

      return fetch(`${discourse._BASE_URL}/posts`, {
        method: "POST",
        mimeType: "multipart/form-data",
        body
      })
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

  this.like = ({ api_username, id }) =>
    new Promise((resolve, reject) => {
      const argsValidated = objectValidator({api_username, id})

      if (argsValidated !== true) return reject(new Error(argsValidated))

      const body = createBody({
        api_key: discourse._API_KEY,
        api_username,
        id,
        post_action_type_id: 2
      });

      return fetch(`${discourse._BASE_URL}/post_actions`, {
        method: "POST",
        mimeType: "multipart/form-data",
        body
      })
        .then(response => {
          if (response.ok) {
            return resolve(response.json());
          } else {
            return reject(new Error(`${response.statusText}: ${response._bodyText}`, response.status));
          }
        })
        .catch(function(error) {
          if (error) {
            return reject(new Error(error));
          }
        });
    });

  this.unlike = ({ api_username, id }) =>
    new Promise((resolve, reject) => {

      const argsValidated = objectValidator({api_username, id})

      if (argsValidated !== true) return reject(new Error(argsValidated))

      const body = createBody({ api_key: discourse._API_KEY, api_username, post_action_type_id: 2 });

      return fetch(`${discourse._BASE_URL}/post_actions/${id}`, {
        method: "DELETE",
        mimeType: "multipart/form-data",
        body
      })
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
}
