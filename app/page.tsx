'use client';

import { useState, useEffect } from 'react';
import { useQuestions } from './hooks/useQuestions';
import { useImages } from './hooks/useImages';
import PasswordView from './views/PasswordView';
import MCQView from './views/MCQView';
import OrderingView from './views/OrderingView';
import { LoadingState } from './components/common/LoadingState';
import FloatingHearts from './components/common/FloatingHearts';
import { Stage } from './types/session';
import type { ProgressResponse } from './api/progress/dto';

export default function Home() {
  const [stage, setStage] = useState<Stage>(Stage.Password);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  const { questions, isLoading: questionsLoading, error: questionsError } = useQuestions();
  const { images, isLoading: imagesLoading, error: imagesError } = useImages();

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/progress');
      const result: ProgressResponse = await response.json();

      if (result.success && result.data.passwordUnlocked) {
        setStage(result.data.stage);
      } else {
        setStage(Stage.Password);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    } finally {
      setIsLoadingProgress(false);
    }
  };

  useEffect(() => {
    void fetchProgress();
  }, []);

  const handleStageComplete = async () => {
    setIsLoadingProgress(true);
    await fetchProgress();
  };

  if (isLoadingProgress) {
    return <LoadingState>Loading...</LoadingState>;
  }

  return (
    <>
      {/* Global floating hearts background - always visible */}
      <FloatingHearts />

      {/* Stage-specific content */}
      {stage === Stage.Password && <PasswordView onUnlock={handleStageComplete} />}
      {stage === Stage.MCQ && (
        <MCQView
          questions={questions}
          isLoading={questionsLoading}
          error={questionsError}
          onComplete={handleStageComplete}
        />
      )}
      {stage === Stage.Ordering && (
        <OrderingView
          images={images}
          isLoading={imagesLoading}
          error={imagesError}
          onComplete={handleStageComplete}
        />
      )}
        />
      )}
    </>
  );
}
