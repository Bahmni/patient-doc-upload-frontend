import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import PatientList from './PatientList';

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () =>
      Promise.resolve(`
        <object>
          <results>
            <location>
              <uuid>location-uuid</uuid>
            </location>
          </results>
        </object>
      `),
    json: () =>
      Promise.resolve([
        {
          uuid: 'patient-uuid',
          name: 'Patient Name',
          identifier: 'Patient ID',
          photo: 'path-to-photo.jpg',
        },
      ]),
  })
);

describe('PatientList component', () => {
  it('renders PatientList component', async () => {
    render(
      <MemoryRouter>
        <PatientList />
      </MemoryRouter>
    );

    await act(async () => {
      await screen.findByText(/Patient Name/);
    });


  });
});
