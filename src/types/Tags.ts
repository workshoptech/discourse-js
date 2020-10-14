export interface TagsGroupData {
  tagGroups: [
    {
      id: number,
      name: string,
      tagNames: string[],
      parentTagName: string,
      onePerTopic: boolean,
    },
  ];
}

export interface TagsListData {
  topicList: {
    canCreateTopic: boolean,
    draft: null,
    draftKey: string,
    draftSequence: number,
    perPage: number,
    tags: TagData[],
    topics: [],
  };
}

export interface TagData {
  id: number;
  name: string;
  topicCount: number;
  staff: boolean;
}
