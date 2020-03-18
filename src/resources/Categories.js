import { buildQueryString } from '../utils';

export default function Categories(discourse) {
  this.getCategory = async (
    { cat_id, latest, ...inputs } = { latest: false },
  ) => {
    if (!cat_id) {
      throw new Error(
        'No id defined. You must pass an `cat_id` to the getCategory function.',
      );
    }

    return discourse.get({
      path: buildQueryString(
        `c/${cat_id}${latest ? '/l/latest' : ''}.json`,
        inputs,
      ),
    });
  };

  this.getSubcategory = async (
    { cat_id, subcat_id, latest, ...inputs } = { latest: false },
  ) => {
    if (!cat_id || !subcat_id) {
      throw new Error(
        'No id defined. You must pass an id to the getSubcategory function.',
      );
    }

    return discourse.get({
      path: buildQueryString(
        `c/${cat_id}/${subcat_id}${latest ? '/l/latest' : ''}.json`,
        inputs,
      ),
    });
  };
}
