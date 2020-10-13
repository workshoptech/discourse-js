export interface TagsGroupData {
  tag_groups: [
    {
      id: number,
      name: string,
      tag_names: string[],
      parent_tag_name: string,
      one_per_topic: boolean,
    },
  ];
}

export interface TagsListData {
  topic_list: {
    can_create_topic: boolean,
    draft: null,
    draft_key: string,
    draft_sequence: number,
    per_page: number,
    tags: TagData[],
    topics: [],
  };
}

export interface TagData {
  id: number;
  name: string;
  topic_count: number;
  staff: boolean;
}
