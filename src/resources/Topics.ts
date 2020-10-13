import { buildQueryString } from '../utils';
import { DiscourseInterface } from '../index';
import { GetTopicData, GetTopicsData, TopicByUserName } from '../types/Topics';
import { PostsData } from '../types/Posts';

interface TopicParams {
  id?: number;
  reverse?: boolean;
  inputs?: Object;
  posts?: any;
  username?: string;
}

export interface ITopics {
  getTopic(params: TopicParams): Promise<GetTopicsData>;
  getTopicPosts(params: TopicParams): Promise<GetTopicData>;
  deleteTopic(params: TopicParams): Promise<string>;
  getTopicsByUsername(params: TopicParams): Promise<TopicByUserName>;
  createTopic(params: TopicParams): Promise<PostsData>;
}

export default function Topics(discourse: DiscourseInterface) {
  this.getTopic = async ({
    id,
    reverse,
    ...inputs
  }: { id?: number, reverse?: boolean, inputs?: Object } = {}) => {
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
