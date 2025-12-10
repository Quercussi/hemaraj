import type { ApiResponse } from '../common/dto/ApiResponse';

export interface UnlockRequest {
  password: string;
}

export type UnlockResponse = ApiResponse<undefined>;
