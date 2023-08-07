import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DashboardLayout from '../Patient_Dashboard/DashboardLayout';
import { Search } from 'carbon-components-react';
import '../Patient_Dashboard/PatientDashboard.scss';

const PatientDashboard = () => {
  const { id } = useParams();
  const location = useLocation();
  const patientData = location.state ? location.state.patientData : null;
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
      <div className="patient-search-container">
        {patientData ? (
          <div className="patient-card-container">
            <div className="patient-photo">
              {patientData.photoUrl ? (
                <img src={patientData.photoUrl} alt="Patient" />
              ) : (
                <div className="initials-icon">{getInitials(patientData.name)}</div>
              )}
            </div>
            <div className="patient-info">
              <div className="patient-details">
                <h2>{patientData.name}</h2>
                <div className="patient-id">ID: {patientData.identifier}</div>
              </div>
            </div>
          </div>
        ) : (
          <div>Patient data not found.</div>
        )}
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
    </DashboardLayout>
  );
};

export default PatientDashboard;
