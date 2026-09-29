import { render, screen } from '@testing-library/react';
import App from './App';

test('affiche le nom sur la page d’accueil', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /Nicolas GOUJON/i })).toBeInTheDocument();
});
