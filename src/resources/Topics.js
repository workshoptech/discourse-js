import { buildQueryString } from "../utils";

export default function Topics(discourse) {
  this.getTopic = ({ id, reverse, ...inputs } = {}) => {
    return new Promise((resolve, reject) => {
      const params = {
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
        ...inputs,
      };

      discourse
        .DiscourseResource({
          path: buildQueryString(`t/${id}${reverse ? "/last" : ""}.json`, params),
          method: "GET",
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  this.getTopicPosts = ({ id, posts, ...inputs } = {}) => {
    return new Promise((resolve, reject) => {
      
      const params = {
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
        posts,
        ...inputs,
      };

      return discourse
        .DiscourseResource({
          path: buildQueryString(`t/${id}/posts.json`, params),
          method: "GET",
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
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

  this.getTopicsByUsername = ({ username, ...inputs }) => {
    return new Promise((resolve, reject) => {
      const params = {
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
        ...inputs,
      };

      discourse
        .DiscourseResource({
          path: buildQueryString(`topics/created-by/${username}.json`, params),
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
