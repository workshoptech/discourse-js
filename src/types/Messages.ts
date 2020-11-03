import { TopicSummary, TopicList } from './Topics';
import { UserBase } from './Users';

export interface PrivateMessageTopic extends TopicSummary {
  archetype: 'private_message';
}

export interface PrivateMessageTopicList extends TopicList {
  topics: PrivateMessageTopic[];
}

export interface PrivateMessageList {
  users: UserBase[];
  primaryGroups: string[];
  topicList: PrivateMessageTopicList;
}
