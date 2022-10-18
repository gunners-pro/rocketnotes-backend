import { Router } from 'express';

import { notesRoutes } from './notes.routes';
import { usersRoutes } from './users.routes';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/notes', notesRoutes);

export { routes };
