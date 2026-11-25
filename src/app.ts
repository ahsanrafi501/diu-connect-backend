import express from 'express';
import { handleError, notFound } from './middleware/errors.js';

export const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use(notFound);
app.use(handleError);
