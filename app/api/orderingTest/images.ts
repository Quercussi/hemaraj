import type { ImageWithOrder } from './types';

const sourceUrl = '{sourceUrl}';

export const images: ImageWithOrder[] = [
  {
    id: 0,
    url: `${sourceUrl}/ordering-test/one_bangkok_christmas.jpg`,
    caption: 'One Bangkok Christmas',
    correctPosition: 1,
  },
  {
    id: 1,
    url: `${sourceUrl}/ordering-test/sheeps.jpg`,
    caption: 'Sheep on Khao Chang',
    correctPosition: 0,
  },
  {
    id: 2,
    url: `${sourceUrl}/ordering-test/wat_arun.jpg`,
    caption: 'The Temple of Dawn',
    correctPosition: 3,
  },
  {
    id: 3,
    url: `${sourceUrl}/ordering-test/flower_garden.jpg`,
    caption: 'The Flower Garden',
    correctPosition: 2,
  },
  {
    id: 4,
    url: `${sourceUrl}/ordering-test/beach.jpg`,
    caption: 'The Beach',
    correctPosition: 4,
  },
];
