export interface GetNotificationsData {
  notifications: [
    {
      id: number,
      notificationType: number,
      read: boolean,
      createdAt: string,
      postNumber: number,
      topicId: number,
      fancyTitle: string,
      slug: string,
      data: {
        topicTitle: string,
        originalPostId: number,
        originalPostType: number,
        originalUsername: string,
        revisionNumber: {},
        displayUsername: string,
      },
    },
  ];
  totalRowsNotifications: number;
  seenNotificationId: number;
  loadMoreNotifications: string;
}

export interface MarkReadData {
  id: number;
}
