'use client';

import { AnimatePresence } from 'framer-motion';
import MultipleChoiceTest from '../components/MultipleChoiceTest';
import { LoadingState } from '../components/common/LoadingState';
import type { Question } from '../api/checkMultipleChoice/dto';

interface MCQViewProps {
  questions: Question[];
  isLoading: boolean;
  error: string | null;
  onComplete: () => void;
}

export default function MCQView({ questions, isLoading, error, onComplete }: MCQViewProps) {
  if (isLoading) {
    return <LoadingState>Loading questions...</LoadingState>;
  }

  if (error || questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <p className="text-rose-600">Failed to load questions. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <MultipleChoiceTest questions={questions} onComplete={onComplete} />
      </AnimatePresence>
    </>
  );
}
