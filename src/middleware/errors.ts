import type { ErrorRequestHandler, RequestHandler } from 'express';

export const notFound: RequestHandler = (_request, response) => {
  response.status(404).json({
    error: { code: 'NOT_FOUND', message: 'Route not found' },
  });
};

export const handleError: ErrorRequestHandler = (error: unknown, _request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  console.error('Unexpected API error', error);
  response.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
  });
};
