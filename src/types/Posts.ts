export interface PostsData {
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
  replyToPostNumber: {};
  quoteCount: number;
  avgTime: {};
  incomingLinkCount: number;
  reads: number;
  score: number;
  yours: boolean;
  topicId: number;
  topicSlug: string;
  displayUsername: string;
  primaryGroupName: {};
  primaryGroupFlairUrl: {};
  primaryGroupFlairBgColor: {};
  primaryGroupFlairColor: {};
  version: number;
  canEdit: boolean;
  canDelete: boolean;
  canRecover: boolean;
  canWiki: boolean;
  read: boolean;
  userTitle: {};
  actionsSummary: [
    {
      id: number,
      hidden: boolean,
      canAct: boolean,
    },
  ];
  moderator: boolean;
  admin: boolean;
  staff: boolean;
  userId: number;
  hidden: boolean;
  hiddenReasonId: {};
  trustLevel: number;
  deletedAt: {};
  userDeleted: boolean;
  editReason: {};
  canViewEditHistory: boolean;
  wiki: boolean;
  polls?: {
    poll: {
      options: [
        {
          id: string,
          html: string,
          votes: number,
        },
      ],
      voters: number,
      status: string,
      name: string,
      type: string,
    },
  };
  pollsVotes?: {
    poll: [string],
  };
}
