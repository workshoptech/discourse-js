export enum PostActions {
  Bookmark = 1,
  Like,
  OffTopic,
  Inappropriate,
  _, // Not used
  NotifyUser,
  NotifyModerators,
  Spam,
}

export type PostActionType = 1 | 2 | 3 | 4 | 6 | 7 | 8;

export interface Post {
  id: number;
  name: string;
  username: string;
  avatarTemplate: string;
  createdAt: string;
  cooked: string;
  postNumber: number;
  postType: number;
  updatedAt: string;
  replyCount: number;
  replyToPostNumber: number | null;
  quoteCount: number;
  avgTime?: number;
  incomingLinkCount: number;
  reads: number;
  readersCount: number;
  score: number;
  yours: boolean;
  topicId: number;
  topicSlug: string;
  displayUsername: string;
  primaryGroupName: string | null;
  primaryGroupFlairUrl: string | null;
  primaryGroupFlairColor: string | null;
  primaryGroupFlairBgColor: string | null;
  version: number;
  canEdit: boolean;
  canDelete: boolean;
  canRecover: boolean;
  canWiki: boolean;
  read: boolean;
  userTitle: string | null;
  actionsSummary: Array<{
    id: number;
    canAct: boolean;
    hidden?: boolean;
    acted?: boolean;
    canUndo?: boolean;
    count?: number;
  }>;
  moderator: boolean;
  admin: boolean;
  staff: boolean;
  userId: number;
  hidden: boolean;
  hiddenReasonId?: number | string;
  trustLevel: number;
  deletedAt: string | null;
  userDeleted: boolean;
  editReason: string | null;
  canViewEditHistory: boolean;
  wiki: boolean;
  reviewableId?: number;
  reviewableScoreCount?: number;
  reviewableScorePendingCount?: number;
  polls?: {
    poll: {
      options: Array<{
        id: string;
        html: string;
        votes: number;
      }>;
      voters: number;
      status: string;
      name: string;
      type: string;
    };
  };
  pollsVotes?: {
    poll: [string];
  };
}
