import Discourse from '../index';
import { buildQueryString } from '../utils';
import { NotificationList, MarkNotificationRead } from '../types/Notifications';

export type NotificationParams = {
  recent?: boolean;
  limit?: number;
  offset?: number;
  // TODO: Pull out common params into a base type
  username?: string;
};

export interface INotifications {
  get(inputs?: NotificationParams): Promise<NotificationList>;
  markRead(params: { id: number }): Promise<MarkNotificationRead>;
}

export default function Notifications(discourse: Discourse): void {
  this.get = async (inputs: NotificationParams = {}) => {
    return discourse.get({
      method: 'GET',
      path: buildQueryString(
        'notifications.json',
        inputs as NotificationParams,
      ),
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
