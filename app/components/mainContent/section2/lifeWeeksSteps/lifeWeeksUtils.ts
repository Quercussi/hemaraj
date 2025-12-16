import dayjs from 'dayjs';
import {
  HER_BIRTHDATE,
  MY_BIRTHDATE,
  FIRST_MET,
  STARTED_DATING,
} from '@/app/components/mainContent/section2/section2Data';
import { WeekStatus } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/WeekStatus';
import { PersonKey } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/PersonKey';
import { LifeWeeksGridVariant } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/LifeWeeksGridVariant';

export const getWeeksIn80Years = (birthDate: Date): number => {
  const start = dayjs(birthDate);
  const end80 = start.add(80, 'year');
  return end80.diff(start, 'week');
};

export const getWeekStatus = (
  weekIndex: number,
  birthDate: Date,
  firstMet: Date,
  startedDating: Date,
  now: Date
): WeekStatus => {
  const weekDate = dayjs(birthDate).add(weekIndex, 'week').toDate();

  if (weekDate < birthDate) return WeekStatus.BeforeBirth;
  if (weekDate > now) return WeekStatus.Future;
  if (weekDate >= startedDating) return WeekStatus.Dating;
  if (weekDate >= firstMet) return WeekStatus.MetNotDating;
  return WeekStatus.BeforeMet;
};

export const getWeekColor = (status: WeekStatus) => {
  switch (status) {
    case WeekStatus.BeforeMet:
      return 'bg-gray-900';
    case WeekStatus.MetNotDating:
      return 'bg-yellow-400';
    case WeekStatus.Dating:
      return 'bg-rose-500';
    case WeekStatus.Future:
      return 'bg-rose-300';
    default:
      return 'bg-gray-200';
  }
};

export const createOpacityResolver =
  (variant: LifeWeeksGridVariant) =>
  (status: WeekStatus): string => {
    switch (variant) {
      case LifeWeeksGridVariant.Normal:
        return status === WeekStatus.Future ? 'opacity-50' : '';
      case LifeWeeksGridVariant.DimFuture:
        return status === WeekStatus.Future ? 'opacity-30' : '';
      case LifeWeeksGridVariant.DimBeforeMet:
        return status === WeekStatus.BeforeMet ? 'opacity-30' : '';
      default:
        return '';
    }
  };

export const generateWeeksArray = (person: PersonKey) => {
  const birthDate = person === PersonKey.Her ? HER_BIRTHDATE : MY_BIRTHDATE;
  const totalWeeks = getWeeksIn80Years(birthDate);
  const now = new Date();

  return Array.from({ length: totalWeeks }, (_, i) => {
    const status = getWeekStatus(i, birthDate, FIRST_MET, STARTED_DATING, now);
    return { index: i, status };
  });
};

export const HER_WEEKS = generateWeeksArray(PersonKey.Her);
export const MY_WEEKS = generateWeeksArray(PersonKey.Mine);
