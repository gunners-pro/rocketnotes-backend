import { Router } from 'express';

import { NotesController } from '../controllers/NotesController';

const notesRoutes = Router();

const usersController = new NotesController();

notesRoutes.post('/:user_id', usersController.create);
notesRoutes.get('/:id', usersController.show);
export { notesRoutes };
