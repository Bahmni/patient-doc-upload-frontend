// FileTypeSection.js
import React from "react";
import { RadioButtonGroup, RadioButton } from "carbon-components-react";

const FileTypeSection = ({ selectedFileType, setSelectedFileType }) => {
  return (
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
          <RadioButton
            value="Patient File"
            labelText="Patient File"
            className="radio-button"
          />
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
  );
};

export default FileTypeSection;
