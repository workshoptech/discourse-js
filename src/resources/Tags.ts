import Discourse from '../index';
import { buildQueryString } from '../utils';
import { TagsListData } from '../types/Tags';

interface TopicParams {
  tag?: string;
  category?: number;
  subcategory?: number;
  // TODO: Add strict type
  inputs?: any;
}

export interface ITags {
  getTopic(params: TopicParams): Promise<TagsListData>;
  getTopicsForCategory(params: TopicParams): Promise<TagsListData>;
}
export default function Tags(discourse: Discourse) {
  this.getTopic = async ({ tag, ...inputs }: { tag?: string } = {}) => {
    return discourse.get({
      path: buildQueryString(`tags/${tag}.json`, inputs),
    });
  };

  this.getTopicsForCategory = async ({
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
}
