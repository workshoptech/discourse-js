import { DiscourseInterface } from '../index';
import { UploadsData } from '../types/Uploads';

export interface IUploads {
  create(body: Object): Promise<UploadsData>;
}
export default function Uploads(discourse: DiscourseInterface) {
  this.create = async (body: Object = {}) => {
    return discourse.post({
      path: 'uploads.json',
      body,
    });
  };
}
