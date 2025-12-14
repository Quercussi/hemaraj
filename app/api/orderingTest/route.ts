import { NextResponse } from 'next/server';
import type { ImageWithOrder } from './types';
import type { ImageItem, ImagesResponse, OrderSubmission, CheckOrderResponse } from './dto';
import { images } from './images';
import { updateSessionCookie } from '../../utils/session';
import { Stage } from '../../types/session';
import { validateSession, ApiError } from '../middleware/session';
import { createSuccessResponse, createErrorResponse } from '../common/dto/ApiResponse';
import { shuffleArray } from '../../utils/arrayUtils';

const IMAGES_DATA: ImageWithOrder[] = images.sort((a, b) => a.correctPosition - b.correctPosition);

const WRONG_ORDER_MESSAGES = [
  "That's not quite right...",
  'The order is wrong! Were you daydreaming?',
  'Close, but no. Try to remember the timeline!',
  "Seriously? That's the order you chose? Let's try again...",
];

export async function GET() {
  const imageItems: ImageItem[] = IMAGES_DATA.map(({ id, url, caption }) => ({
    id,
    url,
    caption,
  }));

  const response: ImagesResponse = createSuccessResponse('Images retrieved successfully', {
    images: shuffleArray(imageItems),
  });

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const session = await validateSession(Stage.Ordering);

    const body: OrderSubmission = await request.json();
    const { order } = body;
    console.log(order);

    const submittedPositions = order.map((id) => {
      const image = IMAGES_DATA.find((img) => img.id === id);
      return image?.correctPosition;
    });

    const isCorrect = submittedPositions.every((pos, i) => pos === i);

    if (isCorrect) {
      await updateSessionCookie({
        authenticated: session.authenticated,
        timestamp: Date.now(),
        stage: Stage.Content,
      });

      const response: CheckOrderResponse = createSuccessResponse(
        'Perfect! You remember our story 💕',
        { correct: true }
      );
      return NextResponse.json(response);
    } else {
      const response: CheckOrderResponse = createSuccessResponse(
        WRONG_ORDER_MESSAGES[Math.floor(Math.random() * WRONG_ORDER_MESSAGES.length)],
        { correct: false }
      );
      return NextResponse.json(response);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(createErrorResponse(error.message), { status: error.statusCode });
    }

    return NextResponse.json(
      createErrorResponse('Nice try, hacker. Did you really think tampering with the code work?'),
      { status: 500 }
    );
  }
}
