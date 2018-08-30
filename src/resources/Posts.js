import { createBody } from "../utils";

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
        .then(response => resolve(response))
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
            return reject(new Error(response.statusText, response.status));
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
      const body = createBody({ api_key: discourse._API_KEY, post_action_type_id: 2 });

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

// raw: is htis a reply to me //
// unlist_topic: false
// category: 1
// topic_id: 11
// is_warning: false
// whisper: false
// archetype: regular //
// typing_duration_msecs: 1000
// composer_open_duration_msecs: 5230
// featured_link:
// shared_draft: false

// reply_to_post_number: 16 //
// nested_post: true //
