import Discourse from '../index';
import { PostsData } from '../types/Posts';

export interface IPosts {
  // TODO: Add strict type
  create(inputs: { [key: string]: any }): Promise<PostsData>;
  reply(params: {
    topic_id: number,
    raw: string,
    reply_to_post_number: number,
  }): Promise<PostsData>;
  postAction(params: {
    method: string,
    body: Object,
    id: number | null,
  }): Promise<PostsData>;
  like(params: { id: number }): Promise<PostsData>;
  unlike(params: { id: number }): Promise<PostsData>;
  flag(params: {
    id: number,
    post_action_type_id: number,
    message: string,
    // TODO: Add strict type
    flag_topic: any,
  }): Promise<PostsData>;
}

export default function Posts(discourse: Discourse) {
  this.create = async (inputs: { [key: string]: any } = {}) => {
    // If an imageUri has been passed, upload the image first.
    if (inputs.imageUri) {
      // ToDo Fix the Snake Camel dichotomy
      const {
        url,
        width,
        height,
        shortUrl,
        // @ts-ignore
        short_url,
      } = await discourse.uploads.create({
        'files[]': {
          uri: inputs.imageUri,
          name: 'photo.jpeg',
          type: 'image/jpeg',
        },
        type: 'composer',
        synchronous: true,
      });

      if (url) {
        const body: { [key: string]: string } = {};

        // Remove the imageUri from the inputs as it's not used in the next request.
        delete inputs.imageUri;

        Object.keys(inputs).forEach(key => (body[key] = inputs[key]));

        // Prepend the raw message with the image.
        body.raw = `![${width}x${height}](${shortUrl || short_url})\n${
          body.raw
        }`;

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

  this.reply = async ({
    topic_id,
    raw,
    reply_to_post_number,
  }: {
    topic_id: number,
    raw: string,
    reply_to_post_number: number,
  }) => {
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
  this.postAction = async ({
    method = 'post',
    body = {},
    id = null,
  }: {
    method: string,
    body: Object,
    id: number | null,
  }) => {
    return discourse[method]({
      path: id ? `post_actions/${id}` : 'post_actions',
      body,
    });
  };

  this.like = ({ id }: { id: number }) =>
    this.postAction({ body: { id, post_action_type_id: 2 } });

  this.unlike = ({ id }: { id: number }) =>
    this.postAction({ method: 'delete', body: { post_action_type_id: 2 }, id });

  this.flag = ({
    id,
    post_action_type_id,
    message,
    flag_topic,
  }: {
    id: number,
    post_action_type_id: number,
    message: string,
    flag_topic: any,
  }) =>
    this.postAction({ body: { id, post_action_type_id, message, flag_topic } });
}
