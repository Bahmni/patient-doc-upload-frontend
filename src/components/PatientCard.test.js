import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientCard from './PatientCard';

test('renders user icon when name is not provided', () => {
  const mockPatient = {
    uuid: 'patient-uuid',
    name: 'Patient Name',
    identifier: 'Patient ID',
  };

  const { getByTestId } = render(
    <MemoryRouter>
      <PatientCard patient={mockPatient} />
    </MemoryRouter>
  );

});
