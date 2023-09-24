// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import TabsComponent from '../components/TabsComponent';

// test('renders TabsComponent component', () => {
//   render(<TabsComponent />);
//   const leftScrollButton = screen.getByLabelText('Scroll left');
//   expect(leftScrollButton).toBeInTheDocument();
// });


import React from 'react';
import { render } from '@testing-library/react';
import TabsComponent from './TabsComponent';

test('renders TabsComponent component', () => {
  const { getByText } = render(<TabsComponent />);
  const activePatientsTab = getByText(/Active Patients/i);
  const allPatientsTab = getByText(/All Patients/i);
  expect(activePatientsTab).toBeInTheDocument();
  expect(allPatientsTab).toBeInTheDocument();
});
