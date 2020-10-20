import Discourse from '../index';
import { buildQueryString } from '../utils';
import { GetNotificationsData, MarkReadData } from '../types/Notifications';

export interface INotifications {
  get(inputs: Object): Promise<GetNotificationsData>;
  markRead(params: { id: number }): Promise<MarkReadData>;
}

export default function Notifications(discourse: Discourse) {
  this.get = async (inputs: Object = {}) => {
    return discourse.get({
      method: 'GET',
      path: buildQueryString('notifications.json', inputs),
    });
  };

  this.markRead = async ({ id }: { id: number }) => {
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
