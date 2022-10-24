import fs from 'fs';
import path from 'path';

import { tmp_folder, upload_folder } from '../config/upload';

class DiskStorage {
  async saveFile(file: string) {
    await fs.promises.rename(
      path.resolve(tmp_folder, file),
      path.resolve(upload_folder, file),
    );

    return file;
  }

  async deleteFile(file: string) {
    const filePath = path.resolve(upload_folder, file);
    try {
      await fs.promises.stat(filePath);
    } catch (error) {}

    await fs.promises.unlink(filePath);
  }
}

export { DiskStorage };
