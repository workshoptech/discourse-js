import { UserBase } from './Users';
import { TopicList } from './Topics';

export type Category = {
  users: Array<UserBase>,
  primaryGroups: Array<string>,
  topicList: TopicList,
};
