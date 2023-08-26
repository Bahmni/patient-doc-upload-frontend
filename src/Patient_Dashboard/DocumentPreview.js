import React from 'react';

const DocumentPreview = ({ previewUrl, width, height }) => {
  return (
    <div className="document-preview">
      <img src={previewUrl} alt="Preview" width={width} height={height} />
    </div>
  );
};

export default DocumentPreview;
