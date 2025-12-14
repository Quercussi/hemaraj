import type { ImageWithOrder } from './types';

const imageRootUrl = 'https://6t1huswj455z8hvl.public.blob.vercel-storage.com';

export const images: ImageWithOrder[] = [
  {
    id: 0,
    url: `${imageRootUrl}/ordering-test/one_bangkok_christmas.jpg`,
    caption: 'One Bangkok Christmas',
    correctPosition: 1,
  },
  {
    id: 1,
    url: `${imageRootUrl}/ordering-test/sheeps.jpg`,
    caption: 'Sheep on Khao Chang',
    correctPosition: 0,
  },
  {
    id: 2,
    url: `${imageRootUrl}/ordering-test/wat_arun.jpg`,
    caption: 'The Temple of Dawn',
    correctPosition: 3,
  },
  {
    id: 3,
    url: `${imageRootUrl}/ordering-test/flower_garden.jpg`,
    caption: 'The Flower Garden',
    correctPosition: 2,
  },
  {
    id: 4,
    url: `${imageRootUrl}/ordering-test/beach.jpg`,
    caption: 'The Beach',
    correctPosition: 4,
  },
];
