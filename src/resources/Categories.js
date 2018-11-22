export default function Categories(discourse) {
  this.getCategory = ({ cat_id } = {}) => {
    return new Promise((resolve, reject) => {
      if (!cat_id) {
        return reject(
          new Error(
            "No category id defined. You must pass an category id to the getCategory function."
          )
        );
      }

      discourse
        .DiscourseResource({
          path: `c/${cat_id}.json?api_key=${discourse._API_KEY}&api_username=${
            discourse._API_USERNAME
          }`,
          method: "GET"
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  this.getSubcategory = ({ cat_id, subcat_id } = {}) => {
    return new Promise((resolve, reject) => {
      if (!cat_id || !subcat_id) {
        return reject(
          new Error(
            "No category id or subcategory id has been defined. You must pass a a category id and a subcategory id to the getSubcategory function."
          )
        );
      }

      discourse
        .DiscourseResource({
          path: `c/${cat_id}/${subcat_id}.json?api_key=${discourse._API_KEY}&api_username=${
            discourse._API_USERNAME
          }`,
          method: "GET"
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
}
