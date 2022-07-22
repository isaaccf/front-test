import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Index from './index';

test('renders app title', () => {
  render(<Index />);
  const linkElement = screen.getByText(/Harry Potter Characters/i);
  expect(linkElement).toBeInTheDocument();
});
