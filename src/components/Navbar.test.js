// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Navbar from '../components/Navbar';

// test('renders Navbar component', () => {
//   render(<Navbar />);

//   const linkElement = screen.getByText('Patient Documents');
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Navbar from '../components/Navbar';

test('renders Navbar component', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const headingElement = getByText(/Patient Documents/i);
  expect(headingElement).toBeInTheDocument();
});
