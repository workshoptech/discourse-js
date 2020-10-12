import { buildQueryString } from '../utils';

export default function Topics(discourse) {
  this.getTopic = async ({
    id,
    reverse,
    ...inputs
  }: { id?: number, reverse?: string } = {}) => {
    return discourse.get({
      path: buildQueryString(`t/${id}${reverse ? '/last' : ''}.json`, inputs),
    });
  };

  this.getTopicPosts = async ({
    id,
    posts,
    ...inputs
  }: { id?: number, posts?: any } = {}) => {
    const params = {
      post_ids: posts,
      ...inputs,
    };

    return discourse.get({
      path: buildQueryString(`t/${id}/posts.json`, params),
    });
  };

  this.deleteTopic = async ({ id, ...inputs }: { id?: number } = {}) => {
    return discourse.delete({
      path: buildQueryString(`t/${id}`, inputs),
    });
  };

  this.getTopicsByUsername = async ({ username, ...inputs }) => {
    return discourse.get({
      path: buildQueryString(`topics/created-by/${username}.json`, inputs),
    });
  };

  this.createTopic = async inputs => {
    return discourse.posts.create(inputs);
  };
}
