import {HttpErrors} from '@loopback/rest';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleError(error: any): never {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    details: error.details,
  });

  if (error instanceof AppError) {
    // Map status code to appropriate HTTP error
    switch (error.statusCode) {
      case 400:
        throw new HttpErrors.BadRequest(error.message);
      case 401:
        throw new HttpErrors.Unauthorized(error.message);
      case 403:
        throw new HttpErrors.Forbidden(error.message);
      case 404:
        throw new HttpErrors.NotFound(error.message);
      case 409:
        throw new HttpErrors.Conflict(error.message);
      case 422:
        throw new HttpErrors.UnprocessableEntity(error.message);
      default:
        throw new HttpErrors.InternalServerError(error.message);
    }
  }

  // Database-specific errors
  if (error.code === '23502') { // not-null violation
    throw new HttpErrors.BadRequest(`Required field missing: ${error.column}`);
  }
  if (error.code === '23503') { // foreign key violation
    throw new HttpErrors.BadRequest(`Referenced record not found: ${error.detail}`);
  }
  if (error.code === '42703') { // undefined column
    throw new HttpErrors.InternalServerError(`Database schema error: ${error.message}`);
  }

  // Default error
  throw new HttpErrors.InternalServerError(
    'An unexpected error occurred. Please try again later.',
  );
}

export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  DATABASE_ERROR: 'DATABASE_ERROR',
} as const;
