import { renderToString } from 'react-dom/server';
import App from './App';
import { LegalPage } from './components/LegalPage';
import { PRIVACY, TERMS } from './legal';

export type PageName = 'home' | 'privacy' | 'terms';

/** Static HTML for a page, so it reads without JavaScript (search engines, app reviewers, slow phones). */
export function renderPage(page: PageName) {
  if (page === 'home') return renderToString(<App />);
  return renderToString(<LegalPage doc={page === 'terms' ? TERMS : PRIVACY} />);
}
