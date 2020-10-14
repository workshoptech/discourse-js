export interface GetGroupsData {
  members: [
    {
      id: number,
      username: string,
      avatarTemplate: string,
    },
  ];
  owners: [{}];
  meta: {
    total: number,
    limit: number,
    offset: number,
  };
}
export type GroupMember = {
  id: number,
  username: string,
  name: string,
  avatarTemplate: string,
  title: string,
  lastPostedAt: string,
  lastSeenAt: string,
};
export type DiscourseGroup = {
  id: number,
  automatic: boolean,
  name: string,
  userCount: number,
  mentionableLevel: number,
  messageableLevel: number,
  visibilityLevel: number,
  automaticMembershipEmailDomains: string,
  automaticMembershipRetroactive: boolean,
  primaryGroup: boolean,
  title: string,
  grantTrustLevel: {},
  hasMessages: boolean,
  flairUrl: string,
  flairBgColor: string,
  flairColor: string,
  bioCooked: {},
  publicAdmission: boolean,
  publicExit: boolean,
  allowMembershipRequests: boolean,
  fullName: string,
  defaultNotificationLevel: number,
  membershipRequestTemplate: string,
  isGroupUser: boolean,
};
