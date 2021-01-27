import Discourse from '../index';
import { buildQueryString } from '../utils';
import { Category } from '../types/Categories';

export type CategoryParams = {
  cat_id?: number;
  subcat_id?: number;
  latest: boolean;
};

export interface ICategories {
  getCategory(params: CategoryParams): Promise<Category>;
  getSubcategory(params: CategoryParams): Promise<Category>;
}

export default function Categories(discourse: Discourse): void {
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
        inputs as CategoryParams,
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
        inputs as CategoryParams,
      ),
    });
  };
}
