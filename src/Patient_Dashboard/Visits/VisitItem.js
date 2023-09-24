import React from "react";
import { formatDate } from "../PatientDashboard/PatientDashboard"; // Updated import path
import { Document24, Camera24 } from "@carbon/icons-react";


const VisitItem = ({
  visit,
  selectedDocumentPreviews,
  handleDocumentUpload,
  handleCapture,
}) => {
  return (
    <div className="visit-item">
      <div className="visit">
        <span className="visit-description">Visit</span>
        <span className="visit-date">
          From : {formatDate(visit.display)} To : {formatDate(visit.display)}
        </span>
        <div className="visit-icons">
          <span className="icon-wrapper">
            <Document24
              className="visit-icon"
              onClick={() => {
                const fileInput = document.getElementById(
                  `fileInput-${visit.uuid}`
                );
                if (fileInput) {
                  fileInput.click();
                }
              }}
            />
            <input
              id={`fileInput-${visit.uuid}`}
              type="file"
              style={{ display: "none" }}
              onChange={(event) => handleDocumentUpload(event, visit.uuid)}
              accept="application/pdf,image/*"
            />
          </span>
          <span className="icon-wrapper">
            <Camera24 className="capture-icon" onClick={handleCapture} />
          </span>
        </div>
      </div>
      <div className="document-previews">
        {selectedDocumentPreviews[visit.uuid] && (
          <div className="document-preview-container">
            {selectedDocumentPreviews[visit.uuid].map(
              (previewUrl, index) => (
                <div
                  key={`document-preview-${visit.uuid}-${index}`}
                  className="document-preview"
                >
                  <img
                    src={previewUrl}
                    alt={`Document Preview ${index + 1} for Visit ${visit.uuid}`}
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitItem;
