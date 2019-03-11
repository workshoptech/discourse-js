import { buildQueryString } from "../utils";

export default function Categories(discourse) {
  this.getCategory = ({ cat_id, latest, ...inputs } = { latest: false }) => {
    return new Promise((resolve, reject) => {
      if (!cat_id)
        return reject(new Error("No id defined. You must pass an id to the getCategory function."));

      const params = {
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
        ...inputs,
      };

      discourse
        .DiscourseResource({
          path: buildQueryString(`c/${cat_id}${latest ? "/l/latest" : ""}.json`, params),
          method: "GET",
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  this.getSubcategory = ({ cat_id, subcat_id, latest, ...inputs } = { latest: false }) => {
    return new Promise((resolve, reject) => {
      if (!cat_id || !subcat_id)
        return reject(
          new Error("No id defined. You must pass an id to the getSubcategory function."),
        );

      const params = {
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
        ...inputs,
      };

      discourse
        .DiscourseResource({
          path: buildQueryString(
            `c/${cat_id}/${subcat_id}${latest ? "/l/latest" : ""}.json`,
            params,
          ),
          method: "GET",
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
}
