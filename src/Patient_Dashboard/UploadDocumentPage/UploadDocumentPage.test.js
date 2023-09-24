import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotesSection from './NotesSection';

test('renders NotesSection component', () => {
  const handleCancel = jest.fn();
  const handleSaveAndUpload = jest.fn();

  const { container } = render(
    <NotesSection
      handleCancel={handleCancel}
      handleSaveAndUpload={handleSaveAndUpload}
    />
  );

  // Test clicking on the cancel button
  fireEvent.click(container.querySelector('.cancel-button'));
  expect(handleCancel).toHaveBeenCalled();

  // Test clicking on the save and upload button
  fireEvent.click(container.querySelector('.save-upload-button'));
  expect(handleSaveAndUpload).toHaveBeenCalled();
});
