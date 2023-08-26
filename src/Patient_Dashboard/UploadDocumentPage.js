import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DashboardLayout from '../Patient_Dashboard/DashboardLayout';
import { format, isValid } from 'date-fns';
import { Document24, Camera24 } from '@carbon/icons-react';
import { RadioButtonGroup, RadioButton, TextArea, Button } from 'carbon-components-react';
import DocumentPreview from '../Patient_Dashboard/DocumentPreview';

import '../Patient_Dashboard/UploadDocumentPage.scss';

const UploadDocumentPage = () => {
  const { visitId } = useParams();
  const location = useLocation();
  const { patientData, visit, selectedDocumentPreview } = location.state;
  const uploadedVisitId = visit.uuid;

  const formatVisitDate = (datetime) => {
    if (isValid(new Date(datetime))) {
      return format(new Date(datetime), 'MMM dd, yyyy hh:mm a');
    } else {
      return 'Invalid Date';
    }
  };

  const handleCapture = () => {
    console.log('Capture clicked');
  };

  const [selectedFileType, setSelectedFileType] = useState('');

  return (
    <DashboardLayout>
      <div className="upload-doc-container">
        <div className="title-container">
          <h3 className="upload-heading">Upload Document</h3>
          <div className="visit-info">Visit: {formatVisitDate(visit.startDatetime)}</div>
        </div>
        <div className="patient-name">{patientData.name}</div>
        <hr className="divider" />

        <div className="content-container">
          <div className="left-content">
            <div className="doc-preview">
              {selectedDocumentPreview && (
                <DocumentPreview previewUrl={selectedDocumentPreview} width={150} height={150} />
              )}
            </div>
            <div className="file-type-section">
              <p className="file-type-heading">
                File type <span className="important">*</span>
              </p>
              <div className="radio-buttons-section">
                <RadioButtonGroup
                  name="fileType"
                  orientation="vertical"
                  valueSelected={selectedFileType}
                  onChange={(value) => setSelectedFileType(value)}
                >
                  <RadioButton
                    value="Prescription"
                    labelText="Prescription"
                    className="radio-button"
                  />
                  <RadioButton
                    value="Referral Documents"
                    labelText="Referral Documents"
                    className="radio-button"
                  />
                  <RadioButton value="Patient File" labelText="Patient File" className="radio-button" />
                  <RadioButton
                    value="Radiology report"
                    labelText="Radiology report"
                    className="radio-button"
                  />
                  <RadioButton
                    value="Discharge Summary"
                    labelText="Discharge Summary"
                    className="radio-button"
                  />
                </RadioButtonGroup>
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="icons-section">
              <div className="icon-wrapper">
                <Document24 className="upload-icon" />
              </div>
              <div className="icon-wrapper">
                <Camera24 className="capture-icon" onClick={handleCapture} />
              </div>
            </div>
            <div className="text-area-section">
              <TextArea labelText="Notes" placeholder="Notes..." />
            </div>
            <div className="button-container">
              <Button className="cancel-button" kind="secondary">
                Cancel
              </Button>
              <Button className="save-upload-button">Save and Upload</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadDocumentPage;
