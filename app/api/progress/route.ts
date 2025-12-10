import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '../../utils/session';
import { Stage } from '../../types/session';
import type { ProgressResponse, ResetResponse } from './dto';
import { createSuccessResponse } from '../common/dto/ApiResponse';

export async function GET() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get('session')?.value;

  if (!sessionToken) {
    return NextResponse.json(
      createSuccessResponse('No session found', {
        passwordUnlocked: false,
        stage: Stage.Password,
      })
    );
  }

  const session = await verifySessionToken(sessionToken);

  if (!session || !session.authenticated) {
    return NextResponse.json(
      createSuccessResponse('Session invalid', {
        passwordUnlocked: false,
        stage: Stage.Password,
      })
    );
  }

  const response: ProgressResponse = createSuccessResponse('Progress retrieved', {
    passwordUnlocked: true,
    stage: session.stage,
  });

  return NextResponse.json(response);
}

export async function DELETE() {
  const cookieStore = await cookies();

  // Delete the session cookie (full logout)
  cookieStore.delete('session');

  const response: ResetResponse = createSuccessResponse('Logged out successfully', undefined);

  return NextResponse.json(response);
}
