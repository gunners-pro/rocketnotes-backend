import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';

import { routes } from './routes';
import { AppError } from './utils/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'AppError',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => console.log('Server started...'));
