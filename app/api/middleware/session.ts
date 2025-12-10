import { cookies } from 'next/headers';
import { verifySessionToken, type SessionPayload } from '../../utils/session';
import { Stage } from '../../types/session';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class SessionError extends ApiError {
  constructor(message: string, statusCode: number = 401) {
    super(message, statusCode);
    this.name = 'SessionError';
  }
}

/**
 * Validate session and optionally check stage
 *
 * @param requiredStage - Optional stage to validate against
 * @returns Session payload
 * @throws SessionError if validation fails
 */
export async function validateSession(requiredStage?: Stage): Promise<SessionPayload> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;

  if (!sessionToken) {
    throw new SessionError('Session not found. Please unlock first.', 401);
  }

  const session = await verifySessionToken(sessionToken);

  if (!session || !session.authenticated) {
    throw new SessionError('Invalid session. Please unlock again.', 401);
  }

  // Verify stage if required
  if (requiredStage !== undefined && session.stage !== requiredStage) {
    throw new SessionError('Invalid stage. Please refresh the page.', 403);
  }

  return session;
}
