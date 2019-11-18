import { buildQueryString } from "../utils";

export default function Tags(discourse) {
  this.getTopic = ({ tag, ...inputs } = {}) => {
    return new Promise((resolve, reject) => {
      const params = {
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
        ...inputs,
      };

      discourse
        .DiscourseResource({
          path: buildQueryString(`tags/${tag}.json`, params),
          method: "GET",
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  this.getTopicsForCategory = ({ tag, category, subcategory, ...inputs } = {}) => {
    return new Promise((resolve, reject) => {
      const params = {
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
        ...inputs,
      };

      discourse
        .DiscourseResource({
          path: buildQueryString(
            `tags/c/${category}/${subcategory ? `${subcategory}/` : ""}${tag}.json`,
            params,
          ),
          method: "GET",
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
}
