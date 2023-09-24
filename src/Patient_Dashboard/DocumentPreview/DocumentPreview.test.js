// DocumentPreview.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import DocumentPreview from './DocumentPreview';

test('renders DocumentPreview component', () => {
  const previewUrl = 'test.jpg';
  const width = 100;
  const height = 100;
  
  render(<DocumentPreview previewUrl={previewUrl} width={width} height={height} />);

  // Use screen to query the rendered elements
  const imageElement = screen.getByAltText('Preview');

  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', 'test.jpg');
  expect(imageElement).toHaveAttribute('width', '100');
  expect(imageElement).toHaveAttribute('height', '100');
});
