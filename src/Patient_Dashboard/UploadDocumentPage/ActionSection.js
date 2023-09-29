import React from "react";
import { Document24, Camera24 } from "@carbon/icons-react";

const ActionSection = ({
  handleDocumentUploadIcon,
  handleCapture,
  handleDocumentFileChange,
}) => {
  return (
    <div className="right-content">
      <div className="icons-section">
        <div className="icon-wrapper" onClick={handleDocumentUploadIcon}>
          <Document24 className="upload-icon" />
          <input
            id={`fileInput`}
            type="file"
            style={{ display: "none" }}
            onChange={handleDocumentFileChange}
            accept="application/pdf,image/*"
          />
        </div>
        <div className="icon-wrapper" onClick={handleCapture}>
          <Camera24 className="capture-icon" />
        </div>
      </div>
    </div>
  );
};

export default ActionSection;
