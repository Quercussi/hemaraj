import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';

export { Stage } from '../types/session';
import type { Stage } from '../types/session';

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('Invalid server configuration');
  }
  return secret;
};

const secret = new TextEncoder().encode(getSecret());

export interface SessionPayload extends JWTPayload {
  authenticated: boolean;
  timestamp: number;
  stage: Stage;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1y')
    .sign(secret);

  return token;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      authenticated: payload.authenticated as boolean,
      timestamp: payload.timestamp as number,
      stage: payload.stage as Stage,
    };
  } catch {
    // Silent failure
    return null;
  }
}

/**
 * Updates the session cookie with a new token
 * Handles all cookie configuration (httpOnly, secure, sameSite, etc.)
 */
export async function updateSessionCookie(payload: SessionPayload): Promise<void> {
  const token = await createSessionToken(payload);
  const cookieStore = await cookies();

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
}
