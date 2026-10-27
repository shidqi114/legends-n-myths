import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import type { Beat, Cue } from '../content';
import { INK, LAMP_STOPS, PUPPETS, type PuppetName } from './puppets';

const W = 1280;
const H = 720;
const BEAT_MS = 7000;
const BLUR_STEPS = 6;
// Puppets are lit from behind; this is roughly where their middle sits above the feet.
const ANCHOR_Y = -150;
// Keeps the lamp off the very edge so the far side of the screen never goes fully dark.
const LAMP_MIN_X = 160;

interface Lamp {
  x: number;
  y: number;
}

const useMedia = (query: string) => {
  // Starts false on every render path so prerendered HTML and the first client render agree; the effect corrects it.
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
};

// On phones the screen is cropped to 4:5 around the centre, so scenes are pulled inward.
const PORTRAIT_SQUEEZE = 0.45;

/** Where each puppet is during `index`: its own cue, or the nearest earlier/later one while hidden. */
function placeCast(beats: Beat[], index: number) {
  const names = new Set<PuppetName>();
  beats.forEach((b) => b.cast.forEach((c) => names.add(c.who)));
  return [...names].map((who) => {
    const here = beats[index].cast.find((c) => c.who === who);
    if (here) return { cue: here, on: true };
    for (let k = 1; k < beats.length; k++) {
      const prev = beats[(index - k + beats.length) % beats.length].cast.find((c) => c.who === who);
      if (prev) return { cue: prev, on: false };
    }
    return { cue: { who, x: W / 2 } as Cue, on: false };
  });
}

