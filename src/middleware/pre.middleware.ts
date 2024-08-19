import { Express } from 'express';
import cors from 'cors';
import router from '../routes/router';

export function preMiddleware(app: Express) {
  app.use(
    cors({
      origin: '*', // Allow requests from this origin
      methods: ['GET', 'POST'],
      credentials: true,
    })
  );

  app.use(router);
}
