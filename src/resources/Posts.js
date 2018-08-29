export default function Posts(discourse) {
  this.create = ({ api_username, topic_id, raw }) => {
    return new Promise((resolve, reject) => {
      if (!api_username)
        return reject(
          new Error("No api_username defined. You must pass a username to the create function.")
        );
      if (!topic_id)
        return reject(new Error("No topic_id defined. You must pass a topic to create function."));

      var form = new FormData();
      form.append("api_key", discourse._API_KEY);
      form.append("api_username", api_username);
      form.append("topic_id", topic_id.toString());
      form.append("raw", raw);

      return fetch(`${discourse._BASE_URL}/posts`, {
        method: "POST",
        mimeType: "multipart/form-data",
        body: form
      })
        .then(response => {
          if (response.ok) {
            return resolve(response.json());
          } else {
            return reject(new Error(response.statusText, response.status));
          }
        })
        .catch(function(error) {
          if (error) {
            return reject(new Error(error));
          }
        });
    });
  };

  this.reply = () =>
    new Promise((resolve, reject) => {
      console.log("Reply");
      resolve("Reply");
    });

  this.like = () => new Promise((resolve, reject) => {});
}
