import Discourse from '../index';
import { buildQueryString } from '../utils';
import {
  Topic,
  TopicPosts,
  TopicByUserName,
  TopicByTag,
  TopicByCategoryAndTag,
} from '../types/Topics';
import { Post } from '../types/Posts';

interface TopicParams {
  id?: number;
  reverse?: boolean;
  inputs?: Object;
  // TODO: Add strict type
  posts?: any;
  username?: string;
  // By Tag
  tag?: string;
  // By Category
  category?: number;
  subcategory?: number;
}

export interface ITopics {
  getTopic(params: TopicParams): Promise<Topic>;
  getTopicPosts(params: TopicParams): Promise<TopicPosts>;
  getTopicsByUsername(params: TopicParams): Promise<TopicByUserName>;
  getTopicsByTag(params: TopicParams): Promise<TopicByTag>;
  getTopicsByCategoryAndTag(
    params: TopicParams,
  ): Promise<TopicByCategoryAndTag>;
  deleteTopic(params: TopicParams): Promise<string>;
  createTopic(params: TopicParams): Promise<Post>;
}

export default function Topics(discourse: Discourse) {
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

  this.getTopicsByTag = async ({ tag, ...inputs }: { tag?: string } = {}) => {
    return discourse.get({
      path: buildQueryString(`tags/${tag}.json`, inputs),
    });
  };

  this.getTopicsByCategoryAndTag = async ({
    tag,
    category,
    subcategory,
    ...inputs
  }: { tag?: string, category?: number, subcategory?: number } = {}) => {
    return discourse.get({
      path: buildQueryString(
        `tags/c/${category}/${subcategory ? `${subcategory}/` : ''}${tag}.json`,
        inputs,
      ),
    });
  };

  this.deleteTopic = async ({ id, ...inputs }: { id?: number } = {}) => {
    return discourse.delete({
      path: buildQueryString(`t/${id}`, inputs),
    });
  };

  this.createTopic = async inputs => {
    return discourse.posts.create(inputs);
  };
}
