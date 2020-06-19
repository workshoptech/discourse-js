import { buildQueryString } from '../utils';

export default function Tags(discourse) {
  this.getTopic = async ({ tag, ...inputs } = {}) => {
    return discourse.get({
      path: buildQueryString(`tags/${tag}.json`, inputs),
    });
  };

  this.getTopicsForCategory = async ({
    tag,
    category,
    subcategory,
    ...inputs
  } = {}) => {
    return discourse.get({
      path: buildQueryString(
        `tags/c/${category}/${subcategory ? `${subcategory}/` : ''}${tag}.json`,
        inputs,
      ),
    });
  };
}
