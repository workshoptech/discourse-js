import { createBody } from "../utils";

export default function Posts(discourse) {
  this.create = ({ topic_id, raw, imageUri } = {}) => {
    return new Promise((resolve, reject) => {
      if (!topic_id)
        return reject(new Error("No topic_id defined. You must pass a topic to create function."));

      if (imageUri) {
        discourse
          .DiscourseResource({
            method: "POST",
            path: "uploads.json",
            body: {
              "files[]": {
                uri: imageUri,
                name: "photo.jpeg",
                type: "image/jpeg"
              },
              type: "composer",
              synchronous: true
            }
          })
          .then(res => {
            if (res.url) {
              discourse
                .DiscourseResource({
                  method: "POST",
                  path: "posts",
                  body: {
                    topic_id,
                    raw: `![${res.width}x${res.height}](${res.short_url})\n${raw}`
                  }
                })
                .then(response => resolve(response))
                .catch(error => reject(error));
            }
          })
          .catch(err => reject(err));
      } else {
        discourse
          .DiscourseResource({
            method: "POST",
            path: "posts",
            body: {
              topic_id,
              raw
            }
          })
          .then(response => resolve(response))
          .catch(error => reject(error));
      }
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

  this.like = ({ id }) =>
    new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: "POST",
          path: "post_actions",
          body: {
            id,
            post_action_type_id: 2
          }
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });

  this.unlike = ({ id }) =>
    new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: "DELETE",
          path: `post_actions/${id}`,
          body: {
            post_action_type_id: 2
          }
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}
