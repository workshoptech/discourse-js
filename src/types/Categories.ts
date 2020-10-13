import { DiscourseUser } from './Users';
import { DiscourseTopicList } from './Topics';

export type DiscourseCategoryType = {
  users: Array<DiscourseUser>,
  primary_groups: Array<string>,
  topic_list: DiscourseTopicList,
};
