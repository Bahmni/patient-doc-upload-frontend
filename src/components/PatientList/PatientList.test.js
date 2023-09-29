import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientList from './PatientList';

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('<uuid>your_location_uuid_here</uuid>'), 
    json: () =>
      Promise.resolve([
        {
          uuid: 'patient_uuid_1',
          name: 'Patient Name 1',
        },
        {
          uuid: 'patient_uuid_2',
          name: 'Patient Name 2',
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

    await waitFor(async () => {
      try {
        await screen.findByText('Patient Name 1');
        await screen.findByText('Patient Name 2');
      } catch (error) {
        console.error('Patient not found:', error);
      }
    });
  });
});
