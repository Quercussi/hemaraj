// Core date data and meeting periods for Section 2

export const HER_BIRTHDATE = new Date('2002-12-19');
export const MY_BIRTHDATE = new Date('2003-01-29');
export const FIRST_MET = new Date('2024-11-08');
export const STARTED_DATING = new Date('2025-06-14');

// Relationship phases for coloring
export type RelationshipPhase = 'friends' | 'dating';

// Trip image type
export interface TripImage {
  id: number;
  url: string;
  caption: string;
}

// Trip data structure for timeline storytelling
export interface Trip {
  id: number;
  label: string;
  start: Date;
  end: Date;
  location: string;
  phase: RelationshipPhase;
  narratives: string[];
  images: TripImage[];
}

const imageRootUrl = 'https://6t1huswj455z8hvl.public.blob.vercel-storage.com';

export const TRIPS: Trip[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FRIENDS PHASE (before June 14, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 1,
    label: 'First Meeting',
    start: new Date('2024-11-08'),
    end: new Date('2024-11-10'),
    location: 'Chiang Rai',
    phase: 'friends',
    narratives: [
      'This is the first time we met.',
      'The trip to Khao Chang was awkward.',
      'I was just awkward in general to be honest.',
    ],
    images: [
      { id: 101, url: `${imageRootUrl}/trip1/cafe.jpg`, caption: 'Something Journey' },
      { id: 102, url: `${imageRootUrl}/trip1/cliff.jpg`, caption: 'Khao Chang' },
      { id: 103, url: `${imageRootUrl}/trip1/sheep_holding.jpg`, caption: 'Big Bang' },
      { id: 104, url: `${imageRootUrl}/trip1/sheep_selfie.jpg`, caption: '' },
    ],
  },
  {
    id: 2,
    label: 'Chiang Mai Group Trip',
    start: new Date('2024-12-10'),
    end: new Date('2024-12-12'),
    location: 'Chiang Mai',
    phase: 'friends',
    narratives: [
      'We had our first date here.',
      'And we talked a lot',
      'You explored CMU like for the first time.',
      'And catching up my walking pace.',
    ],
    images: [
      { id: 201, url: `${imageRootUrl}/trip2/wat_lok_moli_lamp.jpg`, caption: 'Wat Lok Moli' },
      { id: 202, url: `${imageRootUrl}/trip2/wat_lok_moli_interior.jpg`, caption: '' },
      { id: 203, url: `${imageRootUrl}/trip2/sushi.jpg`, caption: 'Ew' },
      { id: 204, url: `${imageRootUrl}/trip2/wat_lok_moli.jpg`, caption: '' },
      { id: 205, url: `${imageRootUrl}/trip2/tunnel_temple.jpg`, caption: 'Wat Umong' },
    ],
  },
  {
    id: 3,
    label: 'Bangkok Christmas',
    start: new Date('2024-12-21'),
    end: new Date('2024-12-24'),
    location: 'Bangkok',
    phase: 'friends',
    narratives: [
      'I received my medal with a bad haircut.',
      "I couldn't stop complaining about the bad haircut!",
      'We went to the flower market, which was pretty beautiful.',
      'Not as much as you',
    ],
    images: [
      { id: 301, url: `${imageRootUrl}/trip3/paragon_entrance.jpg`, caption: '' },
      { id: 302, url: `${imageRootUrl}/trip3/boat_trip.jpg`, caption: '' },
      { id: 303, url: `${imageRootUrl}/trip3/one_bangkok_chrismas.jpg`, caption: '' },
      { id: 304, url: `${imageRootUrl}/trip3/flowers.jpg`, caption: 'Pak Khlong Talat' },
      { id: 305, url: `${imageRootUrl}/trip3/wat_arun.jpg`, caption: 'Wat Aruuun' },
    ],
  },
  {
    id: 4,
    label: 'Chiang Mai Trip 1',
    start: new Date('2025-03-28'),
    end: new Date('2025-03-30'),
    location: 'Chiang Mai',
    phase: 'friends',
    narratives: [
      'This was when you came to Chiang Mai alone.',
      'Brave girl!',
      'You also at the start of your matcha addiction spiral! 😊',
    ],
    images: [
      { id: 401, url: `${imageRootUrl}/trip4/cafe.jpg`, caption: 'Chao Chao' },
      { id: 402, url: `${imageRootUrl}/trip4/ban_kang_wat.jpg`, caption: 'Baan Kang Wat' },
      { id: 403, url: `${imageRootUrl}/trip4/breakfast.jpg`, caption: '' },
      { id: 404, url: `${imageRootUrl}/trip4/matcha_cafe.jpg`, caption: 'Matcha again' },
      {
        id: 405,
        url: `${imageRootUrl}/trip4/pha_lad_srgb-4BzZBBki3cbR5T7A2EoyIWC8Bae5Gg.jpg`,
        caption: 'Pha Lad Temple',
      },
    ],
  },
  {
    id: 5,
    label: 'Bangkok Driving Trip',
    start: new Date('2025-05-31'),
    end: new Date('2025-06-3'),
    location: 'Bangkok',
    phase: 'friends',
    narratives: [
      'This was when I drove to Bangkok and back.',
      'With the whole crew of 4 people',
      'All I remembered was getting speeding ticket.',
      'And being drunk',
    ],
    images: [
      { id: 501, url: `${imageRootUrl}/trip5/lampang.jpg`, caption: 'Road to Chaing Mai' },
      { id: 502, url: `${imageRootUrl}/trip5/femboy.jpg`, caption: 'Femboy' },
      { id: 503, url: `${imageRootUrl}/trip5/serious.jpg`, caption: '' },
      { id: 504, url: `${imageRootUrl}/trip5/kawaii.jpg`, caption: '' },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // DATING PHASE (after June 14, 2025)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 6,
    label: 'Chiang Mai Trip 2',
    start: new Date('2025-06-13'),
    end: new Date('2025-06-16'),
    location: 'Chiang Mai',
    phase: 'dating',
    narratives: [
      'We went for the best doughnut ever.',
      'And I purpose to you!',
      'You took 12 hours to respond...',
      'With a Yes!',
    ],
    images: [
      { id: 601, url: `${imageRootUrl}/trip6/doughnut.jpg`, caption: 'Flips & Flips' },
      { id: 602, url: `${imageRootUrl}/trip6/cook.jpg`, caption: 'A cook' },
      { id: 603, url: `${imageRootUrl}/trip6/temple.jpg`, caption: '' },
      { id: 604, url: `${imageRootUrl}/trip6/photographer.jpg`, caption: 'Photographer' },
      { id: 605, url: `${imageRootUrl}/trip6/ratchaphruek.jpg`, caption: 'Ratchaphruek' },
    ],
  },
  {
    id: 7,
    label: "A crash at BB's",
    start: new Date('2025-06-30'),
    end: new Date('2025-07-2'),
    location: 'Chiang Rai',
    phase: 'dating',
    narratives: [
      "We decided that we hadn't been drunk enough on the Bangkok trip.",
      'So we drank again.',
      'This trip is probably the one I realize how good Chiang Rai food is!',
      'I discovered Kaphrao 29',
      'I discovered Chivit Thamma Da',
      'I discovered Larb Bo Thong',
      'Every meal was special!',
    ],
    images: [
      { id: 701, url: `${imageRootUrl}/trip7/bb_image.jpg`, caption: '' },
      { id: 702, url: `${imageRootUrl}/trip7/cafe_girl.jpg`, caption: '' },
      { id: 703, url: `${imageRootUrl}/trip7/chess_and_matcha.jpg`, caption: 'Chess & Matcha' },
      { id: 704, url: `${imageRootUrl}/trip7/kaphrao29.jpg`, caption: 'Kaphrao 29' },
    ],
  },
  {
    id: 8,
    label: 'I Got a Job!',
    start: new Date('2025-07-10'),
    end: new Date('2025-07-14'),
    location: 'Bangkok',
    phase: 'dating',
    narratives: [
      'I traveled before getting a job',
      'I see the Temple of Dawn for the first time',
      'It was beautiful beyond explanation.',
      'Also we found Tuang Dim Sum, which was the best discovery ever.',
    ],
    images: [
      { id: 801, url: `${imageRootUrl}/trip8/cafe.jpg`, caption: '' },
      { id: 802, url: `${imageRootUrl}/trip8/girl_in_tuang.jpg`, caption: '' },
      { id: 803, url: `${imageRootUrl}/trip8/tuang.jpg`, caption: 'Dim Sum!' },
      { id: 804, url: `${imageRootUrl}/trip8/wat_arun.jpg`, caption: 'Temple of Dawn' },
      { id: 805, url: `${imageRootUrl}/trip8/wat_arun_selfie.jpg`, caption: '' },
      { id: 806, url: `${imageRootUrl}/trip8/yaowarat.jpg`, caption: 'Yaowarat' },
    ],
  },
  {
    id: 9,
    label: 'Huh? You Again...',
    start: new Date('2025-07-25'),
    end: new Date('2025-07-29'),
    location: 'Bangkok',
    phase: 'dating',
    narratives: [
      'We were away for just 11 days!',
      'Do you miss me that much?!',
      'Anyway, we went to Sailom Bang Pu',
      'And you shot me a legendary image on Phra Phutthayotfa Bridge!',
    ],
    images: [
      { id: 901, url: `${imageRootUrl}/trip9/beach.jpg`, caption: 'Bang Pu' },
      { id: 902, url: `${imageRootUrl}/trip9/una_yaha.jpg`, caption: '' },
      { id: 903, url: `${imageRootUrl}/trip9/matcha.jpg`, caption: '' },
      { id: 904, url: `${imageRootUrl}/trip9/migraine.jpg`, caption: 'Migraine' },
      { id: 905, url: `${imageRootUrl}/trip9/wat_suthat.jpg`, caption: 'Wat Suthat' },
    ],
  },
  {
    id: 10,
    label: 'DY Mala, my beloved',
    start: new Date('2025-08-6'),
    end: new Date('2025-08-12'),
    location: 'Chaing Rai',
    phase: 'dating',
    narratives: [
      'We tried DY Mala for the first time',
      'Also one of the best discovery of all time',
      'I think I drank a dozen glass of matcha on that trip.',
      'From alcohol to matcha… both financial devastations of different eras.',
      'Different drinks, same bankruptcy',
    ],
    images: [
      { id: 1001, url: `${imageRootUrl}/trip10/akha_farmville.jpg`, caption: 'Akha FarmVille' },
      { id: 1002, url: `${imageRootUrl}/trip10/chiang_saen.jpg`, caption: 'Chiang Saen' },
      { id: 1003, url: `${imageRootUrl}/trip10/dy_mala.jpg`, caption: 'DY Mala' },
      { id: 1004, url: `${imageRootUrl}/trip10/slave.jpg`, caption: 'Slave' },
      { id: 1005, url: `${imageRootUrl}/trip10/barbie_girl.jpg`, caption: '' },
      { id: 1006, url: `${imageRootUrl}/trip10/sheep.jpg`, caption: '' },
      { id: 1007, url: `${imageRootUrl}/trip10/maesai.jpg`, caption: 'Mae Sai' },
    ],
  },
  {
    id: 11,
    label: 'Sushiro',
    start: new Date('2025-08-31'),
    end: new Date('2025-09-01'),
    location: 'Bangkok',
    phase: 'dating',
    narratives: ['We met for just like 2 hours?', 'We only met for Sushiro'],
    images: [{ id: 1101, url: `${imageRootUrl}/trip11/beer.jpg`, caption: 'Beer' }],
  },
  {
    id: 12,
    label: 'Another Bangkok Trip',
    start: new Date('2025-9-12'),
    end: new Date('2025-9-16'),
    location: 'Bangkok',
    phase: 'dating',
    narratives: ['I had the best matcha ever.', "We ate a lot... That's all I remember"],
    images: [
      { id: 1201, url: `${imageRootUrl}/trip12/momo_paradise.jpg`, caption: 'Momo Paradise' },
      { id: 1202, url: `${imageRootUrl}/trip12/best_matcha.jpg`, caption: 'Best Usucha' },
      { id: 1203, url: `${imageRootUrl}/trip12/landhaus.jpg`, caption: 'Landhaus' },
      { id: 1204, url: `${imageRootUrl}/trip12/p_sao.jpg`, caption: '' },
    ],
  },
  {
    id: 13,
    label: 'Beach Trip',
    start: new Date('2025-10-17'),
    end: new Date('2025-10-20'),
    location: 'Pattaya',
    phase: 'dating',
    narratives: [
      'We went to Pattaya with a bus.',
      'We eat a lot of seafood',
      'Unimaginable amount of seafood...',
      'We marathoned Chiikawa as well.',
      "What do you mean I got food poisoning and you don't?",
      'And we went to Ko Lan island!',
      'We rent a bike and I almost injured both of us. 😂',
    ],
    images: [
      { id: 1301, url: `${imageRootUrl}/trip13/beach_gril.jpg`, caption: 'Ko Lan' },
      { id: 1302, url: `${imageRootUrl}/trip13/beer_walk.png`, caption: '' },
      { id: 1303, url: `${imageRootUrl}/trip13/path.jpg`, caption: '' },
      { id: 1304, url: `${imageRootUrl}/trip13/seafood.jpg`, caption: '' },
      { id: 1305, url: `${imageRootUrl}/trip13/rocks.jpg`, caption: '' },
    ],
  },
  {
    id: 14,
    label: 'Mountain Trip!',
    start: new Date('2025-11-12'),
    end: new Date('2025-11-21'),
    location: 'Chiang Rai',
    phase: 'dating',
    narratives: [
      'We went on a mountain driving trip',
      'The view was so great. The air was so nice.',
      'The road though... was not nice',
      'A very eventful trip nonetheless.',
    ],
    images: [
      { id: 1401, url: `${imageRootUrl}/trip14/dy_mala.jpg`, caption: 'DY Mala' },
      { id: 1402, url: `${imageRootUrl}/trip14/cafe.jpg`, caption: 'Chivit Thamma Da' },
      { id: 1403, url: `${imageRootUrl}/trip14/p_sao.jpg`, caption: 'Life Museum' },
      { id: 1404, url: `${imageRootUrl}/trip14/flower_garden_selfie.jpg`, caption: 'Doi Tung' },
      { id: 1405, url: `${imageRootUrl}/trip14/pizza_on_mountain.jpg`, caption: '' },
      {
        id: 1406,
        url: `${imageRootUrl}/trip14/traditional_northern_thai_uniform.jpg`,
        caption: 'Doi Tung',
      },
      { id: 1407, url: `${imageRootUrl}/trip14/snipers.jpg`, caption: 'Sniper' },
    ],
  },
];

// Derived counts and statistics
export const TRIP_COUNT = TRIPS.length;

export const TOTAL_DAYS_SINCE_FIRST_MET = Math.floor(
  (new Date().getTime() - FIRST_MET.getTime()) / (1000 * 60 * 60 * 24)
);

export const TOTAL_DAYS_TOGETHER = TRIPS.reduce((acc, trip) => {
  const days = Math.ceil((trip.end.getTime() - trip.start.getTime()) / (1000 * 60 * 60 * 24));
  return acc + days;
}, 0);

export const FRIENDS_WEEKS = Math.floor(
  (STARTED_DATING.getTime() - FIRST_MET.getTime()) / (1000 * 60 * 60 * 24 * 7)
);

export const DATING_WEEKS = Math.floor(
  (new Date().getTime() - STARTED_DATING.getTime()) / (1000 * 60 * 60 * 24 * 7)
);

export const TOTAL_RELATIONSHIP_WEEKS = FRIENDS_WEEKS + DATING_WEEKS;

// Helper to determine if a trip was during friends or dating phase
export const getTripPhase = (trip: Trip): RelationshipPhase => {
  return trip.start < STARTED_DATING ? 'friends' : 'dating';
};

// Get all images across all trips (for final collage)
export const ALL_TRIP_IMAGES = TRIPS.flatMap((trip) => trip.images);
