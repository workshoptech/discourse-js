export interface GetNotificationsData {
  notifications: [
    {
      id: number,
      notification_type: number,
      read: boolean,
      created_at: string,
      post_number: number,
      topic_id: number,
      fancy_title: string,
      slug: string,
      data: {
        topic_title: string,
        original_post_id: number,
        original_post_type: number,
        original_username: string,
        revision_number: {},
        display_username: string,
      },
    },
  ];
  total_rows_notifications: number;
  seen_notification_id: number;
  load_more_notifications: string;
}

export interface MarkReadData {
  id: number;
}
