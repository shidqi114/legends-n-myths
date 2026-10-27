import { Fragment } from 'react';
import { CHANNEL } from '../content';
import { EFFECTIVE_DATE, type Block, type LegalDoc } from '../legal';
import { PuppetTile } from './PuppetTile';
import { SiteFooter, SiteHeader } from './SiteChrome';

const HOME = '../';

/** Renders text with [label](url) links; external links open in a new tab. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return <Fragment key={i}>{part}</Fragment>;
        const external = /^https?:/.test(m[2]);
        return (
          <a key={i} href={m[2]} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {m[1]}
          </a>
        );
      })}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  if (typeof block === 'string')
    return (
      <p>
        <Rich text={block} />
      </p>
    );
  return (
    <ul>
      {block.list.map((item) => (
        <li key={item}>
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const other = doc.kind === 'privacy' ? { href: `${HOME}terms/`, label: 'Terms of Service' } : { href: `${HOME}privacy/`, label: 'Privacy Policy' };
  return (
    <>
      <a className="skip" href="#doc">
        Skip to the text
      </a>
      <SiteHeader home={HOME} />

      <main id="doc" className="legal">
        <header className="legal__head">
          <div>
            <h1>{doc.title}</h1>
            <p className="legal__date">Effective {EFFECTIVE_DATE}</p>
            <p className="legal__intro">{doc.intro}</p>
          </div>
          <PuppetTile
            className="legal__tile"
            who={doc.kind === 'privacy' ? 'gunungan' : 'explorer'}
            box={doc.kind === 'privacy' ? [-190, -450, 380, 470] : [-110, -300, 240, 320]}
            label=""
          />
        </header>

        <section className="legal__summary" aria-labelledby="summary-title">
          <h2 id="summary-title">In short</h2>
          <ul>
            {doc.summary.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <div className="legal__body">
          <nav className="legal__toc" aria-label="On this page">
            <p className="legal__toc-title">On this page</p>
            <ol>
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.heading}</a>
                </li>
              ))}
              <li>
                <a href="#contact">Contact us</a>
              </li>
            </ol>
          </nav>

          <article className="legal__text">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>
                  <span className="legal__num" aria-hidden="true">
                    {i + 1}.
                  </span>{' '}
                  {s.heading}
                </h2>
                {s.body.map((b, k) => (
                  <BlockView key={k} block={b} />
                ))}
              </section>
            ))}
            <section id="contact" aria-labelledby="contact-h">
              <h2 id="contact-h">
                <span className="legal__num" aria-hidden="true">
                  {doc.sections.length + 1}.
                </span>{' '}
                Contact us
              </h2>
              <p>Questions about this {doc.kind === 'privacy' ? 'policy' : 'page'}, or a request about your information, can reach us here:</p>
              <ul>
                {CHANNEL.email && (
                  <li>
                    Email: <a href={`mailto:${CHANNEL.email}`}>{CHANNEL.email}</a>
                  </li>
                )}
                <li>
                  YouTube:{' '}
                  <a href={CHANNEL.youtube} target="_blank" rel="noopener noreferrer">
                    {CHANNEL.youtube.replace('https://www.', '')}
                  </a>
                </li>
                <li>
                  TikTok:{' '}
                  <a href={CHANNEL.tiktok} target="_blank" rel="noopener noreferrer">
                    {CHANNEL.tiktok.replace('https://www.', '')}
                  </a>
                </li>
              </ul>
              <p className="legal__also">
                See also our <a href={other.href}>{other.label}</a>.
              </p>
            </section>
          </article>
        </div>
      </main>

      <SiteFooter home={HOME} />
    </>
  );
}
