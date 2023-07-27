import React from 'react';
import { render, screen } from '@testing-library/react';
import PatientList from '../components/PatientList';

test('renders PatientList component', () => {
  render(<PatientList />);
  const patientNameElement = screen.getByText('Patients (0)');
  expect(patientNameElement).toBeInTheDocument();
});
