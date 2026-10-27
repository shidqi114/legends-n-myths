import { CHANNEL } from '../content';

/** Path from the current page back to the landing page ('' on the landing page, '../' on /privacy/ and /terms/). */
export interface ChromeProps {
  home?: string;
}

export function SiteHeader({ home = '' }: ChromeProps) {
  return (
    <header className="top">
      <a className="wordmark" href={home || '#top'} aria-label={`${CHANNEL.name}, home`}>
        Legends <em>n</em> Myths
      </a>
      <nav aria-label="Sections">
        <a href={`${home}#programme`}>Programme</a>
        <a href={`${home}#workshop`}>Workshop</a>
        <a href={`${home}#grown-ups`}>For grown-ups</a>
      </nav>
      <a className="top__watch" href={CHANNEL.youtube} target="_blank" rel="noopener noreferrer">
        Watch
      </a>
    </header>
  );
}

export function SiteFooter({ home = '' }: ChromeProps) {
  return (
    <footer className="foot">
      <div className="foot__inner">
        <p className="foot__about">
          {CHANNEL.name}. Shadow-puppet legends for kids, made in the spirit of wayang kulit, the shadow theatre of
          Java.
        </p>
        <nav className="foot__links" aria-label="Channel and policies">
          <a href={CHANNEL.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={CHANNEL.tiktok} target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
          <a href={`${home}privacy/`}>Privacy Policy</a>
          <a href={`${home}terms/`}>Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
}
