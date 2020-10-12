export default function Preferences(discourse) {
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
