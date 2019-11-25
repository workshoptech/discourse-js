export default function Posts(discourse) {
  this.create = (inputs = {}) => {
    return new Promise((resolve, reject) => {
      // If an imageUri has been passed, upload the image first.
      if (inputs.imageUri) {
        discourse.uploads.create({
          "files[]": {
            uri: inputs.imageUri,
            name: "photo.jpeg",
            type: "image/jpeg",
          },
          type: "composer",
          synchronous: true,
        })
          .then(({ url, width, height, short_url }) => {
            if (url) {
              const body = {};

              // Remove the imageUri from the inputs as it's not used in the next request.
              delete inputs.imageUri;

              Object.keys(inputs).forEach(key => (body[key] = inputs[key]));

              // Prepend the raw message with the image.
              body.raw = `![${width}x${height}](${short_url})\n${body.raw}`;

              discourse
                .DiscourseResource({
                  method: "POST",
                  path: "posts",
                  body,
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
            body: inputs,
          })
          .then(response => resolve(response))
          .catch(error => reject(error));
      }
    });
  };

  this.reply = ({ topic_id, raw, reply_to_post_number }) => {
    return new Promise((resolve, reject) => {
      if (!topic_id)
        return reject(new Error("No topic_id defined. You must pass a topic to reply function."));
      discourse
        .DiscourseResource({
          method: "POST",
          path: "posts",
          body: {
            topic_id,
            raw,
            reply_to_post_number,
            archetype: "regular",
            nested_post: true,
          },
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
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
            post_action_type_id: 2,
          },
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
            post_action_type_id: 2,
          },
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}