export function ShadowStage({ beats, title }: { beats: Beat[]; title: string }) {
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const portrait = useMedia('(max-width: 700px)');
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const [lamp, setLamp] = useState<Lamp>({ x: W / 2, y: 300 });
  const [flicker, setFlicker] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);
  const target = useRef<Lamp | null>(null);
  const beat = beats[index];

  useEffect(() => setPlaying((p) => p && !reduced), [reduced]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % beats.length), BEAT_MS);
    return () => window.clearTimeout(id);
  }, [playing, index, beats.length]);

  // The lamp: eases toward the visitor's pointer, otherwise sways a little, and the flame flickers.
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const idle = reduced
        ? { x: W / 2, y: 300 }
        : { x: W / 2 + Math.sin(t * 0.37) * 70 + Math.sin(t * 1.3) * 10, y: 300 + Math.sin(t * 0.53 + 1) * 24 };
      const goal = target.current ?? idle;
      setLamp((l) => {
        const nx = l.x + (goal.x - l.x) * 0.12;
        const ny = l.y + (goal.y - l.y) * 0.12;
        return Math.abs(nx - l.x) + Math.abs(ny - l.y) < 0.05 ? l : { x: nx, y: ny };
      });
      if (!reduced) setFlicker(1 + 0.035 * Math.sin(t * 6.1) * Math.sin(t * 2.3 + 0.4) + 0.018 * Math.sin(t * 17.3));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const toStage = useCallback((clientX: number, clientY: number): Lamp | null => {
    const svg = svgRef.current;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return null;
    const p = new DOMPoint(clientX, clientY).matrixTransform(m.inverse());
    return { x: Math.max(LAMP_MIN_X, Math.min(W - LAMP_MIN_X, p.x)), y: Math.max(40, Math.min(620, p.y)) };
  }, []);

  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    target.current = toStage(e.clientX, e.clientY);
  };
  const onPointerLeave = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType === 'mouse') target.current = null;
  };
  const onKeyDown = (e: KeyboardEvent<SVGSVGElement>) => {
    const step = 60;
    const d: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = d[e.key];
    if (!move) return;
    e.preventDefault();
    const from = target.current ?? lamp;
    target.current = { x: Math.max(LAMP_MIN_X, Math.min(W - LAMP_MIN_X, from.x + move[0])), y: Math.max(40, Math.min(620, from.y + move[1])) };
  };

  const go = (i: number) => setIndex((i + beats.length) % beats.length);
  const placed = useMemo(() => placeCast(beats, index), [beats, index]);
  const radius = 980 * beat.glow * flicker;
  const ease = reduced ? '0.01s' : '1.4s';

  return (
    <figure className="stage">
      <div className="stage__frame">
        <svg
          ref={svgRef}
          className="stage__screen"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label={`${title}, shadow-puppet screen. ${beat.caption} Use the arrow keys to move the lamp.`}
          tabIndex={0}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerMove}
          onPointerLeave={onPointerLeave}
          onKeyDown={onKeyDown}
        >
          <defs>
            <radialGradient id="lamp" gradientUnits="userSpaceOnUse" cx={lamp.x} cy={lamp.y} r={radius}>
              {LAMP_STOPS.map(([o, c]) => (
                <stop key={o} offset={o} stopColor={c} />
              ))}
            </radialGradient>
            {Array.from({ length: BLUR_STEPS }, (_, i) => (
              <filter key={i} id={`soft${i}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation={i * 0.7} />
              </filter>
            ))}
            <filter id="weave" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9 0.06" numOctaves={2} seed={7} />
              <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.15  0 0 0 0 0.05  0 0 0 0.55 0" />
            </filter>
          </defs>

          <rect width={W} height={H} fill="url(#lamp)" />

          {placed.map(({ cue, on }) => {
            const Puppet = PUPPETS[cue.who];
            const x = portrait ? (cue.mx ?? W / 2 + (cue.x - W / 2) * PORTRAIT_SQUEEZE) : cue.x;
            const s = (portrait ? cue.ms : undefined) ?? cue.s ?? 1;
            const face = cue.face ?? 1;
            const depth = cue.depth ?? 0.2;
            const y = cue.y ?? 610;
            // The closer a puppet is held to the lamp, the further its shadow swings away from the light,
            // the bigger it grows and the softer its edge.
            const dx = ((x - lamp.x) * depth * 0.22) / (s * face);
            const dy = ((y + ANCHOR_Y * s - lamp.y) * depth * 0.12) / s;
            const grow = 1 + depth * 0.3;
            const blur = Math.min(BLUR_STEPS - 1, Math.round(depth * BLUR_STEPS));
            return (
              <g
                key={cue.who}
                style={{
                  transform: `translate(${x}px, ${y}px) scale(${s * face}, ${s}) rotate(${cue.tilt ?? 0}deg)`,
                  opacity: on ? 1 : 0,
                  transition: `transform ${ease} cubic-bezier(.45,.05,.25,1), opacity ${reduced ? '0.01s' : '0.9s'} ease`,
                }}
              >
                <g
                  transform={`translate(${dx} ${dy}) translate(0 ${ANCHOR_Y}) scale(${grow}) translate(0 ${-ANCHOR_Y})`}
                  filter={blur ? `url(#soft${blur})` : undefined}
                >
                  <Puppet />
                </g>
              </g>
            );
          })}

          {/* the stage: a grass strip at the foot of the cloth, valances top and bottom */}
          <path
            d={`M0,612 ${Array.from({ length: 33 }, (_, i) => `L${i * 40 + 20},${596 + ((i * 7) % 3) * 5} L${i * 40 + 40},612`).join(' ')} L${W},${H} L0,${H} Z`}
            fill={INK}
          />
          <rect width={W} height={14} fill={INK} />
          <rect width={W} height={H} filter="url(#weave)" style={{ mixBlendMode: 'multiply' }} opacity={0.5} pointerEvents="none" />
          <rect width={W} height={H} fill="none" stroke={INK} strokeWidth={10} />
        </svg>
      </div>

      <figcaption className="stage__caption">
        <p className="stage__line" aria-live="polite">
          {beat.caption}
        </p>
        <div className="stage__controls">
          <button type="button" className="rod-btn" onClick={() => go(index - 1)} aria-label="Previous scene">
            ‹
          </button>
          <button
            type="button"
            className="rod-btn rod-btn--wide"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button type="button" className="rod-btn" onClick={() => go(index + 1)} aria-label="Next scene">
            ›
          </button>
          <ol className="stage__dots">
            {beats.map((b, i) => (
              <li key={b.caption}>
                <button
                  type="button"
                  aria-label={`Scene ${i + 1} of ${beats.length}`}
                  aria-current={i === index ? 'step' : undefined}
                  onClick={() => go(i)}
                />
              </li>
            ))}
          </ol>
          <span className="stage__hint">Move your finger or mouse over the screen: you are holding the lamp.</span>
        </div>
      </figcaption>
    </figure>
  );
}
