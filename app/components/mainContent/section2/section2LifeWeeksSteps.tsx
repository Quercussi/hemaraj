import type { StepConfig } from './section2Types';
import { HER_BIRTHDATE, MY_BIRTHDATE, FIRST_MET } from './section2Data';
import { getWeeksIn80Years } from '@/app/components/mainContent/section2/lifeWeeksSteps/lifeWeeksUtils';
import { LifeWeeksGridVariant } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/LifeWeeksGridVariant';
import { LifeWeeksScreen } from '@/app/components/mainContent/section2/lifeWeeksSteps/LifeWeeksScreen';
import { keyContextBuilder } from '@/app/utils/KeyContextBuilder';
import { KeyContextProvider } from '@/app/hooks/useKeyContext';

const getWeekOfLife = (birthDate: Date, targetDate: Date): number => {
  const diff = targetDate.getTime() - birthDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
};

const now = new Date();
const herLifeWeeks = getWeekOfLife(HER_BIRTHDATE, now);
const myLifeWeeks = getWeekOfLife(MY_BIRTHDATE, now);
const togetherWeeks = getWeekOfLife(FIRST_MET, now);
const herPercentage = ((togetherWeeks / herLifeWeeks) * 100).toFixed(2);
const myPercentage = ((togetherWeeks / myLifeWeeks) * 100).toFixed(2);

const herFirstMetWeek = getWeekOfLife(HER_BIRTHDATE, FIRST_MET);
const herTotalSharedCapacity = getWeeksIn80Years(HER_BIRTHDATE) - herFirstMetWeek;

const herStorySoFarPercentage = ((togetherWeeks / herTotalSharedCapacity) * 100).toFixed(2);
const herStoryLeftPercentage = (100 - Number(herStorySoFarPercentage)).toFixed(2);

// Helper to create a step with KeyContext
const createLifeWeeksStep = (
  id: string,
  gridVariant: LifeWeeksGridVariant,
  narrative: React.ReactNode
): StepConfig => ({
  id,
  component: (
    <KeyContextProvider value={keyContextBuilder().with('narrative', id).build()}>
      <LifeWeeksScreen gridVariant={gridVariant} narrative={narrative} />
    </KeyContextProvider>
  ),
});

export const LIFE_WEEKS_STEPS: StepConfig[] = [
  // Step 1: Introduce 80 years visualization
  createLifeWeeksStep(
    'life-weeks-intro',
    LifeWeeksGridVariant.Normal,
    <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
      This is 80 years of our lives, visualized.
    </p>
  ),

  // Step 2: Show grids + first narrative line
  createLifeWeeksStep(
    'life-weeks-both-1',
    LifeWeeksGridVariant.Normal,
    <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
      Each little box is one week, and the coloured ones are our story together.
    </p>
  ),

  // Step 3: Same grids, second narrative line (for next-step click)
  createLifeWeeksStep(
    'life-weeks-both-2',
    LifeWeeksGridVariant.Normal,
    <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
      Our stories started in different places, but now they run next to each other, week after week.
    </p>
  ),

  // Step 4: Percentage narration - her perspective
  createLifeWeeksStep(
    'life-weeks-percentage-her',
    LifeWeeksGridVariant.DimFuture,
    <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
      You have known me for{' '}
      <span className="font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
        {herPercentage}%
      </span>{' '}
      of your life so far.
    </p>
  ),

  // Step 5: Percentage narration - both perspectives
  createLifeWeeksStep(
    'life-weeks-percentage-both',
    LifeWeeksGridVariant.DimFuture,
    <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
      And I have known you for{' '}
      <span className="font-bold bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent">
        {myPercentage}%
      </span>{' '}
      of mine.
    </p>
  ),

  // Step 6: Percentage narration - how much of our possible story we've already lived (her life)
  createLifeWeeksStep(
    'life-weeks-percentage-future-1',
    LifeWeeksGridVariant.DimBeforeMet,
    <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
      From the week we first met until your 80th birthday, we&apos;ve already lived about{' '}
      <span className="font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
        {herStorySoFarPercentage}%
      </span>{' '}
      of our life.
    </p>
  ),

  // Step 7: Percentage narration - how much is still ahead (her life)
  createLifeWeeksStep(
    'life-weeks-percentage-future-2',
    LifeWeeksGridVariant.DimBeforeMet,
    <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
      That means there&apos;s still about{' '}
      <span className="font-bold bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
        {herStoryLeftPercentage}%
      </span>{' '}
      of our lifetime of us that hasn&apos;t happened yet.
    </p>
  ),

  // Step 8: Simple Narration
  createLifeWeeksStep(
    'life-weeks-percentage-future-3',
    LifeWeeksGridVariant.DimBeforeMet,
    <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
      Our story has only just begun. There are still so many adventures waiting for us.
    </p>
  ),
];
