import type { ApiResponse } from '../common/dto/ApiResponse';

export interface Question {
  id: string;
  question: string;
  choices: [string, string, string, string];
}

// GET /api/checkMultipleChoice response
export type QuestionsResponse = ApiResponse<{
  questions: Question[];
}>;

// POST /api/checkMultipleChoice request
export interface QuizSubmission {
  answers: [number, number, number, number];
}

// POST /api/checkMultipleChoice response data
export interface QuizResult {
  correct: boolean;
  wrongCount?: number;
  totalQuestions?: number;
}

// POST /api/checkMultipleChoice response
export type CheckAnswerResponse = ApiResponse<QuizResult>;
