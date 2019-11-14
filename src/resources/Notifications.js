import { buildQueryString } from "../utils";

export default function Notifications(discourse) {
  this.get = (inputs = {}) => {
    return new Promise((resolve, reject) => {
      const params = {
        api_key: discourse._API_KEY,
        api_username: discourse._API_USERNAME,
        ...inputs,
      };

      discourse
        .DiscourseResource({
          method: "GET",
          path: buildQueryString("notifications.json", params),
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  this.markRead = ({ id }) => {
    return new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: "PUT",
          path: "notifications/mark-read",
          ...(id
            ? {
              body: {
                id,
              },
            }
            : {}),
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
}
