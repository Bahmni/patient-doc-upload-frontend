import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { Search } from "carbon-components-react";
import { Document24, Camera24 } from "@carbon/icons-react";
import "../../Patient_Dashboard/PatientDashboard/PatientDashboard.scss";
import PatientInfo from "./PatientInfo";
import VisitItem from "../Visits/VisitItem";

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const PatientDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const patientData = location.state ? location.state.patientData : null;
  const [visits, setVisits] = useState([]);
  const [selectedDocumentPreviews, setSelectedDocumentPreviews] = useState({});
  const visitDate = location.state ? location.state.visitDate : null;
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      const visitResponse = await fetch(
        `/openmrs/ws/rest/v1/visit?patient=${id}`
      );
      const visitData = await visitResponse.json();
      setVisits(visitData.results);
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };

  const handleUpload = async () => {
    if (selectedDocument) {
      const formData = new FormData();
      formData.append('file', selectedDocument);
      try {
        const uploadResponse = await fetch(
          '/openmrs/ws/rest/v1/bahmnicore/visitDocument/uploadDocument',
          {
            method: 'POST',
            body: formData,
          }
        );
        if (uploadResponse.ok) {
          console.log('Document uploaded successfully');
          setSelectedDocument(null);
          fetchVisits();
        } else {
          console.error('Error uploading document');
          alert('Error uploading document. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading document:', error);
        alert('Error uploading document. Please try again.');
      }
    } else {
      console.log('No document selected');
      alert('Please select a document to upload.');
    }
  };

  const handleDocumentUpload = (event, visitId) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedDocument(file);
      const previewUrl = URL.createObjectURL(file);
      setSelectedDocumentPreviews((prevPreviews) => ({
        ...prevPreviews,
        [visitId]: prevPreviews[visitId]
          ? [...prevPreviews[visitId], previewUrl]
          : [previewUrl],
      }));
      const selectedVisit = visits.find((visit) => visit.uuid === visitId);
      const visitDate = formatDate(selectedVisit.display);
      navigate(`/upload/${visitId}`, {
        state: {
          patientData,
          visit: selectedVisit,
          selectedDocumentPreview: previewUrl,
          visitDate: visitDate,
        },
      });
    }
  };

  return (
    <DashboardLayout>
    <div className="dashboard-container">
      <div className="patient-search-container">
        <div className="patient-card-container">
          <PatientInfo patientData={patientData} />
        </div>
        <div className="search-box-container">
          <Search
            size="lg"
            labelText="Search"
            placeholder="Search"
            closeButtonLabelText="Clear search input"
            id="search-1"
            onChange={() => {}}
            onKeyDown={() => {}}
          />
        </div>
      </div>
        <div className="visits-container">
          {visits.map((visit) => (
            <VisitItem
              key={visit.uuid}
              visit={visit}
              selectedDocumentPreviews={selectedDocumentPreviews}
              handleDocumentUpload={handleDocumentUpload}
              handleCapture={handleUpload} 
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
