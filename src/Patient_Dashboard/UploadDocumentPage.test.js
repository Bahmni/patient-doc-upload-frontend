import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Import your UploadDocumentPage component
import UploadDocumentPage from '../Patient_Dashboard/UploadDocumentPage'; // Replace with your component's actual path

// Define your test data
const testData = {
  location: {
    state: {
      visit: {
        uuid: 'your-visit-uuid', // Replace with a valid UUID
        // Add other properties expected by your component here
      },
    },
  },
};

test('renders UploadDocumentPage component', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/upload']} initialIndex={0}>
      <UploadDocumentPage location={testData.location} />
    </MemoryRouter>
  );

  // Your test assertions here
  // For example, you can use queries like getByText or getByTestId to assert specific content on the page.
});
