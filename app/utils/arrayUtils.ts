/**
 * Fisher-Yates shuffle algorithm
 * Returns a new shuffled array without modifying the original
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Fisher-Yates shuffle with a protected starting position
 * Shuffles array but keeps elements before 'start' index in place
 *
 * @param array - Array to shuffle
 * @param start - Index to start shuffling from (elements before this stay in place)
 */
export const shuffleArrayFrom = <T>(array: T[], start: number): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > start; i--) {
    const j = Math.floor(Math.random() * (i - start + 1)) + start;
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
