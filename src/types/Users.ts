import { Group } from './Groups';
import { TopicBase } from './Topics';

export interface UserBadge {
  id: number;
  grantedAt: string;
  count: number;
  badgeId: number;
  userId: number;
  grantedById: number;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  grantCount: number;
  allowTitle: boolean;
  multipleGrant: boolean;
  icon: string;
  image: string | null;
  listable: boolean;
  enabled: boolean;
  badgeGroupingId: number;
  system: boolean;
  slug: string;
  manuallyGrantable: boolean;
  badgeTypeId: number;
}

export interface BadgeType {
  id: number;
  name: string;
  sortOrder: number;
}

export interface AuthToken {
  id: number;
  clientIp: string;
  location: string;
  browser: string;
  device: string;
  os: string;
  icon: string;
  createdAt: string;
  seenAt: string;
  isActive: boolean;
}

export interface GroupUser {
  groupId: number;
  userId: number;
  notificationLevel: number;
  owner: boolean;
}

export interface UserOption {
  userId: number;
  mailingListMode: boolean;
  mailingListModeFrequency: 1;
  emailDigests: boolean;
  emailLevel: number;
  emailMessagesLevel: number;
  externalLinksInNewTab: boolean;
  dynamicFavicon: boolean;
  enableQuoting: boolean;
  enableDefer: boolean;
  digestAfterMinutes: number;
  automaticallyUnpinTopics: boolean;
  autoTrackTopicsAfterMsecs: number;
  notificationLevelWhenReplying: number;
  newTopicDurationMinutes: number;
  emailPreviousReplies: number;
  emailInReplyTo: boolean;
  likeNotificationFrequency: number;
  includeTl0InDigests: boolean;
  themeIds: number[];
  themeKeySeq: number;
  allowPrivateMessages: boolean;
  homepageId: null;
  hideProfileAndPresence: boolean;
  textSize: string;
  textSizeSeq: number;
  titleCountMode: string;
  timezone: null;
}

export interface UserBase {
  id: number;
  username: string;
  name: string;
  avatarTemplate: string;
  moderator?: boolean;
  admin?: boolean;
}

export interface UserSummary extends UserBase {
  postCount: number;
  primaryGroupName: string;
  primaryGroupFlairUrl: string;
  primaryGroupFlairColor: string;
  primaryGroupFlairBgColor: string;
}

export interface User extends UserSummary {
  email: string;
  lastPostedAt: string;
  lastSeenAt: string;
  createdAt: string;
  ignored: boolean;
  muted: boolean;
  canIgnoreUser: boolean;
  canMuteUser: boolean;
  canSendPrivateMessages: boolean;
  canSendPrivateMessageToUser: boolean;
  trustLevel: number;
  moderator: boolean;
  admin: boolean;
  title: null;
  badgeCount: number;
  customFields: {};
  timeRead: number;
  recentTimeRead: number;
  primaryGroupId: null;
  featured_topic: null;
  staged: boolean;
  canEdit: boolean;
  canEditUsername: boolean;
  canEditEmail: boolean;
  canEditName: boolean;
  uploadedAvatarId: number;
  hasTitleBadges: boolean;
  pendingCount: number;
  profileViewCount: number;
  secondFactorEnabled: boolean;
  secondFactorBackupEnabled: boolean;
  associatedAccounts: [];
  canBeDeleted: boolean;
  canDeleteAllPosts: boolean;
  locale: null;
  mutedCategoryIds: [];
  watchedTags: [];
  watchingFirstPostTags: [];
  trackedTags: [];
  mutedTags: [];
  trackedCategoryIds: [];
  watchedCategoryIds: [];
  watchedFirstPostCategoryIds: [];
  systemAvatarUploadId: null;
  systemAvatarTemplate: string;
  customAvatarUploadId: number;
  customAvatarTemplate: string;
  mutedUsernames: [];
  ignoredUsernames: [];
  mailingListPostsPerDay: number;
  canChangeBio: boolean;
  userApiKeys: null;
  invitedBy: number | null;
  userAuthTokens?: AuthToken[];
  featuredUserBadgeIds: number[];
  groups: Group[];
  groupUsers: GroupUser[];
}

export interface UserProfile {
  userBadges: UserBadge[];
  badges: Badge[];
  badgeTypes: BadgeType[];
  users: UserBase[];
  user: User;
  userOption: UserOption;
}

export interface UserProfileSummary {
  topics: TopicBase[];
  badges: Badge[];
  badgeTypes: BadgeType[];
  users: UserBase[];
  userSummary: {
    likesGiven: number;
    likesReceived: number;
    topicsEntered: number;
    postsReadCount: number;
    daysVisited: number;
    topicCount: number;
    postCount: number;
    timeRead: number;
    recentTimeRead: number;
    bookmarkCount: number;
    canSeeSummaryStats: true;
    topicIds: number[];
    replies: Array<{
      postNumber: number;
      likeCount: number;
      createdAt: string;
      topicId: number;
    }>;
    links: [];
    mostLikedByUsers: UserBase[];
    mostLikedUsers: UserBase[];
    mostRepliedToUsers: UserBase[];
    badges: UserBadge[];
    topCategories: {
      topicCount: number;
      postCount: number;
      id: number;
      name: string;
      color: string;
      textColor: string;
      slug: string;
      readRestricted: boolean;
      parentCategoryId: number;
    }[];
  };
}
