import { hash } from 'bcrypt';
import { Request, Response } from 'express';

import { database } from '../database';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';

class UsersController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const checkUserExists = await database<User>('users')
      .select('*')
      .where('email', '=', email)
      .first();

    if (checkUserExists) {
      throw new AppError('Este e-mail já está em uso.');
    }

    const hashPassword = await hash(password, 10);

    await database<User>('users').insert({
      name,
      email,
      password: hashPassword,
    });

    return response.status(201).json();
  }
}

export { UsersController };
