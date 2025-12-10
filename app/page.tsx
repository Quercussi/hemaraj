"use client";

import { useState, useEffect } from 'react';
import PasswordView from './views/PasswordView';
import { LoadingState } from './components/common/LoadingState';
import FloatingHearts from './components/common/FloatingHearts';
import { Stage } from './utils/session';
import type { ProgressResponse } from './api/progress/dto';

export default function Home() {
  const [stage, setStage] = useState<Stage>(Stage.Password);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress');
        const result: ProgressResponse = await response.json();

        if (result.success && result.data.passwordUnlocked) {
          setStage(result.data.stage);
        }
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      } finally {
        setIsLoadingProgress(false);
      }
    };

    void fetchProgress();
  }, []);

    if (isLoadingProgress) {
    return <LoadingState>Loading...</LoadingState>;
  }

  return (
    <>
      {/* Global floating hearts background - always visible */}
      <FloatingHearts />

      {/* Stage-specific content */}
      {stage === Stage.Password && <PasswordView onUnlock={() => setStage(Stage.MCQ)} />}
    </>
  );
}
