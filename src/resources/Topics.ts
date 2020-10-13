import { buildQueryString } from '../utils';
import { DiscourseInterface } from '../index';

interface TopicParams {
  id?: number;
  reverse?: string;
  inputs?: Object;
  posts?: any;
  username?: string;
}

export interface ITopics {
  getTopic(params: TopicParams): Promise<unknown>;
  getTopicPosts(params: TopicParams): Promise<unknown>;
  deleteTopic(params: TopicParams): Promise<unknown>;
  getTopicsByUsername(params: TopicParams): Promise<unknown>;
  createTopic(params: TopicParams): Promise<unknown>;
}

export default function Topics(discourse: DiscourseInterface) {
  this.getTopic = async ({
    id,
    reverse,
    ...inputs
  }: { id?: number, reverse?: string, inputs?: Object } = {}) => {
    return discourse.get({
      path: buildQueryString(`t/${id}${reverse ? '/last' : ''}.json`, inputs),
    });
  };

  this.getTopicPosts = async ({
    id,
    posts,
    ...inputs
  }: { id?: number, posts?: any, inputs?: Object } = {}) => {
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

  this.getTopicsByUsername = async ({
    username,
    ...inputs
  }: {
    username?: string,
  }) => {
    return discourse.get({
      path: buildQueryString(`topics/created-by/${username}.json`, inputs),
    });
  };

  this.createTopic = async inputs => {
    return discourse.posts.create(inputs);
  };
}
