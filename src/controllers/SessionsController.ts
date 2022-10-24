import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import auth from '../config/auth';
import { database } from '../database';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';

class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await database<User>('users').where({ email }).first();

    if (!user) {
      throw new AppError('Email ou senha incorreta', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Email ou senha incorreta', 401);
    }

    const { secret, expiresIn } = auth.jwt;
    const token = sign({}, secret, { subject: String(user.id), expiresIn });

    return response.json({ user, token });
  }
}

export { SessionsController };
