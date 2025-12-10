export interface ErrorResponse {
  success: false;
  message: string;
}

export function createErrorResponse(message: string): ErrorResponse {
  return {
    success: false,
    message,
  };
}
