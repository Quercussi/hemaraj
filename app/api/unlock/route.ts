import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyPassword, HASHED_PASSWORD } from '../../utils/passwordHash';
import { createSessionToken } from '../../utils/session';
import { Stage } from '../../types/session';
import type { UnlockRequest, UnlockResponse } from './dto';
import { createSuccessResponse, createErrorResponse } from '../common/dto/ApiResponse';

export async function POST(request: Request) {
  try {
    const body: UnlockRequest = await request.json();
    const { password } = body;

    if (verifyPassword(password, HASHED_PASSWORD)) {
      const sessionToken = await createSessionToken({
        authenticated: true,
        timestamp: Date.now(),
        stage: Stage.MCQ, // Start at MCQ stage after password unlock
      });

      const cookieStore = await cookies();
      cookieStore.set('session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
      });

      const response: UnlockResponse = createSuccessResponse(
        "Welcome, my love ❤️",
        undefined
      );
      return NextResponse.json(response);
    } else {
      const response: UnlockResponse = createErrorResponse(
        "It's quite rude to breach into someone's personal life 😏"
      );
      return NextResponse.json(response, { status: 401 });
    }
  } catch (error) {
    console.error('Unlock API error:', error);
    const response: UnlockResponse = createErrorResponse("Something went wrong");
    return NextResponse.json(response, { status: 500 });
  }
}

