import Discourse from '../index';
import { GetGroupsData } from '../types/Groups';

export interface IGroups {
  getMembers(params: { group_name: string }): Promise<GetGroupsData>;
}

export default function Groups(discourse: Discourse) {
  this.getMembers = async ({ group_name }: { group_name: string }) => {
    return discourse.get({
      path: `groups/${group_name}/members.json`,
    });
  };
}
