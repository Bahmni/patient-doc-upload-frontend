import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VisitItem from './VisitItem';

jest.mock('../PatientDashboard/PatientDashboard', () => ({
  formatDate: jest.fn((date) => date), 
}));

describe('VisitItem Component', () => {
  it('renders the VisitItem component with visit details', () => {
    const visit = {
      display: '2023-09-28T10:00:00',
      uuid: '12345', 
    };

    const selectedDocumentPreviews = {}; 
    const handleDocumentUpload = jest.fn();
    const handleCapture = jest.fn();

    const { getByText, getByTestId } = render(
      <VisitItem
        visit={visit}
        selectedDocumentPreviews={selectedDocumentPreviews}
        handleDocumentUpload={handleDocumentUpload}
        handleCapture={handleCapture}
      />
    );

    const visitDescription = getByText('Visit');
    expect(visitDescription).toBeInTheDocument();

    const visitDate = getByText(/From : .+ To : .+/);
    expect(visitDate).toBeInTheDocument();

    const documentIcon = getByTestId('document-icon-12345'); 
    const captureIcon = getByTestId('capture-icon'); 
    expect(documentIcon).toBeInTheDocument();
    expect(captureIcon).toBeInTheDocument();
  });

  it('calls handleCapture when the Capture icon is clicked', () => {
    const visit = {
      display: '2023-09-28T10:00:00',
      uuid: '12345', 
    };

    const selectedDocumentPreviews = {}; 
    const handleDocumentUpload = jest.fn();
    const handleCapture = jest.fn();

    const { getByTestId } = render(
      <VisitItem
        visit={visit}
        selectedDocumentPreviews={selectedDocumentPreviews}
        handleDocumentUpload={handleDocumentUpload}
        handleCapture={handleCapture}
      />
    );

    const captureIcon = getByTestId('capture-icon'); 
    fireEvent.click(captureIcon);

    expect(handleCapture).toHaveBeenCalledTimes(1);
  });
});
