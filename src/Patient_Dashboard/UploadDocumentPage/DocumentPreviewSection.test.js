import React from 'react';
import { render } from '@testing-library/react';
import DocumentPreviewSection from './DocumentPreviewSection';

test('renders DocumentPreviewSection component', () => {
  const documentPreviews = [
    'previewUrl1',
    'previewUrl2',
    'previewUrl3',
  ]; 

  const { container } = render(
    <DocumentPreviewSection documentPreviews={documentPreviews} />
  );

  expect(container.querySelectorAll('.document-preview')).toHaveLength(
    documentPreviews.length
  );
});
