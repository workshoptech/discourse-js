export interface PostsData {
  id: number;
  name: string;
  username: string;
  avatar_template: string;
  created_at: string;
  cooked: string;
  post_number: number;
  post_type: number;
  updated_at: string;
  reply_count: number;
  reply_to_post_number: {};
  quote_count: number;
  avg_time: {};
  incoming_link_count: number;
  reads: number;
  score: number;
  yours: boolean;
  topic_id: number;
  topic_slug: string;
  display_username: string;
  primary_group_name: {};
  primary_group_flair_url: {};
  primary_group_flair_bg_color: {};
  primary_group_flair_color: {};
  version: number;
  can_edit: boolean;
  can_delete: boolean;
  can_recover: boolean;
  can_wiki: boolean;
  read: boolean;
  user_title: {};
  actions_summary: [
    {
      id: number,
      hidden: boolean,
      can_act: boolean,
    },
  ];
  moderator: boolean;
  admin: boolean;
  staff: boolean;
  user_id: number;
  hidden: boolean;
  hidden_reason_id: {};
  trust_level: number;
  deleted_at: {};
  user_deleted: boolean;
  edit_reason: {};
  can_view_edit_history: boolean;
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
  polls_votes?: {
    poll: [string],
  };
}
