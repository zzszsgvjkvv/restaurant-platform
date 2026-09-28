declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';

  export interface Options {
    cloudinary: any;
    params?: {
      folder?: string | ((req: any, file: any) => string);
      format?: string | ((req: any, file: any) => string | Promise<string>);
      public_id?: (req: any, file: any) => string;
      allowed_formats?: string[];
      [key: string]: any;
    };
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(options: Options);
    _handleFile(req: any, file: any, cb: any): void;
    _removeFile(req: any, file: any, cb: any): void;
  }
}
