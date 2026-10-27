// Shadow-puppet silhouettes, drawn the way the video engine draws them: deep ink in profile, detail
// punched through the hide, and coloured gels glowing in the holes. Every puppet stands with its feet
// (or base) at (0, 0) and faces +x; the stage flips and moves it.

export const INK = 'rgb(20,8,4)';

export const GEL = {
  batik: 'rgb(214,118,58)',
  cream: 'rgb(252,224,176)',
  teal: 'rgb(76,172,160)',
  gold: 'rgb(255,206,92)',
  red: 'rgb(214,64,48)',
  indigo: 'rgb(84,96,196)',
  green: 'rgb(110,170,84)',
  plum: 'rgb(150,70,140)',
  rose: 'rgb(236,130,140)',
} as const;

// Lamp light on the cloth, centre to edge (same stops as the engine's lamp).
export const LAMP_STOPS: [number, string][] = [
  [0, 'rgb(255,232,168)'],
  [0.16, 'rgb(255,200,104)'],
  [0.42, 'rgb(238,132,46)'],
  [0.68, 'rgb(168,60,20)'],
  [0.88, 'rgb(84,24,9)'],
  [1, 'rgb(38,10,4)'],
];

export type PuppetName =
  | 'gunungan'
  | 'sumbi'
  | 'sangkuriang'
  | 'tumang'
  | 'boat'
  | 'rooster'
  | 'mountain'
  | 'moon'
  | 'palm'
  | 'explorer'
  | 'malin'
  | 'temple'
  | 'cucumber';

interface PuppetProps {
  /** Hide the hand rods (for cards and small sizes). */
  noRods?: boolean;
}

const Rod = ({ x, y, to = 420 }: { x: number; y: number; to?: number }) => (
  <line x1={x} y1={y} x2={x + 14} y2={to} stroke={INK} strokeWidth={2.4} strokeLinecap="round" opacity={0.85} />
);

/** A ring of small leaf-shaped holes along a path, the "tatah" punching of wayang hide. */
function leafHoles(points: [number, number][], r: number, fill: string) {
  return points.map(([x, y], i) => (
    <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.45} transform={`rotate(${(i * 47) % 180} ${x} ${y})`} fill={fill} />
  ));
}

// ---------------------------------------------------------------- gunungan (kayon)
// The tree-of-life leaf that opens and closes every wayang performance.
const GUNUNGAN_OUTLINE =
  'M0,-430 C40,-372 104,-300 136,-222 C160,-164 166,-112 156,-70 C148,-36 124,-12 92,0 L-92,0 C-124,-12 -148,-36 -156,-70 C-166,-112 -160,-164 -136,-222 C-104,-300 -40,-372 0,-430 Z';

function gununganHoles() {
  // Punched leaves on a lattice, kept inside the outline and off the trunk and the gate.
  const holes: [number, number][] = [];
  for (let y = -380; y < -60; y += 22) {
    const t = (y + 430) / 430;
    const half = 150 * Math.sin(Math.min(1, t * 1.25) * Math.PI * 0.5) - 26;
    for (let x = -half; x <= half; x += 24) {
      const xx = x + ((y / 22) % 2 ? 12 : 0);
      if (Math.abs(xx) < 16) continue;
      if (Math.abs(xx) > half) continue;
      holes.push([xx, y]);
    }
  }
  return holes;
}
const G_HOLES = gununganHoles();

export const Gunungan = (_: PuppetProps) => (
  <g>
    <path d={GUNUNGAN_OUTLINE} fill={INK} />
    {leafHoles(G_HOLES, 7, GEL.gold)}
    {/* trunk and branches */}
    <path d="M-5,-360 L5,-360 L9,-110 L-9,-110 Z" fill={GEL.batik} />
    {[-300, -250, -200, -150].map((y, i) => (
      <g key={y} fill={GEL.batik}>
        <path d={`M4,${y} C30,${y - 20} 60,${y - 18} ${80 - i * 4},${y - 34} L${82 - i * 4},${y - 28} C60,${y - 8} 32,${y - 8} 4,${y + 10} Z`} />
        <path d={`M-4,${y} C-30,${y - 20} -60,${y - 18} ${-80 + i * 4},${y - 34} L${-82 + i * 4},${y - 28} C-60,${y - 8} -32,${y - 8} -4,${y + 10} Z`} />
      </g>
    ))}
    {/* the gate at the foot of the tree */}
    <path d="M-38,-8 L-38,-74 Q0,-112 38,-74 L38,-8 Z" fill={GEL.red} />
    <path d="M-20,-8 L-20,-60 Q0,-80 20,-60 L20,-8 Z" fill={INK} />
    <rect x={-48} y={-12} width={96} height={8} fill={INK} />
    <line x1={0} y1={0} x2={0} y2={300} stroke={INK} strokeWidth={6} />
  </g>
);

