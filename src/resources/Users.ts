import Discourse from '../index';
import { UserProfile, UserProfileSummary } from '../types/Users';

export interface IUsers {
  getUser(params: { username?: string }): Promise<UserProfile>;
  getUserSummary(params: { username?: string }): Promise<UserProfileSummary>;
}
export default function Users(discourse: Discourse): void {
  this.getUser = async ({ username }: { username?: string } = {}) => {
    return discourse
      .get({
        path: `users/${username}.json`,
      })
      .then(response => response)
      .catch(error => error);
  };

  this.getUserSummary = async ({ username }: { username?: string } = {}) => {
    return discourse
      .get({
        path: `u/${username}/summary.json`,
      })
      .then(response => response)
      .catch(error => error);
  };
}
