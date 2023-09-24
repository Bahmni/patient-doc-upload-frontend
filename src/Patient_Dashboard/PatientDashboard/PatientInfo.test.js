// PatientInfo.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PatientInfo from './PatientInfo';

test('renders PatientInfo component with patient data', () => {
  const patientData = {
    name: 'John Doe',
    identifier: '123456',
    photoUrl: 'test.jpg',
  };

  render(<PatientInfo patientData={patientData} />);

  // Use screen to query the rendered elements
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('ID: 123456')).toBeInTheDocument();
  expect(screen.getByAltText('Patient')).toBeInTheDocument();
});

// Add more tests as needed
