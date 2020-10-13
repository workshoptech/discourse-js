export interface GetGroupsData {
  members: [
    {
      id: number,
      username: string,
      avatar_template: string,
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
  avatar_template: string,
  title: string,
  last_posted_at: string,
  last_seen_at: string,
};
export type DiscourseGroup = {
  id: number,
  automatic: boolean,
  name: string,
  user_count: number,
  mentionable_level: number,
  messageable_level: number,
  visibility_level: number,
  automatic_membership_email_domains: string,
  automatic_membership_retroactive: boolean,
  primary_group: boolean,
  title: string,
  grant_trust_level: {},
  has_messages: boolean,
  flair_url: string,
  flair_bg_color: string,
  flair_color: string,
  bio_cooked: {},
  public_admission: boolean,
  public_exit: boolean,
  allow_membership_requests: boolean,
  full_name: string,
  default_notification_level: number,
  membership_request_template: string,
  is_group_user: boolean,
};
