import Discourse from '../index';
import { buildQueryString } from '../utils';
import { PrivateMessageList } from '../types/Messages';
import { Post } from '../types/Posts';

export type MessageParams = {
  page?: number;
  [key: string]: string | number | boolean;
};

export interface SendMessageBody {
  topic_id: number;
  raw: string;
  [key: string]: string | number;
}

export interface IMessages {
  get(params: MessageParams): Promise<PrivateMessageList>;
  getGroupMessages(
    params: { group_name: string } & MessageParams,
  ): Promise<PrivateMessageList>;
  getSentMessages(params: MessageParams): Promise<PrivateMessageList>;
  getAllMessages(
    params: MessageParams,
  ): Promise<[PrivateMessageList, PrivateMessageList]>;
  send(inputs: SendMessageBody): Promise<Post>;
}

export default function Messages(discourse: Discourse): void {
  this.get = async (inputs: MessageParams) => {
    return discourse.get({
      path: buildQueryString(
        `topics/private-messages/${discourse._API_USERNAME}.json`,
        inputs,
      ),
    });
  };

  this.getGroupMessages = async ({
    group_name,
    ...inputs
  }: { group_name: string } & MessageParams) => {
    return discourse.get({
      path: buildQueryString(
        `topics/private-messages-group/${discourse._API_USERNAME}/${group_name}.json`,
        inputs,
      ),
      headers: {
        Accept: 'application/json',
      },
    });
  };

  this.getSentMessages = async (inputs: MessageParams) => {
    return discourse.get({
      path: buildQueryString(
        `topics/private-messages-sent/${discourse._API_USERNAME}.json`,
        inputs,
      ),
    });
  };

  this.getAllMessages = async (inputs: MessageParams) => {
    const getMessages = this.get(inputs);
    const getSentMessages = this.getSentMessages(inputs);

    return Promise.all([getMessages, getSentMessages]);
  };

  this.send = async (inputs: Partial<SendMessageBody> = {}) => {
    return discourse.post({
      path: 'posts',
      body: inputs,
    });
  };
}
