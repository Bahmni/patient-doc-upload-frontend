// Patient.test.js
import Patient from './Patient';

test('getName should return patient name', () => {
  const patientData = { name: 'John Doe' };
  const patient = new Patient(patientData);

  expect(patient.getName()).toBe('John Doe');
});

// Add similar tests for other methods like getIdentifier and getPhotoUrl
