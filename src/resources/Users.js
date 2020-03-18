import { buildQueryString } from '../utils';

export default function Users(discourse) {
  this.getUser = async ({ username } = {}) => {
    return discourse
      .get({
        path: `users/${username}.json`,
      })
      .then(response => response)
      .catch(error => error);
  };
}
