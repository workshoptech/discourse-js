import { DiscourseInterface } from '../index';
import { GetUsersData } from '../types/Users';

export interface IUsers {
  getUser(params: { username?: string }): Promise<GetUsersData>;
}
export default function Users(discourse: DiscourseInterface) {
  this.getUser = async ({ username }: { username?: string } = {}) => {
    return discourse
      .get({
        path: `users/${username}.json`,
      })
      .then(response => response)
      .catch(error => error);
  };
}
