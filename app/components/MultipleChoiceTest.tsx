'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/soundManager';
import type { CheckAnswerResponse } from '../api/checkMultipleChoice/dto';
import { NavigationButton } from '@/app/components/multipleChoiceTest/NavigationButton';
import { QuestionCard } from '@/app/components/multipleChoiceTest/QuestionCard';
import { ProgressIndicator } from '@/app/components/multipleChoiceTest/ProgressIndicator';
import { ErrorMessage } from '@/app/components/common/ErrorMessage';
import { SubmitButton } from '@/app/components/common/SubmitButton';

interface Question {
  id: string;
  question: string;
  choices: string[];
}

interface MultipleChoiceTestProps {
  questions: Question[];
  onComplete: () => void;
}

export default function MultipleChoiceTest({ questions, onComplete }: MultipleChoiceTestProps) {
  const [[currentCard, direction], setCurrentCard] = useState<[number, number]>([0, 0]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChoiceSelect = (questionId: string, choiceIndex: number) => {
    playSound('tick', 0.3);
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  };

  const handleNext = () => {
    if (currentCard < questions.length - 1) {
      playSound('card-shuffle', 0.4);
      setCurrentCard([currentCard + 1, 1]);
    }
  };

  const handlePrev = () => {
    if (currentCard > 0) {
      playSound('card-shuffle', 0.4);
      setCurrentCard([currentCard - 1, -1]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const answersArray: [number, number, number, number] = questions.map(
        (q) => answers[q.id]
      ) as [number, number, number, number];

      const response = await fetch('/api/checkMultipleChoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersArray }),
      });

      const result: CheckAnswerResponse = await response.json();

      if (!result.success) {
        playSound('error', 0.5);
        setError(result.message);
        return;
      }

      if (result.data.correct) {
        playSound('success', 0.6);
        onComplete();
      } else {
        playSound('error', 0.5);
        setAnswers({});
        setError(result.message);

        await Array.from({ length: currentCard }, (_, i) => currentCard - 1 - i).reduce(
          (promise, i) =>
            promise.then(
              () =>
                new Promise((resolve) =>
                  setTimeout(() => {
                    playSound('card-shuffle', 0.2);
                    setCurrentCard([i, -1]);
                    resolve();
                  }, 100)
                )
            ),
          Promise.resolve()
        );

        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      playSound('error', 0.5);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 1 }),
  };

  const allAnswered = questions.length > 0 && questions.every((q) => answers[q.id] !== undefined);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-center z-10"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent mb-2">
          Let&#39;s See How Well You Know Us
        </h1>
        <p className="text-gray-600">Answer these questions to prove your love 💕</p>
      </motion.div>

      {/* Card Area */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        {/* Navigation */}
        <AnimatePresence>
          {currentCard > 0 && <NavigationButton direction="prev" onClick={handlePrev} />}
        </AnimatePresence>

        <AnimatePresence>
          {currentCard < questions.length - 1 && (
            <NavigationButton direction="next" onClick={handleNext} />
          )}
        </AnimatePresence>

        {/* Cards */}
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          {questions[currentCard] && (
            <motion.div
              key={questions[currentCard].id}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex items-center justify-center px-8"
            >
              <QuestionCard
                question={questions[currentCard]}
                questions={questions}
                currentIndex={currentCard}
                totalQuestions={questions.length}
                selectedAnswer={answers[questions[currentCard].id]}
                allAnswers={answers}
                onSelectChoice={handleChoiceSelect}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ProgressIndicator
          answeredCount={Object.keys(answers).length}
          totalQuestions={questions.length}
        />
      </div>

      {/* Error */}
      <AnimatePresence>{error && <ErrorMessage>{error}</ErrorMessage>}</AnimatePresence>

      {/* Submit */}
      <AnimatePresence>
        {allAnswered && !error && (
          <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit}>
            Submit Answers ✨
          </SubmitButton>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
