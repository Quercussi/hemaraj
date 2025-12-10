import {ChoiceItem} from "@/app/components/multipleChoiceTest/ChoiceItem";
import {ProgressDots} from "@/app/components/multipleChoiceTest/ProgressDots";

interface Question {
  id: string;
  question: string;
  choices: string[];
}

interface QuestionCardProps {
  question: Question;
  questions: Question[];
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  allAnswers: Record<string, number>;
  onSelectChoice: (questionId: string, choiceIndex: number) => void;
}

export function QuestionCard({ 
  question,
  questions,
  currentIndex, 
  totalQuestions, 
  selectedAnswer, 
  allAnswers,
  onSelectChoice 
}: QuestionCardProps) {
  return (
    <div className="bg-white shadow-2xl w-full max-w-3xl relative" style={{
      borderRadius: '2px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.1)',
      backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px, 20px 20px',
      backgroundColor: '#f5f5f5',
    }}>
      {/* Paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        borderRadius: '2px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
        opacity: 0.8,
      }}></div>

      <div className="relative z-10 p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 px-2">
          <span className="text-sm text-gray-600 font-mono">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <ProgressDots 
            questions={questions}
            currentIndex={currentIndex} 
            answers={allAnswers}
          />
        </div>

        {/* Question */}
        <h2 className="text-3xl font-semibold text-gray-900 font-serif leading-relaxed mb-2 px-2">
          {question.question}
        </h2>

        {/* Choices */}
        <div className="space-y-1 px-8">
          {question.choices.map((choice, choiceIndex) => (
            <ChoiceItem
              key={choiceIndex}
              choice={choice}
              index={choiceIndex}
              isSelected={selectedAnswer === choiceIndex}
              onSelect={() => onSelectChoice(question.id, choiceIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

