import type { ApiResponse } from '../common/dto/ApiResponse';

export interface ImageItem {
  id: number;
  url: string;
  caption: string;
}

// GET /api/orderingTest response
export type ImagesResponse = ApiResponse<{
  images: ImageItem[];
}>;

// POST /api/orderingTest request
export interface OrderSubmission {
  order: (number | null)[];
}

// POST /api/orderingTest response data
export interface OrderResult {
  correct: boolean;
}

// POST /api/orderingTest response
export type CheckOrderResponse = ApiResponse<OrderResult>;
