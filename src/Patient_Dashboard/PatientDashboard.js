import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DashboardLayout from '../Patient_Dashboard/DashboardLayout';
import { Search } from 'carbon-components-react';
import { isValid, format } from 'date-fns';
import { Document24, Camera24 } from '@carbon/icons-react';
import '../Patient_Dashboard/PatientDashboard.scss';
const PatientDashboard = () => {
  const { id } = useParams();
  const location = useLocation();
  const patientData = location.state ? location.state.patientData : null;
  const [visits, setVisits] = useState([]);
  const [selectedDocumentPreviews, setSelectedDocumentPreviews] = useState({});
  useEffect(() => {
    fetchVisits();
  }, []);
  const fetchVisits = async () => {
    try {
      const visitResponse = await fetch(`/openmrs/ws/rest/v1/visit?patient=${id}`);
      const visitData = await visitResponse.json();
      setVisits(visitData.results);
    } catch (error) {
      console.error('Error fetching visits:', error);
    }
  };
  const getFormattedDate = (datetime) => {
    if (isValid(new Date(datetime))) {
      return format(new Date(datetime), 'MMM dd, yyyy hh:mm a');
    } else {
      return 'Invalid Date';
    }
  };
  const handleCapture = () => {
    // Capture logic here
    console.log('Camera captured');
  };
  const handleDocumentUpload = (event, visitId) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedDocumentPreviews((prevPreviews) => ({
        ...prevPreviews,
        [visitId]: prevPreviews[visitId] ? [...prevPreviews[visitId], previewUrl] : [previewUrl],
      }));
    }
  };
  const getInitials = (name) => {
    if (typeof name === 'string') {
      const initials = name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
      return initials;
    }
    return '';
  };
  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <div className="patient-search-container">
          <div className="patient-card-container">
            <div className="patient-photo">
              {patientData && patientData.photoUrl ? (
                <img src={patientData.photoUrl} alt="Patient" />
              ) : (
                <div className="initials-icon">
                  {patientData && getInitials(patientData.name)}
                </div>
              )}
            </div>
            <div className="patient-info">
              <div className="patient-details">
                <h2 data-testid="patient-name">{patientData && patientData.name}</h2>
                <div className="patient-id" data-testid="patient-identifier">
                  {patientData && `ID: ${patientData.identifier}`}
                </div>
              </div>
            </div>
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
            <div key={visit.uuid} className="visit-item" data-testid={`document-icon-${visit.uuid}`}>
              <div className="visit">
                <span className="visit-description">Visit</span>
                <span className="visit-date">
                  {getFormattedDate(visit.startDatetime)}
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
                      data-testid={`document-icon-${visit.uuid}`} 
                    />
                    <input
                      id={`fileInput-${visit.uuid}`}
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(event) =>
                        handleDocumentUpload(event, visit.uuid)
                      }
                      data-testid={`file-input-${visit.uuid}`}
                    />
                  </span>
                  <span className="icon-wrapper">
                    <Camera24 className="capture-icon" onClick={handleCapture} data-testid="camera-icon"/>
                  </span>
                </div>
              </div>
              <div className="document-previews">
                {selectedDocumentPreviews[visit.uuid] && (
                  <div className="document-preview-container">
                    {selectedDocumentPreviews[visit.uuid].map((previewUrl, index) => (
                      <div
                        key={`document-preview-${visit.uuid}-${index}`}
                        className="document-preview"
                      >
                        <img
                          src={previewUrl}
                          alt={`Document Preview ${index + 1} for Visit ${visit.uuid}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default PatientDashboard;

