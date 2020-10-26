import { UserBase } from './Users';
import { TopicList } from './Topics';

export type Category = {
  users: UserBase[];
  primaryGroups: string[];
  topicList: TopicList;
};
