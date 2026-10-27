import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { LegalPage } from './components/LegalPage';
import { PRIVACY, TERMS } from './legal';
import './styles.css';

// privacy/index.html and terms/index.html share this entry; the root element says which document to show.
const root = document.getElementById('root')!;
const doc = root.dataset.doc === 'terms' ? TERMS : PRIVACY;

const page = (
  <StrictMode>
    <LegalPage doc={doc} />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, page);
else createRoot(root).render(page);
