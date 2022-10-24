import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../config/auth';
import { AppError } from '../utils/AppError';

export function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('JWT Token não informado', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch (error) {
    throw new AppError('JWT Token inválido', 401);
  }
}
