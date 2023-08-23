import React from 'react';

const DocumentPreview = ({ previewUrl }) => {
  return (
    <div className="document-preview">
      <img src={previewUrl} alt="Document Preview" />
    </div>
  );
};

export default DocumentPreview;
