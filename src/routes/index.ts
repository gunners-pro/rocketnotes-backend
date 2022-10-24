import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { notesRoutes } from './notes.routes';
import { sessionsRoutes } from './sessions.routes';
import { tagsRoutes } from './tags.routes';
import { usersRoutes } from './users.routes';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/notes', ensureAuthenticated, notesRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/sessions', sessionsRoutes);

export { routes };
