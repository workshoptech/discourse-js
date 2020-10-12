export default function Uploads(discourse) {
  this.create = async (body = {}) => {
    return discourse.post({
      path: 'uploads.json',
      body,
    });
  };
}
