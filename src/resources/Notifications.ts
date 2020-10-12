import { buildQueryString } from '../utils';

export default function Notifications(discourse) {
  this.get = async (inputs = {}) => {
    return discourse.get({
      method: 'GET',
      path: buildQueryString('notifications.json', inputs),
    });
  };

  this.markRead = async ({ id }) => {
    return discourse.put({
      path: 'notifications/mark-read',
      ...(id
        ? {
            body: {
              id,
            },
          }
        : {}),
    });
  };
}
