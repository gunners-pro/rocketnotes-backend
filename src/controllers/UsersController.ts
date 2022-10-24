import { compare, hash } from 'bcrypt';
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

  async update(request: Request, response: Response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.user;

    const user = await database<User>('users')
      .select('*')
      .where('id', '=', id)
      .first();

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    if (email) {
      const userWithUpdatedEmail = await database<User>('users')
        .select('*')
        .where('email', '=', email)
        .first();

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError('Este e-mail já está em uso');
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha antiga para definir a nova senha',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere');
      }

      user.password = await hash(password, 10);
    }

    await database<User>('users')
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: database.fn.now(),
      })
      .where('id', '=', id);

    return response.json();
  }
}

export { UsersController };
