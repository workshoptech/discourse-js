import { buildQueryString } from '../utils';
import { DiscourseInterface } from '../index';

interface CategoryParams {
  cat_id?: number;
  subcat_id?: number;
  latest: boolean;
}

export interface ICategories {
  getCategory(params: CategoryParams): Promise<unknown>;
  getSubcategory(params: CategoryParams): Promise<unknown>;
}

export default function Categories(discourse: DiscourseInterface) {
  this.getCategory = async (
    { cat_id, latest, ...inputs }: CategoryParams = {
      latest: false,
    },
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
    { cat_id, subcat_id, latest, ...inputs }: CategoryParams = {
      latest: false,
    },
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
