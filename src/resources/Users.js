import { buildQueryString } from "../utils";

export default function Users(discourse) {
  this.getUser = ({ username } = {}) => {
    return new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          path: buildQueryString(`users/${username}.json`, {
            api_key: discourse._API_KEY,
            api_username: discourse._API_USERNAME
          }),
          method: "GET"
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
}
