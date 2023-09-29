import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { isValid } from "date-fns";
import { saveFile } from "./utils";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import TitleContainer from "./TitleContainer";
import PatientName from "./PatientName";
import DocumentPreviewSection from "./DocumentPreviewSection";
import ActionSection from "./ActionSection";
import FileTypeSection from "./FileTypeSection";
import NotesSection from "./NotesSection";
import "../../Patient_Dashboard/UploadDocumentPage/UploadDocumentPage.scss";

const bahmniBaseUrl = "/openmrs";

const UploadDocumentPage = () => {
  const { visitId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { patientData, visit, selectedDocumentPreview, visitDate } =
    location.state || {};
  const uploadedVisitId = visit ? visit.uuid : null;

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentPreviews, setDocumentPreviews] = useState([]);
  const [selectedFileType, setSelectedFileType] = useState(null);

  const handleDocumentUploadIcon = () => {
    const fileInput = document.getElementById(`fileInput`);
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDocumentFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedDocument(file);
      const previewUrl = URL.createObjectURL(file);
      setDocumentPreviews((prevPreviews) => [...prevPreviews, previewUrl]);
    }
  };

  const handleCapture = () => {
    console.log("Capture clicked");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf,image/*";
    fileInput.capture = "environment";
    fileInput.onchange = (event) => handleDocumentFileChange(event);
    fileInput.click();
  };

  const handleCancel = () => {
    navigate(`/patient_dashboard/${patientData.uuid}`, {
      state: {
        patientData,
      },
    });
  };

  const handleSaveAndUpload = async () => {
    if (!selectedDocument) {
      alert("Please select a document to upload.");
      return;
    }

    try {
      const response = await saveFile(
        selectedDocument,
        patientData.uuid,
        selectedFileType,
        selectedDocument.name
      );

      console.log("Document uploaded successfully");
      console.log("File URL:", response);
      alert("Document(s) saved and uploaded successfully");
      navigate(`/patient_dashboard/${patientData.uuid}`, {
        state: {
          patientData,
        },
      });
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  useEffect(() => {
    if (selectedDocumentPreview) {
      setDocumentPreviews([selectedDocumentPreview]);
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="upload-doc-container">
        <TitleContainer visitDate={visitDate} />
        <PatientName patientName={patientData.name} />
        <hr className="divider" />
        <div className="content-container">
          <DocumentPreviewSection documentPreviews={documentPreviews} />
          <ActionSection
            handleDocumentUploadIcon={handleDocumentUploadIcon}
            handleCapture={handleCapture}
            handleDocumentFileChange={handleDocumentFileChange}
          />
          <FileTypeSection
            selectedFileType={selectedFileType}
            setSelectedFileType={setSelectedFileType}
          />
          <NotesSection
            handleCancel={handleCancel}
            handleSaveAndUpload={handleSaveAndUpload}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadDocumentPage;
