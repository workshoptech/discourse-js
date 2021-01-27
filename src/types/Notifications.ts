export enum NotificationType {
  mentioned = 1,
  replied,
  quoted,
  edited,
  liked,
  privateMessage,
  invitedToPrivateMessage,
  inviteeAccepted,
  posted,
  movedPost,
  linked,
  grantedBadge,
  invitedToTopic,
  custom,
  groupMentioned,
  groupMessageSummary,
  watchingFirstPost,
  topicReminder,
  likedConsolidated,
  postApproved,
  codeReviewCommitApproved,
  membershipRequestAccepted,
  membershipRequestConsolidated,
  bookmarkReminder,
  reaction,
  votesReleased,
  eventReminder,
  eventInvitation,
}

export interface GroupNotification {
  id: number;
  userId: number;
  // TODO: Build this out
  notificationType:
    | NotificationType.groupMentioned
    | NotificationType.groupMessageSummary;
  read: boolean;
  createdAt: string;
  postNumber: string | null;
  topicId: string | null;
  slug: string | null;
  data: {
    groupId: number;
    groupName: string;
    inboxCount: number;
    username: string;
  };
}

export interface TopicNotification {
  id: number;
  // TODO: Build this out
  notificationType:
    | NotificationType.privateMessage
    | NotificationType.posted
    | NotificationType.replied
    | NotificationType.liked;
  read: boolean;
  createdAt: string;
  postNumber: number;
  topicId: number;
  fancyTitle: string;
  slug: string;
  data: {
    topicTitle: string;
    originalPostId: number;
    originalPostType: number;
    originalUsername: string;
    revisionNumber: number | string;
    displayUsername: string;
  };
}

export interface UnknownNotification {
  id: number;
  notificationType:
    | NotificationType.watchingFirstPost
    | NotificationType.mentioned;
}

export interface NotificationList {
  notifications: Array<TopicNotification | GroupNotification>;
  seenNotificationId: number;
  totalRowsNotifications?: number;
  loadMoreNotifications?: string;
}

export interface MarkNotificationRead {
  id: number;
}
