import { Group } from './Groups';

interface UserBadge {
  id: number;
  grantedAt: string;
  count: number;
  badgeId: number;
  userId: number;
  grantedById: number;
}

interface Badge {
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

interface BadgeType {
  id: number;
  name: string;
  sortOrder: number;
}

interface AuthToken {
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

interface GroupUser {
  groupId: number;
  userId: number;
  notificationLevel: number;
  owner: boolean;
}

interface UserOption {
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
  lastPostedAt: string;
  lastSeenAt: string;
  createdAt: string;
  websiteName: {};
  canEdit: true;
  canEditUsername: true;
  canEditEmail: true;
  canEditName: true;
  canSendPrivateMessages: true;
  canSendPrivateMessageToUser: true;
  trustLevel: number;
  moderator: true;
  admin: true;
  title: {};
  uploadedAvatarId: {};
  badgeCount: number;
  customFields: {};
  pendingCount: number;
  profileViewCount: number;
  invitedBy: {};
  groups: [
    {
      id: number,
      automatic: true,
      name: string,
      userCount: number,
      aliasLevel: number,
      visible: true,
      automaticMembershipEmailDomains: {},
      automaticMembershipRetroactive: true,
      primaryGroup: true,
      title: {},
      grantTrustLevel: {},
      notificationLevel: {},
      hasMessages: true,
      isMember: true,
      mentionable: true,
      flairUrl: {},
      flairBgColor: {},
      flairColor: {},
    },
  ];
  featuredUserBadgeIds: [{}];
  cardBadge: {};
}

export interface UserDetail extends UserSummary {
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
  canEdit: true;
  canEditUsername: boolean;
  canEditEmail: boolean;
  canEditName: boolean;
  uploadedAvatarId: number;
  hasTitleBadges: true;
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
