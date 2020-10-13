export interface UploadsData {
  id: number;
  user_id: number;
  original_filename: string;
  filesize: number;
  width: number;
  height: number;
  url: string;
  short_url?: string;
  created_at: string;
  updated_at: string;
  sha1: string;
  origin: null;
  retain_hours: null;
}
