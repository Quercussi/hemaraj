import type { WeekStatus } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/WeekStatus';
import { LifeWeeksGridVariant } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/LifeWeeksGridVariant';
import { LifeWeeksGrid } from '@/app/components/mainContent/section2/lifeWeeksSteps/LifeWeeksGrid';
import { useLifeWeeksContext } from '@/app/components/mainContent/section2/lifeWeeksSteps/LifeWeeksContext';

interface LifeWeeksGridCrossfadeProps {
  weeksArray: { index: number; status: WeekStatus }[];
}

export const LifeWeeksGridCrossfade = ({ weeksArray }: LifeWeeksGridCrossfadeProps) => {
  const { variant } = useLifeWeeksContext();

  return (
    <div className="relative">
      {/* Normal grid */}
      <div
        className={`transition-opacity duration-500 ${
          variant === LifeWeeksGridVariant.Normal ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <LifeWeeksGrid weeksArray={weeksArray} variant={LifeWeeksGridVariant.Normal} />
      </div>

      {/* Dim future grid */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          variant === LifeWeeksGridVariant.DimFuture ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <LifeWeeksGrid weeksArray={weeksArray} variant={LifeWeeksGridVariant.DimFuture} />
      </div>

      {/* Dim before-met grid */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          variant === LifeWeeksGridVariant.DimBeforeMet ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <LifeWeeksGrid weeksArray={weeksArray} variant={LifeWeeksGridVariant.DimBeforeMet} />
      </div>
    </div>
  );
};
