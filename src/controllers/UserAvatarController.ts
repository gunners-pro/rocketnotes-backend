import { Request, Response } from 'express';

import { database } from '../database';
import { User } from '../models/User';
import { DiskStorage } from '../providers/diskStorage';
import { AppError } from '../utils/AppError';

class UserAvatarController {
  async update(request: Request, response: Response) {
    const user_id = request.user.id;
    const avatarFileName = request.file?.filename;
    const diskStorage = new DiskStorage();

    const user = await database<User>('users')
      .select('*')
      .where({ id: user_id })
      .first();

    if (!user) {
      throw new AppError(
        'Somente usuários autenticados podem mudar o avatar',
        401,
      );
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }
    const fileName = await diskStorage.saveFile(String(avatarFileName));
    user.avatar = fileName;
    await database<User>('users').update(user).where({ id: user_id });

    return response.json(user);
  }
}

export { UserAvatarController };
