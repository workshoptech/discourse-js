export default function Messages(discourse) {
  this.get = async () => {
    return discourse.get({
      path: `topics/private-messages/${discourse._API_USERNAME}.json`,
    });
  };

  this.getGroupMessages = async ({ group_name }) => {
    return discourse.get({
      path: `topics/private-messages-group/${discourse._API_USERNAME}/${group_name}.json`,
      headers: {
        Accept: 'application/json',
      },
    });
  };

  this.getSentMessages = async () => {
    return discourse.get({
      path: `topics/private-messages-sent/${discourse._API_USERNAME}.json`,
    });
  };

  this.getAllMessages = async () => {
    const getMessages = this.get();
    const getSentMessages = this.getSentMessages();

    return Promise.all([getMessages, getSentMessages]);
  };

  this.send = async ({ topic_id, raw }) => {
    return discourse.post({
      path: 'posts',
      body: {
        topic_id,
        raw,
        archetype: 'private_message',
      },
    });
  };
}
