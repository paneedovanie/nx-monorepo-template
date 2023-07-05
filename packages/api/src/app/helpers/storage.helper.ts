import { diskStorage } from 'multer';
import configuration from '../config/configuration';

export const generateUploadName = (fileName: string) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return uniqueSuffix + '-' + fileName;
};

export const uploadStorage = diskStorage({
  destination: configuration().multer.dest,
  filename: (req, file, callback) => {
    callback(null, generateUploadName(file.originalname));
  },
});
