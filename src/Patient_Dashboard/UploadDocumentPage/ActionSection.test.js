import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ActionSection from './ActionSection';

test('renders ActionSection component', () => {
  const handleDocumentUploadIcon = jest.fn();
  const handleCapture = jest.fn();
  const handleDocumentFileChange = jest.fn();

  const { container } = render(
    <ActionSection
      handleDocumentUploadIcon={handleDocumentUploadIcon}
      handleCapture={handleCapture}
      handleDocumentFileChange={handleDocumentFileChange}
    />
  );

  fireEvent.click(container.querySelector('.upload-icon'));
  expect(handleDocumentUploadIcon).toHaveBeenCalled();

  fireEvent.click(container.querySelector('.capture-icon'));
  expect(handleCapture).toHaveBeenCalled();
});
