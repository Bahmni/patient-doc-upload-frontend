import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FileTypeSection from './FileTypeSection';

test('renders FileTypeSection component', () => {
  const setSelectedFileType = jest.fn();

  const { container } = render(
    <FileTypeSection selectedFileType={null} setSelectedFileType={setSelectedFileType} />
  );

  fireEvent.click(container.querySelector('input[type="radio"]'));
  expect(setSelectedFileType).toHaveBeenCalled();
});
