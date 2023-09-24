import React from "react";
import DocumentPreview from "../DocumentPreview/DocumentPreview"; 
const DocumentPreviewSection = ({ documentPreviews }) => {
  return (
    <div className="left-content">
      <div className="doc-preview">
        {documentPreviews.map((previewUrl, index) => (
          <DocumentPreview
            key={index}
            previewUrl={previewUrl}
            width={150}
            height={150}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentPreviewSection;
