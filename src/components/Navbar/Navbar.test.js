import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './Navbar';

test('renders Navbar component', () => {
  const { getByText } = render(<Navbar />);
  const headingElement = getByText(/Patient Documents/i);
  expect(headingElement).toBeInTheDocument();
});
