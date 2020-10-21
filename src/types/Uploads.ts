export interface Upload {
  extension: string;
  filesize: number;
  humanFilesize: string;
  id: number;
  originalFilename: string;
  retainHours: number | null;
  shortPath: string;
  shortUrl: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
  url: string;
  width: number;
  height: number;
}
