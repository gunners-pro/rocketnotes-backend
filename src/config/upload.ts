import crypto from 'crypto';
import multer, { Options } from 'multer';
import path from 'path';

const tmp_folder = path.resolve(__dirname, '..', '..', 'tmp');
const upload_folder = path.resolve(__dirname, 'uploads');

const configMulter: Options = {
  storage: multer.diskStorage({
    destination: tmp_folder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export { configMulter, tmp_folder, upload_folder };
