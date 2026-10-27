import type { PuppetName } from './components/puppets';

/** Channel links. Leave a value empty and its button reads "opening soon" instead of linking nowhere. */
export const CHANNEL = {
  name: 'Legends n Myths',
  youtube: '',
  tiktok: '',
};

/** One puppet on the screen during a beat. x/y are stage units (1280 × 720 screen, ground at y 610). */
export interface Cue {
  who: PuppetName;
  x: number;
  y?: number;
  /** 1 = normal size. */
  s?: number;
  /** -1 faces left. */
  face?: 1 | -1;
  /** 0 = pressed flat on the cloth (sharp), 1 = held close to the lamp (big, soft shadow). */
  depth?: number;
  /** Small rotation in degrees (a rod tilting the puppet). */
  tilt?: number;
  /** Phone (portrait screen) overrides; without them x is pulled toward the centre. */
  mx?: number;
  ms?: number;
}

export interface Beat {
  caption: string;
  /** Lamp warmth for the beat: 1 is the normal oil-lamp glow, lower is night, higher is dawn. */
  glow: number;
  cast: Cue[];
}

// "Sangkuriang", the channel's first legend, retold in six beats for the hero screen.
export const SANGKURIANG: Beat[] = [
  {
    caption: 'In West Java there is a volcano shaped like a boat lying upside down. This is its story.',
    glow: 1,
    cast: [{ who: 'gunungan', x: 640, y: 640, s: 1.18, depth: 0.15 }],
  },
  {
    caption: 'Long ago, Dayang Sumbi lived by the forest with her son Sangkuriang and their loyal dog, Tumang.',
    glow: 0.92,
    cast: [
      { who: 'palm', x: 260, depth: 0.05, s: 1.1, mx: 330 },
      { who: 'sumbi', x: 500, face: 1, depth: 0.25, s: 1.15, mx: 450 },
      { who: 'sangkuriang', x: 720, face: -1, depth: 0.35, s: 0.95, mx: 660, ms: 0.9 },
      { who: 'tumang', x: 980, face: -1, depth: 0.4, s: 1, mx: 830, ms: 0.75 },
    ],
  },
  {
    caption: 'Sangkuriang grew up far from home. Years later he came back, and did not know his own mother.',
    glow: 0.85,
    cast: [
      { who: 'moon', x: 1000, y: 200, depth: 0, mx: 820, ms: 0.7 },
      { who: 'sumbi', x: 470, face: 1, depth: 0.25, s: 1.15, mx: 440 },
      { who: 'sangkuriang', x: 790, face: -1, depth: 0.4, s: 1.2, mx: 800, ms: 1.1 },
    ],
  },
  {
    caption: 'She knew him. To keep him from a wedding that could never be, she set a task: a lake and a great boat, in one night.',
    glow: 0.8,
    cast: [
      { who: 'moon', x: 280, y: 190, depth: 0, mx: 450, ms: 0.6 },
      { who: 'boat', x: 760, y: 600, depth: 0.3, s: 1.2, tilt: -3, mx: 740, ms: 0.95 },
      { who: 'sangkuriang', x: 450, face: 1, depth: 0.4, s: 1.15, mx: 470 },
    ],
  },
  {
    caption: 'Before dawn, Dayang Sumbi spread red cloth to the east. The roosters thought it was sunrise, and crowed.',
    glow: 1.35,
    cast: [
      { who: 'sumbi', x: 420, face: 1, depth: 0.25, s: 1.15, mx: 430 },
      { who: 'rooster', x: 760, face: -1, depth: 0.4, s: 1.2, mx: 740, ms: 1 },
      { who: 'boat', x: 1080, y: 600, depth: 0.15, s: 0.8, tilt: 4, mx: 870, ms: 0.45 },
    ],
  },
  {
    caption: 'Out of time, he kicked the boat over. It became Tangkuban Parahu, the upturned-boat mountain. Which legend next?',
    glow: 1.1,
    cast: [
      { who: 'mountain', x: 540, y: 610, depth: 0.05, s: 0.95, mx: 530, ms: 0.5 },
      { who: 'explorer', x: 1120, face: -1, depth: 0.3, s: 1, mx: 840, ms: 0.8 },
    ],
  },
];

export type EpisodeStatus = 'Out now' | 'In the workshop' | 'Coming next';

export interface Episode {
  title: string;
  subtitle: string;
  place: string;
  hook: string;
  status: EpisodeStatus;
  length?: string;
  puppet: PuppetName;
  gel: string;
}

export const EPISODES: Episode[] = [
  {
    title: 'Sangkuriang',
    subtitle: 'The Upturned Boat',
    place: 'Bandung, West Java',
    hook: 'Why does a volcano near Bandung look like a boat lying upside down?',
    status: 'Out now',
    length: '2:09',
    puppet: 'boat',
    gel: 'rgb(214,64,48)',
  },
  {
    title: 'Malin Kundang',
    subtitle: 'The Son Who Turned to Stone',
    place: 'Padang, West Sumatra',
    hook: 'On a beach in Padang lies a rock shaped like a kneeling sailor.',
    status: 'In the workshop',
    puppet: 'malin',
    gel: 'rgb(76,172,160)',
  },
  {
    title: 'Roro Jonggrang',
    subtitle: 'A Thousand Temples in One Night',
    place: 'Prambanan, Central Java',
    hook: 'A prince tried to build a thousand temples before sunrise. He almost made it.',
    status: 'Coming next',
    puppet: 'temple',
    gel: 'rgb(255,206,92)',
  },
  {
    title: 'Timun Mas',
    subtitle: 'The Golden Cucumber Girl',
    place: 'Central Java',
    hook: 'A girl born from a cucumber outruns a giant with four magic bags.',
    status: 'Coming next',
    puppet: 'cucumber',
    gel: 'rgb(110,170,84)',
  },
];

/** How a legend becomes a short, in the order the workshop does it. */
export const STEPS = [
  {
    title: 'The story',
    body: 'Each legend is cut down to twelve to eighteen beats, about two minutes. The first three seconds give a real fact you can still visit today, and the last line asks which legend comes next.',
  },
  {
    title: 'The cast',
    body: 'Every character is carved as a profile silhouette, like wayang kulit. Heroes stand slim and straight; giants are round and heavy. Each one keeps its own gel colours from first scene to last.',
  },
  {
    title: 'The voice',
    body: 'A warm storyteller reads the script, then every word is timed. A puppet lifts its arm on the word "kicked", not a moment before.',
  },
  {
    title: 'The lamp',
    body: 'The screen is lit like an oil lamp behind cloth, then rendered at 1080 × 1920 for Shorts and TikTok, with captions burned in for small ears and quiet rooms.',
  },
];

export const PARENT_NOTES = [
  { term: 'Made for Kids', detail: 'Every video is marked Made for Kids on YouTube, so comments and personalised ads are off.' },
  { term: 'About two minutes', detail: 'Short enough for one before bed, long enough to tell a whole legend.' },
  { term: 'Gentle on the scary parts', detail: 'Battles and curses happen off-screen or as shapes and light, never as gore.' },
  { term: 'A moral, not a lecture', detail: 'Each story ends with what its people took from it: kindness to parents, honesty, patience.' },
  { term: 'English first', detail: 'Narrated in English with captions; Indonesian versions follow.' },
];
