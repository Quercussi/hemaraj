import Section1 from '../components/mainContent/Section1';
import Section2 from '@/app/components/mainContent/Section2';
// import Section3 from '@/app/components/mainContent/Section3';
// import Section4 from '@/app/components/mainContent/Section4';
import { ComponentType } from 'react';

export interface SectionConfig {
  id: number;
  label: string;
  component: ComponentType;
  description: string;
}

export const sections: SectionConfig[] = [
  {
    id: 0,
    label: 'Our Story',
    component: Section1,
    description: 'Duration Counter',
  },
  {
    id: 1,
    label: 'Life in Weeks',
    component: Section2,
    description: 'Life in Weeks & Past',
  },
  // {
  //   id: 2,
  //   label: 'Next Milestone',
  //   component: Section3,
  //   description: 'Next Anniversary',
  // },
  // {
  //   id: 3,
  //   label: 'Our Journey',
  //   component: Section4,
  //   description: 'Timeline',
  // },
];
