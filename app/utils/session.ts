import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const getSecret = () => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    console.warn('⚠️  SESSION_SECRET not set! Using fallback (INSECURE for production)');
    return 'fallback-secret-key-please-set-SESSION_SECRET-in-env-at-least-32-chars';
  }
  if (secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters long');
  }
  return secret;
};

const secret = new TextEncoder().encode(getSecret());

export enum Stage {
  Password = 'password',
  MCQ = 'mcq',
  Ordering = 'ordering',
  Content = 'content'
}

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
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

