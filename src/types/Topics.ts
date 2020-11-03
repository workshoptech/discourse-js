import { Post } from './Posts';
import { UserBase, UserSummary } from './Users';

export interface Tag {
  id: number;
  name: string;
  topicCount: number;
  staff: boolean;
}

export interface TopicBase {
  id: number;
  title: string;
  fancyTitle: string;
  slug: string;
  postsCount: number;
  replyCount: number;
  highestPostNumber: number;
  imageUrl: string | null;
  createdAt: string;
  lastPostedAt: string;
  bumped?: boolean;
  bumpedAt?: string;
  unseen?: boolean;
  pinned: boolean;
  unpinned: boolean | null;
  excerpt?: string;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  bookmarked: boolean;
  liked?: boolean;
  tags?: Tag[];
  views?: number;
  likeCount: number;
  hasSummary?: boolean;
  archetype: 'regular' | 'private_message' | 'banner';
  lastPosterUsername?: string; // Only present on private messages
  categoryId: number | null;
  pinnedGlobally?: boolean;
  featuredLink?: string;
}

export interface TopicSummary extends TopicBase {
  excerpt: string;
  bumped: boolean;
  bumpedAt: string;
  unseen: boolean;
  liked: boolean;
  posters: Array<{
    extras: string | null;
    description: string;
    userId: number;
    primaryGroupId: number | null;
  }>;
  participants?: Array<{
    extras: string | null;
    description: string | null;
    userId: number;
    primaryGroupId: number | null;
  }>;
}

export interface Topic extends TopicBase {
  postStream: {
    posts: Post[];
    stream: number[];
  };
  timelineLookup: Array<number[]>;
  suggestedTopics?: TopicSummary[];
  wordCount: number;
  deletedAt: string | null;
  userId: number;
  pinnedAt: string | null;
  pinnedUntil: string | null;
  draft: string | null;
  draftKey: string;
  draftSequence: number;
  posted: boolean;
  currentPostNumber: number;
  lastReadPostNumber: number;
  lastReadPostId: number;
  deletedBy: null;
  hasDeleted: boolean;
  actionsSummary: Array<{
    id: number;
    count: number;
    hidden: boolean;
    canAct: boolean;
  }>;
  chunkSize: number;
  topicTimer: string;
  privateTopicTimer: string;
  messageBusLastId: number;
  participantCount: number;
  showReadIndicator: boolean;
  details: {
    notificationLevel: number;
    notificationsReasonId: number | null;
    canMovePosts: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canRemoveAllowedUsers: boolean;
    canCreatePost: boolean;
    canReplyAsNewTopic: boolean;
    canFlagTopic: boolean;
    canConvertTopic: boolean;
    canReviewTopic: boolean;
    canRemoveSelfId: number;
    participants: UserSummary[];
    createdBy: UserBase;
    lastPoster: UserBase;
  };
}

export interface TopicPosts {
  id: number;
  postStream: {
    posts: Post[];
  };
}

export interface TopicList {
  canCreateTopic: boolean;
  moreTopicsUrl?: string | null;
  draft: string | null;
  draftKey: string; // 'new_topic' - what others exist?
  draftSequence: number;
  perPage: number;
  topics: TopicSummary[];
}

export interface TopicByUserName {
  users: UserBase[];
  primaryGroups: [];
  topicList: TopicList;
}

export interface TopicByTag extends TopicByUserName {}
export interface TopicByCategoryAndTag extends TopicByUserName {}
