import Discourse from '../index';
import { Upload } from '../types/Uploads';

export type NewUpload = {
  'files[]': { uri: string; name: string; type: string };
  type: string;
  user_id?: number;
  synchronous?: boolean;
};

export interface IUploads {
  create(body: NewUpload): Promise<Upload>;
}

export default function Uploads(discourse: Discourse): void {
  this.create = async (body: NewUpload) => {
    return discourse.post({
      path: 'uploads.json',
      body,
    });
  };
}