// ---------------------------------------------------------------- Dayang Sumbi
export const Sumbi = ({ noRods }: PuppetProps) => (
  <g>
    {!noRods && <Rod x={66} y={-168} />}
    {/* sarong with a trailing hem */}
    <path d="M-26,-128 C-30,-84 -40,-34 -62,0 L46,0 C40,-40 34,-86 30,-128 Z" fill={INK} />
    <path d="M44,0 L62,0 L58,-6 L44,-7 Z" fill={INK} />
    {/* torso, neck, head */}
    <path d="M-22,-126 C-26,-160 -22,-186 -12,-202 L12,-202 C24,-188 28,-160 28,-126 Z" fill={INK} />
    <rect x={-5} y={-218} width={12} height={20} fill={INK} />
    <ellipse cx={2} cy={-234} rx={15} ry={18} fill={INK} />
    <path d="M13,-242 L32,-224 L14,-221 Z" fill={INK} />
    {/* sanggul (hair bun) and hair ornament */}
    <circle cx={-17} cy={-242} r={12} fill={INK} />
    <path d="M-28,-256 L-34,-272 L-24,-262 Z" fill={INK} />
    {/* back arm hanging, front arm reaching forward */}
    <path d="M-14,-198 L-6,-198 L2,-112 L-8,-110 Z" fill={INK} />
    <path d="M12,-198 L20,-196 L34,-156 L28,-152 Z" fill={INK} />
    <path d="M28,-158 L34,-152 L68,-166 L66,-172 Z" fill={INK} />
    {/* gels: kawung on the sarong, a band at the waist */}
    {[-96, -64, -32].map((y) =>
      [-18, 4, 24].map((x) => (
        <g key={`${x}${y}`} fill={GEL.indigo}>
          <ellipse cx={x + (y + 128) * -0.12} cy={y} rx={5} ry={2.6} transform={`rotate(45 ${x + (y + 128) * -0.12} ${y})`} />
          <ellipse cx={x + (y + 128) * -0.12} cy={y} rx={5} ry={2.6} transform={`rotate(-45 ${x + (y + 128) * -0.12} ${y})`} />
        </g>
      )),
    )}
    <path d="M-20,-136 L26,-136 L27,-128 L-21,-128 Z" fill={GEL.gold} />
    <circle cx={4} cy={-182} r={5} fill={GEL.teal} />
    <circle cx={-17} cy={-242} r={4} fill={GEL.gold} />
  </g>
);

