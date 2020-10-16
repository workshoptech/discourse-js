import { DiscourseInterface } from '../index';
import { GetUsersData, GetUserSummaryData } from '../types/Users';

export interface IUsers {
  getUser(params: { username?: string }): Promise<GetUsersData>;
  getUserSummary(params: { username?: string }): Promise<GetUserSummaryData>;
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

  this.getUserSummary = async ({ username }: { username?: string } = {}) => {
    return discourse
      .get({
        path: `u/${username}/summary.json`,
      })
      .then(response => response)
      .catch(error => error);
  };
}
