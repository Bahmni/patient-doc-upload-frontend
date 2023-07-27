import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchButton from '../components/SearchButton';

test('renders SearchButton component', () => {
  render(<SearchButton />);
  const searchButton = screen.getByRole('button', { name: 'Clear search input' });
  expect(searchButton).toBeInTheDocument();
});
