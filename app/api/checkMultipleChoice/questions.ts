import type { QuestionWithAnswer } from './types';

export const questions: QuestionWithAnswer[] = [
  {
    id: 'q1',
    question: 'When did we first meet?',
    choices: ['August 13, 2024', 'November 8, 2024', 'December 24, 2024', 'June 14, 2025'],
    correctAnswer: 1,
  },
  {
    id: 'q2',
    question: 'Where did our first date begin?',
    choices: ['A café', 'A cinema', 'A park', 'A temple'],
    correctAnswer: 0,
  },
  {
    id: 'q3',
    question: 'Which is the first ever song I have suggested for you.',
    choices: [
      'Dream a Little Dream of Me, covered by The Mamas & the Papas',
      'Seasons, by Wave to Earth',
      '사랑으로, by Wave to Earth',
      'My Love Mine All Mine, by Mitski',
    ],
    correctAnswer: 0,
  },
  {
    id: 'q4',
    question: 'Which of these flowers have I never given you?',
    choices: ['Carnation', 'Hydrangea', 'Rose', 'Sunflower'],
    correctAnswer: 2,
  },
];
