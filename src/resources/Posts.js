export default function Posts(discourse) {
  this.create = (inputs = {}) => {
    return new Promise((resolve, reject) => {
      // If an imageUri has been passed, upload the image first.
      if (inputs.imageUri) {
        discourse
          .DiscourseResource({
            method: "POST",
            path: "uploads.json",
            body: {
              "files[]": {
                uri: inputs.imageUri,
                name: "photo.jpeg",
                type: "image/jpeg",
              },
              type: "composer",
              synchronous: true,
            },
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

  /**
   * post_action_type_id values
   * 1: bookmark
   * 2: like
   * 3: flag - off topic
   * 4: flag - inappropriate
   * 8: flag - spam
   * 6: flag - notify user
   * 7: flag - notify moderators
   */
  this.postAction = (body = {}, id = null) =>
    new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: "POST",
          path: id ? `post_actions/${id}` : "post_actions",
          body,
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });

  this.like = ({ id }) => this.postAction({ id, post_action_type_id: 2 });

  this.unlike = ({ id }) => this.postAction({ post_action_type_id: 2 }, id);

  this.flag = ({ id, post_action_type_id, message, flag_topic }) =>
    this.postAction({ id, post_action_type_id, message, flag_topic });
}
