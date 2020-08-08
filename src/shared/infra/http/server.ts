import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const server = express();
server.use(cors());
server.use(express.json());

server.use(routes);
server.use(errors());

server.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

server.listen(process.env.PORT, () => {
  console.log(`
  🍀️ Server is running on port ${process.env.PORT}! Rock on! 🎸️
  💻️ This code is developed by lalves86
  if you want to know more, find me at:
  https://github.com/lalves86
  `);
});
