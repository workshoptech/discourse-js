import { PostsData } from './Posts';
import { DiscourseUser } from './Users';

// ToDo clean up

export interface GetTopicsData {
  post_stream: {
    posts: PostsData[],
    stream: [{}],
  };
  timeline_lookup: [
    {
      number: [{}],
    },
  ];
  id: number;
  title: string;
  fancy_title: string;
  posts_count: number;
  created_at: string;
  views: number;
  reply_count: number;
  participant_count: number;
  like_count: number;
  last_posted_at: {};
  visible: boolean;
  closed: boolean;
  archived: boolean;
  has_summary: boolean;
  archetype: string;
  slug: string;
  category_id: number;
  word_count: {};
  deleted_at: {};
  user_id: number;
  draft: {};
  draft_key: string;
  draft_sequence: {};
  unpinned: {};
  pinned_globally: boolean;
  pinned: boolean;
  pinned_at: string;
  pinned_until: {};
  details: {
    auto_close_at: {},
    auto_close_hours: {},
    auto_close_based_on_last_post: boolean,
    created_by: {
      id: number,
      username: string,
      avatar_template: string,
    },
    last_poster: {
      id: number,
      username: string,
      avatar_template: string,
    },
    participants: [
      {
        id: number,
        username: string,
        avatar_template: string,
        post_count: number,
      },
    ],
    suggested_topics: [
      {
        id: number,
        title: string,
        fancy_title: string,
        slug: string,
        posts_count: number,
        reply_count: number,
        highest_post_number: number,
        image_url: string,
        created_at: string,
        last_posted_at: string,
        bumped: boolean,
        bumped_at: string,
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
        like_count: number,
        views: number,
        category_id: number,
        posters: [
          {
            extras: string,
            description: string,
            user: {
              id: number,
              username: string,
              avatar_template: string,
            },
          },
        ],
      },
    ],
    notification_level: number,
    can_flag_topic: boolean,
  };
  highest_post_number: number;
  deleted_by: {};
  actions_summary: [
    {
      id: number,
      count: number,
      hidden: boolean,
      can_act: boolean,
    },
  ];
  chunk_size: number;
  bookmarked: {};
}

export interface GetTopicData {
  post_stream: {
    posts: PostsData[],
  };
  id: number;
}

export type DiscourseTopic = {
  post_stream: {
    posts: Array<PostsData>,
    stream: Array<number>,
  },
  timeline_lookup: Array<number>,
  tags: Array<string>,
  suggested_topics: Array<{
    id: number,
    title: string,
    fancy_title: string,
    slug: string,
    posts_count: number,
    reply_count: number,
    highest_post_number: number,
    image_url: string,
    created_at: string,
    last_posted_at: string,
    bumped: boolean,
    bumped_at: string,
    unseen: boolean,
    pinned: boolean,
    unpinned: boolean,
    visible: boolean,
    closed: boolean,
    archived: boolean,
    bookmarked: boolean,
    liked: boolean,
    archetype: string | 'regular',
    like_count: number,
    views: number,
    category_id: number,
    featured_link: string,
    posters: Array<{
      extras: string,
      description: string,
      user: {
        id: number,
        username: string,
        name: string,
        avatar_template: string,
      },
    }>,
  }>,
  id: number,
  title: string,
  fancy_title: string,
  posts_count: number,
  created_at: string,
  views: number,
  reply_count: number,
  like_count: number,
  last_posted_at: string,
  visible: boolean,
  closed: boolean,
  archived: boolean,
  has_summary: boolean,
  archetype: string | 'regular',
  slug: string,
  category_id: number,
  word_count: number,
  deleted_at: string,
  pending_posts_count: number,
  user_id: number,
  featured_link: string,
  pinned_globally: boolean,
  pinned_at: string,
  pinned_until: string,
  draft: boolean,
  draft_key: string,
  draft_sequence: number,
  posted: boolean,
  unpinned: {},
  pinned: boolean,
  details: {
    created_by: {
      id: number,
      username: string,
      name: string,
      avatar_template: string,
    },
    last_poster: {
      id: number,
      username: string,
      name: string,
      avatar_template: string,
    },
    participants: Array<{
      id: number,
      username: string,
      name: string,
      avatar_template: string,
      post_count: number,
      primary_group_name: string,
      primary_group_flair_url: string,
      primary_group_flair_color: string,
      primary_group_flair_bg_color: string,
    }>,
    notification_level: number,
    notifications_reason_id: number,
    can_move_posts: boolean,
    can_edit: boolean,
    can_delete: boolean,
    can_remove_allowed_users: boolean,
    can_remove_self_id: number,
    can_invite_to: boolean,
    can_create_post: boolean,
    can_reply_as_new_topic: boolean,
    can_flag_topic: boolean,
    can_convert_topic: boolean,
  },
  current_post_number: number,
  highest_post_number: number,
  last_read_post_number: number,
  last_read_post_id: number,
  deleted_by: null,
  has_deleted: boolean,
  actions_summary: Array<{
    id: number,
    count: number,
    hidden: boolean,
    can_act: boolean,
  }>,
  chunk_size: number,
  bookmarked: boolean,
  topic_timer: string,
  private_topic_timer: string,
  message_bus_last_id: number,
  participant_count: number,
};

export type DiscourseTopicSummaryType = {
  id: number,
  title: string,
  fancy_title: string,
  slug: string,
  posts_count: number,
  reply_count: number,
  highest_post_number: number,
  image_url: string,
  created_at: string,
  last_posted_at: string,
  bumped: boolean,
  bumped_at: string,
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
  like_count: number,
  has_summary: boolean,
  archetype: string,
  last_poster_username: string,
  category_id: number,
  pinned_globally: boolean,
  featured_link: string,
  posters: Array<{
    extras: string,
    description: string,
    user_id: number,
    primary_group_id: {},
  }>,
  participants?: Array<{
    extras: string,
    description: string,
    user_id: number,
    primary_group_id: {},
  }>,
};

export type DiscourseTopicList = {
  can_create_topic: boolean,
  draft: {},
  draft_key: string,
  draft_sequence: number,
  per_page: number,
  more_topics_url: string, // If more than 1 page
  topics: Array<DiscourseTopicSummaryType>,
};

export type TopicByUserName = {
  users: DiscourseUser[],
  primary_groups: [],
  topic_list: {
    can_create_topic: true,
    draft: null,
    draft_key: 'new_topic',
    draft_sequence: 1,
    per_page: 30,
    topics: DiscourseTopicSummaryType[],
  },
};
