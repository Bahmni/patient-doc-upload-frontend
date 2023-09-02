import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { format, isValid } from "date-fns";
import { Document24, Camera24 } from "@carbon/icons-react";
import {
  TextArea,
  Button,
  RadioButtonGroup,
  RadioButton,
} from "carbon-components-react";
import DocumentPreview from "../Patient_Dashboard/DocumentPreview";
import DashboardLayout from "../Patient_Dashboard/DashboardLayout";
import axios from "axios";
import "../Patient_Dashboard/UploadDocumentPage.scss";

const bahmniBaseUrl = "/openmrs"; // Updated to match the proxy path

const removeVoidedDocuments = async (documents) => {
  for (const document of documents) {
    if (document.voided && document.image) {
      const url = `${bahmniBaseUrl}/ws/rest/v1/bahmnicore/visitDocument?filename=${document.image}`;
      await axios.delete(url, { withCredentials: true });
    }
  }
};

const saveFile = async (file, patientUuid, encounterTypeName, fileName) => {
  const format = file.type.split("/")[1];
  let fileType = "";

  if (format.match(/^(jpg|jpeg|png|gif)$/i)) {
    fileType = "image";
  } else if (format.match(/^pdf$/i)) {
    fileType = "pdf";
  } else {
    alert(
      "Unsupported file type. Please select a valid file type (pdf, jpg, jpeg, png, gif)."
    );
    throw new Error("Unsupported file type");
  }

  const url = `${bahmniBaseUrl}/ws/rest/v1/bahmnicore/visitDocument/uploadDocument`;

  try {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const base64File = reader.result.split(",")[1]; // Get the base64 content

        try {
          const response = await axios.post(
            url,
            {
              content: base64File,
              format,
              patientUuid,
              encounterTypeName,
              fileType, // Updated to use the determined fileType
              fileName: fileName.split(".")[0],
            },
            {
              withCredentials: true,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data && response.data.url) {
            resolve(response.data.url);
          } else {
            console.error(
              "Error uploading document: URL not found in response"
            );
            reject(
              new Error("Error uploading document: URL not found in response")
            );
          }
        } catch (error) {
          console.error("Error uploading document:", error);
          reject(error);
        }
      };
    });
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
};

const UploadDocumentPage = () => {
  const { visitId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { patientData, visit, selectedDocumentPreview, visitDate } =
    location.state  || {};
  const uploadedVisitId = visit ? visit.uuid : null;

  const formatVisitDate = (datetime) => {
    if (isValid(new Date(datetime))) {
      return format(new Date(datetime), "MMM dd, yyyy hh:mm a");
    } else {
      return "Invalid Date";
    }
  };
  const patientName = patientData ? patientData.name : "";

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
      const previewUrl = URL.createObjectURL(file); // Create a preview URL
      setDocumentPreviews((prevPreviews) => [...prevPreviews, previewUrl]); // Add to previews
    }
  };

  const handleCapture = () => {
    console.log("Capture clicked");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf,image/*";
    fileInput.capture = "environment"; // Use the back camera for mobile devices
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
        selectedFileType, // Use the selected file type
        selectedDocument.name
      );

      console.log("Document uploaded successfully");
      console.log("File URL:", response);
      alert("Document(s) saved and uploaded successfully");
      navigate(`/patient_dashboard/${patientData.uuid}`, {
        state: {
          patientData,
        },
      });    } catch (error) {
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
        <div className="title-container">
          <h3 className="upload-heading">Upload Document</h3>
          <div className="visit-info">{`Visit: ${formatVisitDate(
            visitDate
          )}`}</div>
        </div>
        <div className="patient-name">{patientName}</div>
        <hr className="divider" />
        <div className="content-container">
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
                  <Button
                    className="save-upload-button"
                    onClick={handleSaveAndUpload}
                  >
                    Save and Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadDocumentPage;
