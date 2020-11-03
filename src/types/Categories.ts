import { UserBase } from './Users';
import { TopicList } from './Topics';

export interface Category {
  users: UserBase[];
  primaryGroups: string[];
  topicList: TopicList;
}
