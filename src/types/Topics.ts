import { PostsData } from './Posts';
import { DiscourseUser } from './Users';

// ToDo clean up

export interface GetTopicsData {
  postStream: {
    posts: PostsData[],
    stream: [{}],
  };
  timelineLookup: [
    {
      number: [{}],
    },
  ];
  id: number;
  title: string;
  fancyTitle: string;
  postsCount: number;
  createdAt: string;
  views: number;
  replyCount: number;
  participantCount: number;
  likeCount: number;
  lastPostedAt: {};
  visible: boolean;
  closed: boolean;
  archived: boolean;
  hasSummary: boolean;
  archetype: string;
  slug: string;
  categoryId: number;
  wordCount: {};
  deletedAt: {};
  userId: number;
  draft: {};
  draftKey: string;
  draftSequence: {};
  unpinned: {};
  pinnedGlobally: boolean;
  pinned: boolean;
  pinnedAt: string;
  pinnedUntil: {};
  details: {
    autoCloseAt: {},
    autoCloseHours: {},
    autoCloseBasedOnLastPost: boolean,
    createdBy: {
      id: number,
      username: string,
      avatarTemplate: string,
    },
    lastPoster: {
      id: number,
      username: string,
      avatarTemplate: string,
    },
    participants: [
      {
        id: number,
        username: string,
        avatarTemplate: string,
        postCount: number,
      },
    ],
    suggestedTopics: [
      {
        id: number,
        title: string,
        fancyTitle: string,
        slug: string,
        postsCount: number,
        replyCount: number,
        highestPostNumber: number,
        imageUrl: string,
        createdAt: string,
        lastPostedAt: string,
        bumped: boolean,
        bumpedAt: string,
        unseen: boolean,
        pinned: boolean,
        unpinned: {},
        excerpt: string,
        visible: boolean,
        closed: boolean,
        archived: boolean,
        bookmarked: {},
        liked: {},
        archetype: string,
        likeCount: number,
        views: number,
        categoryId: number,
        posters: [
          {
            extras: string,
            description: string,
            user: {
              id: number,
              username: string,
              avatarTemplate: string,
            },
          },
        ],
      },
    ],
    notificationLevel: number,
    canFlagTopic: boolean,
  };
  highestPostNumber: number;
  deletedBy: {};
  actionsSummary: [
    {
      id: number,
      count: number,
      hidden: boolean,
      canAct: boolean,
    },
  ];
  chunkSize: number;
  bookmarked: {};
}

export interface GetTopicData {
  postStream: {
    posts: PostsData[],
  };
  id: number;
}

export type DiscourseTopic = {
  postStream: {
    posts: Array<PostsData>,
    stream: Array<number>,
  },
  timelineLookup: Array<number>,
  tags: Array<string>,
  suggestedTopics: Array<{
    id: number,
    title: string,
    fancyTitle: string,
    slug: string,
    postsCount: number,
    replyCount: number,
    highestPostNumber: number,
    imageUrl: string,
    createdAt: string,
    lastPostedAt: string,
    bumped: boolean,
    bumpedAt: string,
    unseen: boolean,
    pinned: boolean,
    unpinned: boolean,
    visible: boolean,
    closed: boolean,
    archived: boolean,
    bookmarked: boolean,
    liked: boolean,
    archetype: string | 'regular',
    likeCount: number,
    views: number,
    categoryId: number,
    featuredLink: string,
    posters: Array<{
      extras: string,
      description: string,
      user: {
        id: number,
        username: string,
        name: string,
        avatarTemplate: string,
      },
    }>,
  }>,
  id: number,
  title: string,
  fancyTitle: string,
  postsCount: number,
  createdAt: string,
  views: number,
  replyCount: number,
  likeCount: number,
  lastPostedAt: string,
  visible: boolean,
  closed: boolean,
  archived: boolean,
  hasSummary: boolean,
  archetype: string | 'regular',
  slug: string,
  categoryId: number,
  wordCount: number,
  deletedAt: string,
  pendingPostsCount: number,
  userId: number,
  featuredLink: string,
  pinnedGlobally: boolean,
  pinnedAt: string,
  pinnedUntil: string,
  draft: boolean,
  draftKey: string,
  draftSequence: number,
  posted: boolean,
  unpinned: {},
  pinned: boolean,
  details: {
    createdBy: {
      id: number,
      username: string,
      name: string,
      avatarTemplate: string,
    },
    lastPoster: {
      id: number,
      username: string,
      name: string,
      avatarTemplate: string,
    },
    participants: Array<{
      id: number,
      username: string,
      name: string,
      avatarTemplate: string,
      postCount: number,
      primaryGroupName: string,
      primaryGroupFlairUrl: string,
      primaryGroupFlairColor: string,
      primaryGroupFlairBgColor: string,
    }>,
    notificationLevel: number,
    notificationsReasonId: number,
    canMovePosts: boolean,
    canEdit: boolean,
    canDelete: boolean,
    canRemoveAllowedUsers: boolean,
    canRemoveSelfId: number,
    canInviteTo: boolean,
    canCreatePost: boolean,
    canReplyAsNewTopic: boolean,
    canFlagTopic: boolean,
    canConvertTopic: boolean,
  },
  currentPostNumber: number,
  highestPostNumber: number,
  lastReadPostNumber: number,
  lastReadPostId: number,
  deletedBy: null,
  hasDeleted: boolean,
  actionsSummary: Array<{
    id: number,
    count: number,
    hidden: boolean,
    canAct: boolean,
  }>,
  chunkSize: number,
  bookmarked: boolean,
  topicTimer: string,
  privateTopicTimer: string,
  messageBusLastId: number,
  participantCount: number,
};

export type DiscourseTopicSummaryType = {
  id: number,
  title: string,
  fancyTitle: string,
  slug: string,
  postsCount: number,
  replyCount: number,
  highestPostNumber: number,
  imageUrl: string,
  createdAt: string,
  lastPostedAt: string,
  bumped: boolean,
  bumpedAt: string,
  unseen: boolean,
  pinned: boolean,
  unpinned: boolean,
  excerpt: string,
  visible: boolean,
  closed: boolean,
  archived: boolean,
  bookmarked: boolean,
  liked: boolean,
  tags: Array<any>,
  views: number,
  likeCount: number,
  hasSummary: boolean,
  archetype: string,
  lastPosterUsername: string,
  categoryId: number,
  pinnedGlobally: boolean,
  featuredLink: string,
  posters: Array<{
    extras: string,
    description: string,
    userId: number,
    primaryGroupId: {},
  }>,
  participants?: Array<{
    extras: string,
    description: string,
    userId: number,
    primaryGroupId: {},
  }>,
};

export type DiscourseTopicList = {
  canCreateTopic: boolean,
  draft: {},
  draftKey: string,
  draftSequence: number,
  perPage: number,
  moreTopicsUrl: string, // If more than 1 page
  topics: Array<DiscourseTopicSummaryType>,
};

export type TopicByUserName = {
  users: DiscourseUser[],
  primaryGroups: [],
  topicList: {
    canCreateTopic: true,
    draft: null,
    draftKey: 'newTopic',
    draftSequence: 1,
    perPage: 30,
    topics: DiscourseTopicSummaryType[],
  },
};
