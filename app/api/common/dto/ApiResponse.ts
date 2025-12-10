import type { ErrorResponse } from './ErrorResponse';
import { createErrorResponse } from './ErrorResponse';

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export function createSuccessResponse<T>(message: string, data: T): SuccessResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

// Re-export for convenience
export { createErrorResponse };
