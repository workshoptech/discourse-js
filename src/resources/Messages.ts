import Discourse from '../index';
import { PrivateMessageList } from '../types/Messages';
import { Post } from '../types/Posts';

export interface IMessages {
  get(): Promise<PrivateMessageList>;
  getGroupMessages(params: { group_name: string }): Promise<PrivateMessageList>;
  getSentMessages(): Promise<PrivateMessageList>;
  getAllMessages(): Promise<PrivateMessageList[]>;
  send(params: { topic_id: number, raw: string }): Promise<Post>;
}

export default function Messages(discourse: Discourse) {
  this.get = async () => {
    return discourse.get({
      path: `topics/private-messages/${discourse._API_USERNAME}.json`,
    });
  };

  this.getGroupMessages = async ({ group_name }: { group_name: string }) => {
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

  this.send = async ({ topic_id, raw }: { topic_id: number, raw: string }) => {
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
