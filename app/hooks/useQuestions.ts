import { useState, useEffect } from 'react';
import type { QuestionsResponse, Question } from '../api/checkMultipleChoice/dto';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/checkMultipleChoice')
      .then((res) => res.json())
      .then((result: QuestionsResponse) => {
        if (result.success) {
          setQuestions(result.data.questions);
        } else {
          setError(result.message);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to load questions');
        setIsLoading(false);
      });
  }, []);

  return { questions, isLoading, error };
}