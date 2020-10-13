import { DiscourseInterface } from '../index';

export interface IPreferences {
  pickAvatar(params: {
    username?: string,
    upload_id?: number,
  }): Promise<unknown>;
}

export default function Preferences(discourse: DiscourseInterface) {
  this.pickAvatar = async ({
    username,
    upload_id,
  }: { username?: string, upload_id?: number } = {}) => {
    return discourse.put({
      path: `u/${username}/preferences/avatar/pick`,
      body: {
        upload_id,
        type: 'uploaded',
      },
    });
  };
}
