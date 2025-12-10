import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, Stage } from '../../utils/session';
import type { ProgressResponse, ResetResponse } from './dto';

export async function GET() {
  const cookieStore = await cookies();
  
  const sessionToken = cookieStore.get('session')?.value;
  
  if (!sessionToken) {
    return NextResponse.json({
      passwordUnlocked: false,
      stage: Stage.Password,
    });
  }
  
  const session = await verifySessionToken(sessionToken);
  
  if (!session || !session.authenticated) {
    return NextResponse.json({
      passwordUnlocked: false,
      stage: Stage.Password,
    });
  }
  
  const response: ProgressResponse = {
    passwordUnlocked: true,
    stage: session.stage,
  };

  return NextResponse.json(response);
}

export async function DELETE() {
  const cookieStore = await cookies();
  
  // Delete the session cookie (full logout)
  cookieStore.delete('session');

  const response: ResetResponse = {
    success: true,
    message: 'Logged out successfully',
  };

  return NextResponse.json(response);
}





