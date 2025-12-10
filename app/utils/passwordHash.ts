import crypto from 'crypto';

export function hashPassword(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
}

export function verifyPassword(plainPassword: string, hashedPassword: string): boolean {
  const hashedInput = hashPassword(plainPassword);
  return hashedInput === hashedPassword;
}

function getHashedPassword(): string {
  const password = process.env.PASSWORD;
  
  if (!password) {
    throw new Error(
      'PASSWORD environment variable is not set! ' +
      'Please set it in your .env file or environment variables. ' +
      'See PASSWORD_SECURITY.md for setup instructions.'
    );
  }
  
  return hashPassword(password);
}

export const HASHED_PASSWORD = getHashedPassword();

