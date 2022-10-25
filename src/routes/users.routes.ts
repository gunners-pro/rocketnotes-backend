import { Router } from 'express';
import multer from 'multer';

import { configMulter } from '../config/upload';
import { UsersController } from '../controllers/UsersController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const upload = multer(configMulter);

const usersController = new UsersController();

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    console.log(request.file?.filename);
    return response.json();
  },
);
export { usersRoutes };
