import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import PatientDashboard from './PatientDashboard';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [] }),
    ok: true,
  })
);

test('renders PatientDashboard component', async () => {
  render(
    <BrowserRouter>
      <PatientDashboard />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});

