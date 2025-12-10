interface Question {
  id: string;
  question: string;
  choices: string[];
}

interface ProgressDotsProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, number>;
}

export function ProgressDots({ questions, currentIndex, answers }: ProgressDotsProps) {
  return (
    <div className="flex gap-1">
      {questions.map((q, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i === currentIndex
              ? 'bg-gray-800'
              : answers[q.id] !== undefined
              ? 'bg-gray-600'
              : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

