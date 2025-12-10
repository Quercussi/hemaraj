import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { QuestionWithAnswer } from './types';
import type {
  Question,
  QuestionsResponse,
  QuizSubmission,
  CheckAnswerResponse,
  QuizResult,
} from './dto';
import { questions } from './questions';
import { Stage } from '../../utils/session';
import { validateSession, ApiError } from '../middleware/session';
import { createSuccessResponse, createErrorResponse } from '../common/dto/ApiResponse';

const QUIZ_DATA: QuestionWithAnswer[] = questions;

const WRONG_ANSWER_MESSAGES = [
  "Really? You got that wrong? I'm disappointed.",
  "Were you even paying attention to our relationship?",
  "Wow, that's... creative. But wrong. Try again!",
  "I expected better from you. 💔",
];

export async function GET() {
  const questionsData: Question[] = QUIZ_DATA.map(({ id, question, choices }) => ({
    id,
    question,
    choices,
  }));

  const response: QuestionsResponse = createSuccessResponse(
    'Questions retrieved successfully',
    { questions: questionsData }
  );

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    // Middleware: Validate session and stage
    const session = await validateSession(Stage.MCQ);

    // Business logic: Validate answers
    const body: QuizSubmission = await request.json();
    const { answers } = body;

    const allCorrect = QUIZ_DATA.every((question, index) => {
      return answers[index] === question.correctAnswer;
    });

    if (allCorrect) {
      // Update session to next stage
      const cookieStore = await cookies();
      const { createSessionToken } = await import('../../utils/session');
      const newToken = await createSessionToken({
        authenticated: session.authenticated,
        timestamp: Date.now(),
        stage: Stage.Ordering,
      });

      cookieStore.set('session', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });

      const response: CheckAnswerResponse = createSuccessResponse(
        "Impressive! You know me well 💕",
        {
          correct: true,
          wrongCount: 0,
          totalQuestions: QUIZ_DATA.length
        }
      );
      return NextResponse.json(response);
    } else {
      const wrongCount = QUIZ_DATA.filter((question, index) => {
        return answers[index] !== question.correctAnswer;
      }).length;

      const response: CheckAnswerResponse = createSuccessResponse(
        WRONG_ANSWER_MESSAGES[Math.min(wrongCount - 1, WRONG_ANSWER_MESSAGES.length - 1)],
        {
          correct: false,
          wrongCount,
          totalQuestions: QUIZ_DATA.length
        }
      );
      return NextResponse.json(response);
    }
  } catch (error) {
    // Handle API errors with status codes
    if (error instanceof ApiError) {
      return NextResponse.json(
        createErrorResponse(error.message),
        { status: error.statusCode }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      createErrorResponse(
        'Nice try, hacker. Did you really think modifying the code would work?'
      ),
      { status: 500 }
    );
  }
}

