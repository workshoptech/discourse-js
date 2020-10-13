import { DiscourseInterface } from '../index';

export interface IUsers {
  getUser(params: { username?: string }): Promise<unknown>;
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
