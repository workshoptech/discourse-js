export default function Messages(discourse) {
  this.get = () => {
    return new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: "GET",
          path: `topics/private-messages/${discourse._API_USERNAME}.json?api_key=${
            discourse._API_KEY
          }&api_username=${discourse._API_USERNAME}`
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  this.getSentMessages = () => {
    return new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: "GET",
          path: `topics/private-messages-sent/${discourse._API_USERNAME}.json?api_key=${
            discourse._API_KEY
          }&api_username=${discourse._API_USERNAME}`
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  this.getAllMessages = () => {
    return new Promise((resolve, reject) => {
      const getMessages = this.get();
      const getSentMessages = this.getSentMessages();

      return Promise.all([getMessages, getSentMessages])
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  };

  this.send = ({ topic_id, raw }) => {
    return new Promise((resolve, reject) => {
      discourse
        .DiscourseResource({
          method: "POST",
          path: "posts",
          body: {
            topic_id,
            raw,
            archetype: "private_message"
          }
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };
}
