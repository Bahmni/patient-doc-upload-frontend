import React from 'react';
import { render, screen } from '@testing-library/react';
import TabsComponent from '../components/TabsComponent';

test('renders TabsComponent component', () => {
  render(<TabsComponent />);
  const leftScrollButton = screen.getByLabelText('Scroll left');
  expect(leftScrollButton).toBeInTheDocument();
});
