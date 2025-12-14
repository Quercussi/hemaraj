import type { StepConfig } from './section2Types';
import { INTRO_STEPS } from './section2IntroSteps';
import { LIFE_WEEKS_STEPS } from './section2LifeWeeksSteps';
import { TIMELINE_STEPS } from './section2TimelineSteps';
import { TIMELINE_DETAIL_STEPS } from './section2TimelineDetailSteps';

// ============================================================================
// STEP DEFINITIONS - Flattened from smaller step groups
// ============================================================================

export const STEPS: StepConfig[] = [
  ...INTRO_STEPS,
  ...LIFE_WEEKS_STEPS,
  ...TIMELINE_STEPS,
  ...TIMELINE_DETAIL_STEPS,
];
