import { useLifeWeeksContext } from '@/app/components/mainContent/section2/lifeWeeksSteps/LifeWeeksContext';
import { LifeWeeksTitle } from '@/app/components/mainContent/section2/lifeWeeksSteps/LifeWeeksTitle';
import { LifeWeeksGridCrossfade } from '@/app/components/mainContent/section2/lifeWeeksSteps/LifeWeeksGridCrossfade';
import { PersonKey } from '@/app/components/mainContent/section2/lifeWeeksSteps/enums/PersonKey';
interface LifeWeeksColumnProps {
  person: PersonKey;
  label: string;
}

export const LifeWeeksColumn = ({ person, label }: LifeWeeksColumnProps) => {
  const { herWeeks, myWeeks } = useLifeWeeksContext();
  const weeksArray = person === PersonKey.Her ? herWeeks : myWeeks;

  return (
    <div className="space-y-4">
      <LifeWeeksTitle label={label} />
      <LifeWeeksGridCrossfade weeksArray={weeksArray} />
    </div>
  );
};
