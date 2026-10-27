import { useId } from 'react';
import { LAMP_STOPS, PUPPETS, type PuppetName } from './puppets';

interface Props {
  who: PuppetName;
  /** viewBox around the puppet, in its own units (feet at 0,0). */
  box: [number, number, number, number];
  /** A tint mixed into the lamp light, usually the character's gel. */
  tint?: string;
  /** Accessible name; leave empty for a purely decorative tile. */
  label: string;
  className?: string;
}

/** A single puppet on its own little lamp-lit square of cloth. */
export function PuppetTile({ who, box, tint, label, className }: Props) {
  const id = useId().replace(/:/g, '');
  const Puppet = PUPPETS[who];
  const [x, y, w, h] = box;
  return (
    <svg className={className} viewBox={box.join(' ')} role={label ? 'img' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true} preserveAspectRatio="xMidYMax meet">
      <defs>
        <radialGradient id={`g${id}`} gradientUnits="userSpaceOnUse" cx={x + w / 2} cy={y + h * 0.38} r={Math.max(w, h) * 0.95}>
          {LAMP_STOPS.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </radialGradient>
      </defs>
      {/* oversized so the light never stops short of the edge, whatever the frame's shape */}
      <rect x={x - w} y={y - h} width={w * 3} height={h * 3} fill={`url(#g${id})`} />
      {tint && <rect x={x - w} y={y - h} width={w * 3} height={h * 3} fill={tint} opacity={0.18} style={{ mixBlendMode: 'multiply' }} />}
      <Puppet noRods />
    </svg>
  );
}
