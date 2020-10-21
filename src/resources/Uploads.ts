import Discourse from '../index';
import { Upload } from '../types/Uploads';

interface NewUpload {
  'files[]': { uri: string, name: string, type: string };
  type: string;
  user_id?: number;
  synchronous?: boolean;
}

export interface IUploads {
  create(body: NewUpload): Promise<Upload>;
}
export default function Uploads(discourse: Discourse) {
  this.create = async (body: NewUpload) => {
    return discourse.post({
      path: 'uploads.json',
      body,
    });
  };
}
