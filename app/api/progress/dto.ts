import type { ApiResponse } from '../common/dto/ApiResponse';
import { Stage } from '../../types/session';

export interface ProgressData {
  passwordUnlocked: boolean;
  stage: Stage;
}

export type ProgressResponse = ApiResponse<ProgressData>;

export type ResetResponse = ApiResponse<undefined>;
