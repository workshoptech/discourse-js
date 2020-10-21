import Discourse from '../index';
import { GroupMemberList } from '../types/Groups';

export interface IGroups {
  getMembers(params: { group_name: string }): Promise<GroupMemberList>;
}

export default function Groups(discourse: Discourse): void {
  this.getMembers = async ({ group_name }: { group_name: string }) => {
    return discourse.get({
      path: `groups/${group_name}/members.json`,
    });
  };
}
