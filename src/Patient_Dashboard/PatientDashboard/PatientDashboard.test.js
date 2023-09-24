import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing-related testing
import PatientDashboard from './PatientDashboard';

// Mock the fetch function to simulate API requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [] }), // Modify this mock response as needed
    ok: true,
  })
);

test('renders PatientDashboard component', async () => {
  render(
    <BrowserRouter>
      <PatientDashboard />
    </BrowserRouter>
  );

  // You can add your test assertions here to check for expected content.
  // For example, if you want to test if a specific text is present:
  await waitFor(() => {
    expect(screen.getByText('Search')).toBeInTheDocument();
    // Modify this assertion to match the actual content you expect to find.
  });
});

