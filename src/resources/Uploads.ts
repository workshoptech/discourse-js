import Discourse from '../index';
import { UploadsData } from '../types/Uploads';

export interface IUploads {
  create(body: Object): Promise<UploadsData>;
}
export default function Uploads(discourse: Discourse) {
  this.create = async (body: Object = {}) => {
    return discourse.post({
      path: 'uploads.json',
      body,
    });
  };
}
