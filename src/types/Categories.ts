import { DiscourseUser } from './Users';
import { DiscourseTopicList } from './Topics';

export type CategoriesData = {
  users: Array<DiscourseUser>,
  primaryGroups: Array<string>,
  topicList: DiscourseTopicList,
};
