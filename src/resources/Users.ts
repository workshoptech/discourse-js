import Discourse from '../index';
import { UserProfile } from '../types/Users';

export interface IUsers {
  getUser(params: { username?: string }): Promise<UserProfile>;
}
export default function Users(discourse: Discourse) {
  this.getUser = async ({ username }: { username?: string } = {}) => {
    return discourse
      .get({
        path: `users/${username}.json`,
      })
      .then(response => response)
      .catch(error => error);
  };
}
