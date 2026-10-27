import { CHANNEL, EPISODES, PARENT_NOTES, SANGKURIANG, STEPS, type Episode } from './content';
import { PuppetTile } from './components/PuppetTile';
import { ShadowStage } from './components/ShadowStage';
import { SiteFooter, SiteHeader } from './components/SiteChrome';
import type { PuppetName } from './components/puppets';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

// Frame around each programme puppet, in the puppet's own units.
const TILE_BOX: Partial<Record<PuppetName, [number, number, number, number]>> = {
  boat: [-200, -330, 400, 400],
  malin: [-130, -235, 260, 260],
  temple: [-175, -330, 350, 350],
  cucumber: [-135, -250, 260, 260],
};

function ChannelLink({ href, label, ghost }: { href: string; label: string; ghost?: boolean }) {
  return (
    <a className={ghost ? 'btn btn--ghost' : 'btn'} href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}

function ProgrammeRow({ ep, n }: { ep: Episode; n: number }) {
  return (
    <li className="bill__row">
      <span className="bill__num" aria-hidden="true">
        {ROMAN[n]}
      </span>
      <div className="bill__text">
        <h3 className="bill__title">
          {ep.title}
          <span className="bill__sub">{ep.subtitle}</span>
        </h3>
        <p className="bill__hook">{ep.hook}</p>
        <p className="bill__meta">
          <span>{ep.place}</span>
          {ep.length && <span>{ep.length}</span>}
          <span className={`stamp stamp--${ep.status === 'Out now' ? 'live' : 'soon'}`}>{ep.status}</span>
        </p>
        {ep.watch && (
          <a className="bill__watch" href={ep.watch} target="_blank" rel="noopener noreferrer">
            Watch {ep.title} on YouTube
          </a>
        )}
      </div>
      <PuppetTile
        className="bill__tile"
        who={ep.puppet}
        box={TILE_BOX[ep.puppet] ?? [-160, -300, 320, 320]}
        tint={ep.gel}
        label={`${ep.title} shadow puppet`}
      />
    </li>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#programme">
        Skip to the programme
      </a>

      <SiteHeader />

      <main id="top">
        <section className="theatre" aria-labelledby="hero-title">
          <div className="theatre__intro">
            <h1 id="hero-title">
              Legends told
              <br />
              by lamplight.
            </h1>
            <div className="theatre__aside">
              <p className="theatre__lede">
                Two-minute shadow-puppet stories from Indonesia and across Asia, for curious kids and the grown-ups
                sitting next to them.
              </p>
              <div className="theatre__links">
                <ChannelLink href={CHANNEL.youtubeShorts} label="Watch on YouTube" />
                <ChannelLink href={CHANNEL.tiktok} label="TikTok" ghost />
              </div>
            </div>
          </div>
          <ShadowStage beats={SANGKURIANG} title="Sangkuriang, the legend of the upturned boat" />
        </section>

        <section id="programme" className="section bill" aria-labelledby="programme-title">
          <div className="section__head">
            <h2 id="programme-title">Tonight&rsquo;s programme</h2>
            <p>
              Every legend starts from a place you can still visit. Each one ends with a question: which legend next?
            </p>
          </div>
          <ol className="bill__list">
            {EPISODES.map((ep, i) => (
              <ProgrammeRow key={ep.title} ep={ep} n={i} />
            ))}
          </ol>
        </section>

        <section id="workshop" className="section workshop" aria-labelledby="workshop-title">
          <div className="section__head">
            <h2 id="workshop-title">From an old story to a lit screen</h2>
            <p>Four acts, the same for every legend.</p>
          </div>
          <ol className="acts">
            {STEPS.map((s, i) => (
              <li key={s.title} className="act">
                <span className="act__num" aria-hidden="true">
                  {ROMAN[i]}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section explorer" aria-labelledby="explorer-title">
          <PuppetTile
            className="explorer__tile"
            who="explorer"
            box={[-110, -300, 240, 320]}
            tint="rgb(76,172,160)"
            label="The time-travelling explorer, shadow puppet with a pith helmet and spyglass"
          />
          <div className="explorer__text">
            <h2 id="explorer-title">Meet the explorer</h2>
            <p>
              Before every legend, our time-travelling explorer stands where it happened today: on the rim of a
              volcano, on a beach in Padang, under the towers of Prambanan. Then the lamp flickers, the years fall
              away, and the story begins.
            </p>
            <p>Look for the pith helmet and the spyglass. The explorer always asks the last question.</p>
          </div>
        </section>

        <section id="grown-ups" className="section parents" aria-labelledby="parents-title">
          <div className="section__head">
            <h2 id="parents-title">For grown-ups</h2>
            <p>What you can expect before you press play.</p>
          </div>
          <dl className="notes">
            {PARENT_NOTES.map((n) => (
              <div key={n.term} className="note">
                <dt>{n.term}</dt>
                <dd>{n.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="finale" aria-labelledby="finale-title">
          <PuppetTile className="finale__tile" who="gunungan" box={[-190, -450, 380, 470]} label="The gunungan, the tree-of-life puppet that closes every show" />
          <div className="finale__text">
            <h2 id="finale-title">Which legend should the lamp light next?</h2>
            <p>New shadow plays arrive on YouTube Shorts and TikTok. Ask a grown-up to follow us.</p>
            <div className="finale__links">
              <ChannelLink href={CHANNEL.youtube} label="Follow on YouTube" />
              <ChannelLink href={CHANNEL.tiktok} label={`TikTok ${CHANNEL.tiktokHandle}`} ghost />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
