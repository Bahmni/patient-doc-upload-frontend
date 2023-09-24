import React from "react";
const getInitials = (name) => {
  if (typeof name === "string") {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
    return initials;
  }
  return "";
};
const PatientInfo = ({ patientData }) => {
  return (
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
          <h2>{patientData && patientData.name}</h2>
          <div className="patient-id">
            {patientData && `ID: ${patientData.identifier}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