// ---------------------------------------------------------------- Sangkuriang
export const Sangkuriang = ({ noRods }: PuppetProps) => (
  <g>
    {!noRods && <Rod x={52} y={-172} />}
    {/* striding legs and feet */}
    <path d="M-8,-104 L4,-104 L-12,0 L-26,0 Z" fill={INK} />
    <path d="M-2,-104 L12,-104 L32,-2 L18,0 Z" fill={INK} />
    <path d="M18,0 L40,0 L36,-6 L20,-7 Z" fill={INK} />
    <path d="M-26,0 L-6,0 L-9,-6 L-24,-6 Z" fill={INK} />
    {/* short kain */}
    <path d="M-18,-146 L20,-146 L30,-92 L-24,-90 Z" fill={INK} />
    {/* torso, neck, head */}
    <path d="M-15,-144 C-19,-172 -15,-190 -8,-204 L13,-204 C22,-188 24,-168 19,-144 Z" fill={INK} />
    <rect x={-4} y={-218} width={11} height={18} fill={INK} />
    <ellipse cx={3} cy={-233} rx={14} ry={16} fill={INK} />
    <path d="M13,-238 L29,-225 L14,-222 Z" fill={INK} />
    {/* iket headband with a tail */}
    <path d="M-14,-246 L18,-244 L16,-236 L-15,-238 Z" fill={INK} />
    <path d="M-13,-242 L-34,-228 L-29,-222 L-12,-235 Z" fill={INK} />
    {/* arm and spear */}
    <path d="M12,-200 L20,-198 L32,-162 L26,-158 Z" fill={INK} />
    <path d="M26,-164 L32,-158 L54,-176 L50,-182 Z" fill={INK} />
    <line x1={10} y1={-120} x2={112} y2={-250} stroke={INK} strokeWidth={4} strokeLinecap="round" />
    <path d="M106,-244 L128,-272 L116,-238 Z" fill={INK} />
    {/* back arm */}
    <path d="M-10,-200 L-2,-200 L-6,-124 L-14,-124 Z" fill={INK} />
    {/* gels: tumpal triangles on the kain, red iket */}
    {[-12, 4, 20].map((x) => (
      <path key={x} d={`M${x - 6},-98 L${x + 6},-98 L${x},-118 Z`} fill={GEL.red} />
    ))}
    <rect x={-10} y={-142} width={26} height={5} fill={GEL.gold} />
    <path d="M-10,-243 L14,-241 L13,-239 L-11,-240 Z" fill={GEL.red} />
  </g>
);

// ---------------------------------------------------------------- Tumang the dog
export const Tumang = ({ noRods }: PuppetProps) => (
  <g>
    {!noRods && <Rod x={60} y={-50} />}
    <path
      d="M-4,-62 C-18,-76 -26,-96 -20,-112 C-12,-98 -4,-84 8,-72
         C30,-80 70,-80 98,-74 L110,-90 L118,-110 L126,-92 L146,-88 L156,-78 L144,-70 L130,-66
         C124,-54 122,-44 120,0 L110,0 L108,-38 C84,-36 54,-36 32,-38 L26,0 L16,0 L14,-42 C4,-46 -2,-52 -4,-62 Z"
      fill={INK}
    />
    <path d="M100,-40 L112,-40 L104,0 L96,0 Z" fill={INK} />
    <path d="M34,-40 L44,-40 L40,0 L30,0 Z" fill={INK} />
    {/* collar and eye */}
    <path d="M106,-84 L118,-78 L114,-70 L102,-76 Z" fill={GEL.gold} />
    <circle cx={132} cy={-84} r={2.6} fill={GEL.cream} />
    {[40, 60, 80].map((x) => (
      <ellipse key={x} cx={x} cy={-58} rx={6} ry={3} fill={GEL.batik} />
    ))}
  </g>
);

// ---------------------------------------------------------------- the great boat
export const Boat = ({ noRods }: PuppetProps) => (
  <g>
    {!noRods && <Rod x={-40} y={-30} />}
    <path d="M-170,-70 L-150,-44 C-90,-4 90,-4 150,-44 L170,-70 L136,-52 C60,-38 -60,-38 -136,-52 Z" fill={INK} />
    <line x1={0} y1={-40} x2={0} y2={-250} stroke={INK} strokeWidth={6} />
    <path d="M6,-244 C80,-200 108,-130 112,-60 L6,-60 Z" fill={INK} />
    <path d="M-6,-220 C-60,-180 -80,-120 -84,-66 L-6,-66 Z" fill={INK} />
    {leafHoles(
      [
        [40, -170],
        [60, -130],
        [34, -110],
        [80, -90],
        [44, -80],
        [-30, -150],
        [-50, -110],
        [-28, -96],
      ],
      8,
      GEL.cream,
    )}
    {[-110, -70, -30, 10, 50, 90].map((x) => (
      <circle key={x} cx={x} cy={-38} r={5} fill={GEL.gold} />
    ))}
  </g>
);

