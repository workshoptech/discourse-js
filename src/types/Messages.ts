import { TopicSummary, TopicList } from './Topics';
import { UserBase } from './Users';

interface PrivateMessageTopic extends TopicSummary {
  archetype: 'private_message';
}

interface PrivateMessageTopicList extends TopicList {
  topics: PrivateMessageTopic[];
}

export interface PrivateMessageList {
  users: UserBase[];
  primaryGroups: string[];
  topicList: PrivateMessageTopicList;
}
