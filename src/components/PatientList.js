import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatientCard from './PatientCard';
import styles from './PatientList.module.scss';
const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [activePatientCount, setActivePatientCount] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    setIsMobileView(window.innerWidth <= 768);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        '/openmrs/ws/rest/v1/bahmnicore/sql?location_uuid={location_uuid}&q=emrapi.sqlSearch.activePatients',
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      const data = await response.json();
      if (data.length > 0) {
        setPatients(data);
        setActivePatientCount(data.length);
      } else {
        setPatients([]);
        setActivePatientCount(0);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };
  return (
    <div className={styles.patientListContainer}>
      <div className={styles.centerHeading}>
        {activePatientCount > 0 && `${activePatientCount} Patients`}
      </div>
      <div className={styles.patientDataContainer}>
        {patients.length > 0 ? (
          patients.map((patient) => (
            <div key={patient.uuid} onClick={() => navigate(`/patient_dashboard/${patient.uuid}`, { state: { patientData: patient } })}>
              <PatientCard patient={patient} isMobileView={isMobileView} />
            </div>
          ))
        ) : (
          <div>No patients found.</div>
        )}
      </div>
    </div>
  );
};
export default PatientList;