// ---------------------------------------------------------------- rooster at dawn
export const Rooster = ({ noRods }: PuppetProps) => (
  <g>
    {!noRods && <Rod x={10} y={-50} />}
    <path
      d="M-60,-120 C-80,-150 -76,-190 -50,-210 C-58,-176 -46,-150 -24,-126
         C-6,-112 20,-110 40,-124 L44,-160 C40,-176 50,-190 64,-188 L70,-200 L76,-188 L84,-196 L84,-182
         C92,-178 94,-168 90,-160 L104,-152 L90,-148 L86,-130 C82,-100 60,-70 30,-62 L36,0 L28,0 L22,-60 L10,-60 L6,0 L-2,0 L0,-62
         C-30,-70 -50,-90 -60,-120 Z"
      fill={INK}
    />
    <path d="M-50,-210 C-30,-200 -20,-180 -24,-160 C-34,-176 -44,-190 -56,-196 Z" fill={INK} />
    <circle cx={78} cy={-172} r={2.6} fill={GEL.cream} />
    <path d="M64,-188 L70,-200 L76,-188 L84,-196 L84,-184 Z" fill={GEL.red} />
    {leafHoles(
      [
        [-20, -100],
        [0, -96],
        [20, -92],
        [-8, -82],
        [12, -78],
      ],
      7,
      GEL.batik,
    )}
  </g>
);

// ---------------------------------------------------------------- Tangkuban Parahu, the upturned boat
export const Mountain = (_: PuppetProps) => (
  <g>
    <path
      d="M-460,0 C-360,-40 -270,-120 -190,-158 C-120,-190 -40,-196 40,-194 C130,-192 210,-180 270,-148 C340,-110 400,-50 460,0 Z"
      fill={INK}
    />
    {/* the upturned keel line and the crater */}
    <path d="M-170,-150 C-80,-176 80,-178 230,-150" stroke={GEL.batik} strokeWidth={5} fill="none" />
    <path d="M-30,-190 C-10,-176 30,-176 50,-190 Z" fill={GEL.red} />
    {[-300, -240, -170, 200, 270, 330].map((x, i) => (
      <path key={x} d={`M${x},${-38 - (i % 3) * 18} l10,-28 l10,28 Z`} fill={GEL.green} />
    ))}
  </g>
);

export const Moon = (_: PuppetProps) => (
  <g>
    <circle cx={0} cy={0} r={70} fill={INK} />
    <circle cx={0} cy={0} r={56} fill={GEL.cream} />
    <circle cx={-16} cy={-12} r={12} fill={GEL.gold} opacity={0.7} />
    <circle cx={18} cy={18} r={8} fill={GEL.gold} opacity={0.7} />
  </g>
);

export const Palm = (_: PuppetProps) => (
  <g fill={INK}>
    <path d="M-8,0 C-10,-120 4,-240 30,-340 L40,-338 C18,-240 8,-120 10,0 Z" />
    {[
      'M34,-340 C80,-380 140,-370 180,-330 C130,-350 80,-346 40,-330 Z',
      'M34,-340 C70,-320 110,-280 120,-220 C96,-270 64,-306 30,-326 Z',
      'M34,-340 C0,-390 -60,-396 -110,-360 C-60,-372 -10,-362 30,-332 Z',
      'M34,-340 C-4,-320 -40,-280 -54,-224 C-24,-276 6,-306 38,-328 Z',
      'M34,-342 C40,-390 70,-420 110,-430 C80,-404 56,-376 42,-338 Z',
    ].map((d) => (
      <path key={d} d={d} />
    ))}
  </g>
);

