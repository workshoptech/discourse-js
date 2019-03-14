import { buildQueryString } from "../utils";

/**
 * @typedef {Object} Notification
 * @property {number} id The Notification ID
 * @property {number} notification_type The type of the notification
 * @property {boolean} read
 * @property {string} created_at
 * @memberof Notifications
 */

/**
 * @typedef {Object} NotificationResponse
 * @property {Array<Notification>} notifications An array of notifications
 * @property {number} seen_notification_id The ID of the last seen notification
 * @memberof Notifications
 */

// id: 29115,
// notification_type: 6,
// read: true,
// created_at: "2019-03-13T12:13:59.619Z",
// post_number: 19,
// topic_id: 11967,
// fancy_title: "Chat between Dan Williams and Workshop",
// slug: "chat-between-dan-williams-and-workshop",
// data: {
// topic_title: "Chat between Dan Williams and Workshop",
// original_post_id: 17681,
// original_post_type: 1,
// original_username: "dan",
// revision_number: null,
// display_username: "dan"
// }

/**
 * Resource for handling interaction with existing user notifications
 * @class Notifications
 * @param {Discourse} discourse A Discourse class instance through which
 *                              API calls are made.
 */
export default function Notifications(discourse) {
  /**
   * Get a list of notifications for the authenticated user.
   * 
   * @example
   * discourse.notifications.get({
   *   recent: true,
   * })
   * .then(res => console.log(res))
   * .catch(err => console.log(err));
   * @param {Object} [inputs] Optional URL parameters
   * @param {boolean} inputs.recent Whether or not to only show recent notifications
   * @param {number} inputs.limit The number of notifications to show. Only works if `recent` is `true`
   * @returns {Promise<NotificationResponse>} The API response
   */
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

  /**
   * Mark a single notification, or all notifications as read.
   * 
   * If no notification ID is provided then all notifications
   * will be marked as read. If a notification ID is provided,
   * that specific notification will be marked as read.
   * 
   * @example
   * discourse.notifications.markRead({
    *   id: 1201,
    * })
    * .then(res => console.log(res))
    * .catch(err => console.log(err));
   * @param {Object} [body] Optional request body
   * @param {number} body.id ID of the notification to mark read
   * @returns {Promise<TBC>} The API response
   */
  this.markRead = (body = {}) => {
    return new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: "PUT",
          path: "notifications/mark-read",
          ...(body ? body : {}),
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
}
