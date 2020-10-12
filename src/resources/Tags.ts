import { buildQueryString } from '../utils';

export default function Tags(discourse) {
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