// ---------------------------------------------------------------- the time-travelling explorer (channel mascot)
export const Explorer = ({ noRods }: PuppetProps) => (
  <g>
    {!noRods && <Rod x={60} y={-176} />}
    {/* boots and legs */}
    <path d="M-12,-96 L2,-96 L-6,-14 L-20,-14 Z" fill={INK} />
    <path d="M2,-96 L16,-96 L26,-14 L12,-14 Z" fill={INK} />
    <path d="M-24,-16 L-2,-16 L4,0 L-26,0 Z M10,-16 L30,-16 L40,0 L8,0 Z" fill={INK} />
    {/* shorts, shirt, backpack */}
    <path d="M-18,-128 L22,-128 L24,-92 L-20,-92 Z" fill={INK} />
    <path d="M-18,-126 C-22,-160 -16,-186 -8,-200 L14,-200 C24,-184 26,-158 22,-126 Z" fill={INK} />
    <path d="M-50,-190 L-16,-196 L-14,-120 L-46,-118 C-54,-140 -56,-170 -50,-190 Z" fill={INK} />
    {/* head and pith helmet */}
    <rect x={-4} y={-214} width={11} height={18} fill={INK} />
    <ellipse cx={4} cy={-228} rx={14} ry={15} fill={INK} />
    <path d="M14,-230 L24,-222 L14,-218 Z" fill={INK} />
    <path d="M-26,-238 C-26,-268 30,-270 30,-238 Z" fill={INK} />
    <path d="M-34,-240 L40,-240 L36,-232 L-30,-232 Z" fill={INK} />
    {/* arm raising a spyglass */}
    <path d="M12,-196 L20,-194 L36,-170 L30,-164 Z" fill={INK} />
    <path d="M30,-170 L36,-164 L58,-186 L52,-192 Z" fill={INK} />
    <path d="M48,-196 L92,-222 L96,-214 L52,-188 Z" fill={INK} />
    {/* gels: helmet band, backpack buckles, shirt pocket, glass */}
    <path d="M-25,-242 L29,-242 L29,-238 L-25,-238 Z" fill={GEL.teal} />
    <rect x={-42} y={-172} width={20} height={10} fill={GEL.gold} />
    <rect x={-42} y={-146} width={20} height={10} fill={GEL.gold} />
    <rect x={0} y={-176} width={12} height={10} fill={GEL.teal} />
    <circle cx={94} cy={-218} r={3.6} fill={GEL.cream} />
  </g>
);

// ---------------------------------------------------------------- small puppets for the programme cards
export const Malin = (_: PuppetProps) => (
  // the kneeling sailor turned to stone
  <g>
    <path
      d="M-60,0 C-64,-30 -50,-56 -26,-64 L-10,-120 C-14,-140 -4,-156 12,-160 L14,-176 C10,-196 26,-208 40,-200 C52,-194 54,-176 46,-166 L60,-164 L46,-158 C52,-130 50,-100 40,-80 L56,-20 L70,0 Z"
      fill={INK}
    />
    {leafHoles(
      [
        [0, -40],
        [-20, -24],
        [20, -30],
        [10, -100],
        [24, -124],
      ],
      7,
      GEL.teal,
    )}
  </g>
);

export const Temple = (_: PuppetProps) => (
  <g>
    <path
      d="M-110,0 L-110,-40 L-90,-40 L-90,-80 L-70,-80 L-70,-130 L-50,-130 L-46,-180 L-26,-190 L-20,-240 L0,-300 L20,-240 L26,-190 L46,-180 L50,-130 L70,-130 L70,-80 L90,-80 L90,-40 L110,-40 L110,0 Z"
      fill={INK}
    />
    <path d="M-20,0 L-20,-60 Q0,-90 20,-60 L20,0 Z" fill={GEL.gold} />
    {[-60, -30, 30, 60].map((x) => (
      <path key={x} d={`M${x - 6},-96 L${x + 6},-96 L${x},-112 Z`} fill={GEL.batik} />
    ))}
    <circle cx={0} cy={-210} r={8} fill={GEL.batik} />
  </g>
);

export const Cucumber = (_: PuppetProps) => (
  <g>
    <path d="M-40,-10 C-80,-60 -60,-170 10,-200 C70,-220 90,-160 60,-90 C40,-40 0,0 -40,-10 Z" fill={INK} />
    <path d="M10,-200 C14,-220 26,-232 40,-236 L44,-228 C30,-224 22,-214 20,-198 Z" fill={INK} />
    {leafHoles(
      [
        [-20, -60],
        [0, -100],
        [20, -140],
        [-30, -110],
        [30, -90],
        [10, -60],
        [-4, -150],
      ],
      9,
      GEL.gold,
    )}
  </g>
);

export const PUPPETS: Record<PuppetName, (p: PuppetProps) => JSX.Element> = {
  gunungan: Gunungan,
  sumbi: Sumbi,
  sangkuriang: Sangkuriang,
  tumang: Tumang,
  boat: Boat,
  rooster: Rooster,
  mountain: Mountain,
  moon: Moon,
  palm: Palm,
  explorer: Explorer,
  malin: Malin,
  temple: Temple,
  cucumber: Cucumber,
};
