export default function Uploads(discourse) {
  this.create = (body = {}) => {
    return new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: 'POST',
          path: 'uploads.json',
          body,
        })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  };
}
