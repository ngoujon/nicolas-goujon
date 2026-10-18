import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { applySeo } from './utils/seo';

// Rend l'application sur une route donnée (BrowserRouter lit window.location).
const renderAt = (path: string) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

// Avant chaque test : CRA réinitialise les mocks entre les tests (resetMocks).
beforeEach(() => {
  // jsdom n'implémente ni scrollIntoView ni matchMedia.
  Element.prototype.scrollIntoView = jest.fn();
  window.matchMedia = jest.fn().mockReturnValue({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() });
});

afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

test('affiche le nom sur la page d’accueil', () => {
  renderAt('/');
  expect(screen.getByRole('heading', { level: 1, name: /Nicolas GOUJON/i })).toBeInTheDocument();
});

test('affiche toutes les sections de la page d’accueil', () => {
  renderAt('/');
  for (const title of ['EXPÉRIENCE', 'STACK', 'FORMATION', 'BIO', 'CONTACT']) {
    expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument();
  }
});

test('une route de section affiche l’accueil et défile vers la section', () => {
  renderAt('/projets');
  expect(screen.getByRole('heading', { level: 1, name: /Nicolas GOUJON/i })).toBeInTheDocument();
  expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
});

test('affiche les pages légales', () => {
  const { unmount } = renderAt('/mentions-legales');
  expect(screen.getByRole('heading', { level: 1, name: 'Mentions Légales' })).toBeInTheDocument();
  unmount();
  renderAt('/politique-confidentialite');
  expect(screen.getByRole('heading', { level: 2, name: "8. Mesure d'audience" })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'ne plus être mesuré' })).toBeInTheDocument();
});

test('affiche une page 404 pour une URL inconnue', () => {
  renderAt('/page-inexistante');
  expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
});

test('le formulaire de contact envoie les données et confirme l’envoi', async () => {
  const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ success: true }) });
  global.fetch = fetchMock as unknown as typeof fetch;
  const user = userEvent.setup();
  renderAt('/');

  await user.click(screen.getByRole('button', { name: 'Créer un site vitrine' }));
  await user.type(screen.getByLabelText(/Votre nom/), 'Jean Test');
  await user.type(screen.getByLabelText(/Votre email/), 'jean@example.com');
  await user.type(screen.getByLabelText(/Votre message/), 'Bonjour');
  await user.click(screen.getByRole('button', { name: 'Envoyer le message' }));

  expect(await screen.findByText(/Votre message a bien été envoyé/)).toBeInTheDocument();
  const [url, options] = fetchMock.mock.calls[0];
  expect(url).toMatch(/\/api\/contact$/); // URL relative, ou absolue si REACT_APP_CONTACT_API_URL est défini
  expect(JSON.parse(options.body)).toMatchObject({
    name: 'Jean Test',
    email: 'jean@example.com',
    message: 'Bonjour',
    subjects: ['Créer un site vitrine'],
    website: '',
  });
  // Le formulaire est réinitialisé après succès.
  await waitFor(() => expect(screen.getByLabelText(/Votre nom/)).toHaveValue(''));
});

test('le formulaire de contact signale une erreur serveur', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500, json: () => Promise.resolve({}) }) as unknown as typeof fetch;
  jest.spyOn(console, 'error').mockImplementation(() => {});
  const user = userEvent.setup();
  renderAt('/');

  await user.type(screen.getByLabelText(/Votre nom/), 'Jean');
  await user.type(screen.getByLabelText(/Votre email/), 'jean@example.com');
  await user.type(screen.getByLabelText(/Votre message/), 'Bonjour');
  await user.click(screen.getByRole('button', { name: 'Envoyer le message' }));

  expect(await screen.findByRole('alert')).toHaveTextContent(/Une erreur s'est produite/);
});

test('les routes de section se canonicalisent vers l’accueil', () => {
  document.head.innerHTML = '<link rel="canonical" href="" /><meta name="robots" content="" />';
  applySeo('/stack');
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://nicolas-goujon.com/');
  applySeo('/mentions-legales');
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://nicolas-goujon.com/mentions-legales');
  applySeo('/inconnue');
  expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
});
