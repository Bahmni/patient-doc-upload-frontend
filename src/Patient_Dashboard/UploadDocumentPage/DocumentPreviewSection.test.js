import React from 'react';
import { render } from '@testing-library/react';
import DocumentPreviewSection from './DocumentPreviewSection';

test('renders DocumentPreviewSection component', () => {
  const documentPreviews = [
    'previewUrl1',
    'previewUrl2',
    'previewUrl3',
  ]; // Replace with your mock data

  const { container } = render(
    <DocumentPreviewSection documentPreviews={documentPreviews} />
  );

  // Test if all document previews are rendered
  expect(container.querySelectorAll('.document-preview')).toHaveLength(
    documentPreviews.length
  );
});
