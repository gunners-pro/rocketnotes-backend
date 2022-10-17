import { Router } from 'express';

import { AppError } from '../utils/AppError';

const usersRoutes = Router();
usersRoutes.get('/', (request, response) => {
  const { name } = request.body;

  if (!name) {
    throw new AppError('Nome obrigatorio');
  }

  response.status(201).json({ name });
});

export { usersRoutes };
