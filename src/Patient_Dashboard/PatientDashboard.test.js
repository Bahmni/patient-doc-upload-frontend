import React from 'react';
import { render } from '@testing-library/react';
import PatientDashboard from './PatientDashboard';

test('renders patient data when provided', () => {
  const mockPatientData = {
    name: 'Patient Name',
    identifier: 'Patient ID',
    uuid: 'patient-uuid',
  };

  const { getByText } = render(<PatientDashboard patientData={mockPatientData} />);

});
