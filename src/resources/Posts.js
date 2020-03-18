export default function Posts(discourse) {
  this.create = async (inputs = {}) => {
    // If an imageUri has been passed, upload the image first.
    if (inputs.imageUri) {
      const { url, width, height, short_url } = await discourse.uploads.create({
        'files[]': {
          uri: inputs.imageUri,
          name: 'photo.jpeg',
          type: 'image/jpeg',
        },
        type: 'composer',
        synchronous: true,
      });

      if (url) {
        const body = {};

        // Remove the imageUri from the inputs as it's not used in the next request.
        delete inputs.imageUri;

        Object.keys(inputs).forEach(key => (body[key] = inputs[key]));

        // Prepend the raw message with the image.
        body.raw = `![${width}x${height}](${short_url})\n${body.raw}`;

        return discourse.post({
          path: 'posts',
          body,
        });
      }
    } else {
      return discourse.post({
        path: 'posts',
        body: inputs,
      });
    }
  };

  this.reply = async ({ topic_id, raw, reply_to_post_number }) => {
    if (!topic_id) {
      throw new Error(
        'No topic_id defined. You must pass a topic to reply function.',
      );
    }

    return discourse.post({
      path: 'posts',
      body: {
        topic_id,
        raw,
        reply_to_post_number,
        archetype: 'regular',
        nested_post: true,
      },
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
  this.postAction = ({ method = 'POST', body = {}, id = null }) =>
    new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method,
          path: id ? `post_actions/${id}` : 'post_actions',
          body,
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });

  this.like = ({ id }) =>
    this.postAction({ body: { id, post_action_type_id: 2 } });

  this.unlike = ({ id }) =>
    this.postAction({ method: 'DELETE', body: { post_action_type_id: 2 }, id });

  this.flag = ({ id, post_action_type_id, message, flag_topic }) =>
    this.postAction({ body: { id, post_action_type_id, message, flag_topic } });
}
