import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './shared/routes';
import { AppError } from './shared/errors/AppError';
import './shared/container/index';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });

  next();
});

app.listen(3333, () => console.log('Server is running on PORT 3333'));
