import Section1 from '../components/mainContent/Section1';
import { ComponentType } from 'react';

export interface SectionConfig {
  id: number;
  label: string;
  component: ComponentType<{ relationshipStart: string }>;
  description: string;
}

export const sections: SectionConfig[] = [
  {
    id: 0,
    label: 'Our Story',
    component: Section1,
    description: 'Duration Counter',
  },
];
