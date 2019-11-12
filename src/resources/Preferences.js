export default function Preferences(discourse) {
  this.pickAvatar = ({ username, upload_id } = {}) => {
    return new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: "PUT",
          path: `u/${username}/preferences/avatar/pick`,
          body: {
            upload_id,
            type: "uploaded",
          },
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
};
  