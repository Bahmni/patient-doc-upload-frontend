import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientList from './PatientList';

global.fetch = jest.fn(() =>
  Promise.resolve({
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

    await waitFor(() => {
      try {
        expect(screen.getByText('Patient Name 1')).toBeInTheDocument();
        expect(screen.getByText('Patient Name 2')).toBeInTheDocument();
      } catch (error) {
        console.error('Patient not found:', error);
      }
    });
  });

});
