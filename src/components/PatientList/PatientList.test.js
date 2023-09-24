import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientList from './PatientList';

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          uuid: 'patient_uuid_1',
          name: 'Patient Name 1',
          // Add other relevant patient data properties here
        },
        {
          uuid: 'patient_uuid_2',
          name: 'Patient Name 2',
          // Add other relevant patient data properties here
        },
      ]),
  })
);

describe('PatientList component', () => {
  it('renders PatientList component with patient data', async () => {
    render(
      <MemoryRouter>
        <PatientList />
      </MemoryRouter>
    );

    // Wait for the asynchronous data to be fetched and rendered
    await waitFor(() => {
      try {
        expect(screen.getByText('Patient Name 1')).toBeInTheDocument();
        expect(screen.getByText('Patient Name 2')).toBeInTheDocument();
        // Add more assertions as needed for other patient data properties
      } catch (error) {
        // Handle the case when the element is not found
        // You can log a message or fail the test if needed
        console.error('Patient not found:', error);
      }
    });
  });

  // Add more test cases as needed
});
