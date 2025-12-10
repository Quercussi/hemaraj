interface ProgressIndicatorProps {
  answeredCount: number;
  totalQuestions: number;
}

export function ProgressIndicator({ answeredCount, totalQuestions }: ProgressIndicatorProps) {
  return (
    <div className="fixed bottom-56 left-1/2 -translate-x-1/2 text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
      {answeredCount} of {totalQuestions} answered
    </div>
  );
}
