import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import PatientCard from './PatientCard';

const mockPatient = {
  name: 'John Doe',
  identifier: '123456',
};

test('renders PatientCard component with patient data', () => {
  const { getByText } = render(
    <Router>
      <PatientCard patient={mockPatient} />
    </Router>
  );
  const nameElement = getByText(/John Doe/i);
  const identifierElement = getByText(/123456/i);
  expect(nameElement).toBeInTheDocument();
  expect(identifierElement).toBeInTheDocument();
});
