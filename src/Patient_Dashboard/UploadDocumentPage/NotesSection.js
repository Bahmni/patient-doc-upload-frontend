// NotesSection.js
import React from "react";
import { Button, TextArea } from "carbon-components-react";

const NotesSection = ({ handleCancel, handleSaveAndUpload }) => {
  return (
    <div className="radio-textarea-container">
      <div className="container">
        <div className="text-area-section">
          <TextArea labelText="Notes" placeholder="Notes..." />
        </div>
        <div className="button-container">
          <Button
            className="cancel-button"
            kind="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button className="save-upload-button" onClick={handleSaveAndUpload}>
            Save and Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
