import { Stage } from '../../utils/session';

export interface ProgressResponse {
  passwordUnlocked: boolean;
  stage: Stage;
}

export interface ResetResponse {
  success: boolean;
  message: string;
}

