import { UserBase } from './Users';

export interface GroupMember extends Omit<UserBase, 'moderator' | 'admin'> {
  addedAt: string;
  title: string;
  lastPostedAt: string;
  lastSeenAt: string;
}

export interface GroupMemberList {
  members: GroupMember[];
  owners: [];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface Group {
  id: number;
  automatic: boolean;
  name: string;
  displayName: string;
  userCount: number;
  mentionableLevel: number;
  messageableLevel: number;
  visibilityLevel: number;
  primaryGroup: boolean;
  title: string | null;
  grantTrustLevel: null;
  incomingEmail: null;
  hasMessages: boolean;
  flairUrl: string | null;
  flairBgColor: string | null;
  flairColor: string | null;
  bioRaw: string | null;
  bioCooked: string | null;
  bioExcerpt: string | null;
  publicAdmission: boolean;
  publicExit: boolean;
  allowMembershipRequests: boolean;
  fullName: string | null;
  defaultNotificationLevel: number;
  membershipRequestTemplate: null;
  membersVisibilityLevel: number;
  canSeeMembers: boolean;
  publishReadState: boolean;
}
