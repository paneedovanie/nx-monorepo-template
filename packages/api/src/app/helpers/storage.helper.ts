import { diskStorage } from 'multer';
import configuration from '../config/configuration';

export const uploadStorage = diskStorage({
  destination: configuration().multer.dest,
  filename: (req, file, callback) => {
    // Generate a unique file name or use the original file name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + '-' + file.originalname);
  },
});
