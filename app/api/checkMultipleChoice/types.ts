export interface QuestionWithAnswer {
  id: string;
  question: string;
  choices: [string, string, string, string];
  correctAnswer: number;
}
