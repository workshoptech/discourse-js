export interface UploadsData {
  id: number;
  userId: number;
  originalFilename: string;
  filesize: number;
  width: number;
  height: number;
  url: string;
  shortUrl?: string;
  createdAt: string;
  updatedAt: string;
  sha1: string;
  origin: null;
  retainHours: null;
}
