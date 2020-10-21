import Discourse from '../index';

export interface IPreferences {
  pickAvatar(params: { username?: string; upload_id?: number }): Promise<null>;
}

export default function Preferences(discourse: Discourse): void {
  this.pickAvatar = async ({
    username,
    upload_id,
  }: { username?: string; upload_id?: number } = {}) => {
    return discourse.put({
      path: `u/${username}/preferences/avatar/pick`,
      body: {
        upload_id,
        type: 'uploaded',
      },
    });
  };
}
