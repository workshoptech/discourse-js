import { buildQueryString } from "../utils";

export default function Topics(discourse) {
  this.getTopic = ({ id, ...inputs } = {}) => {
    return new Promise((resolve, reject) => {
      const params = {
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
        ...inputs,
      };

      discourse
        .DiscourseResource({
          path: buildQueryString(`t/${id}.json`, params),
          method: "GET",
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  this.deleteTopic = ({ id, ...inputs } = {}) => {
    return new Promise((resolve, reject) => {
      const params = {
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
        ...inputs,
      };

      return discourse
        .DiscourseResource({
          path: buildQueryString(`t/${id}`, params),
          method: "DELETE",
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  };

  this.getTopicsByUsername = ({ username, params }) => {
    return new Promise((resolve, reject) => {
      const queryParams = {
        ...params,
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
      };

      discourse
        .DiscourseResource({
          path: buildQueryString(`topics/created-by/${username}.json`, queryParams),
          method: "GET",
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  this.createTopic = inputs => {
    return discourse.posts.create(inputs);
  };
}
