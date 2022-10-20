import { Router } from 'express';

import { notesRoutes } from './notes.routes';
import { tagsRoutes } from './tags.routes';
import { usersRoutes } from './users.routes';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/notes', notesRoutes);
routes.use('/tags', tagsRoutes);

export { routes };
