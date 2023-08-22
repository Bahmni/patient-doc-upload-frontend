import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientCard from './PatientCard';
import styles from './PatientList.module.scss';

const PatientList = () => {
  const [locationUUID, setLocationUUID] = useState(null);
  const [patients, setPatients] = useState([]);
  const [activePatientCount, setActivePatientCount] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocationUUID();
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    setIsMobileView(window.innerWidth <= 768);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchLocationUUID = async () => {
    try {
      const response = await fetch('/openmrs/ws/rest/v1/location?operator=ALL&s=byTags&tags=Login+Location&v=default', {
        headers: {
          Accept: 'application/xml', 
        },
      });

      const xmlData = await response.text(); 
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

      const sessionLocationUUID = xmlDoc.querySelector('uuid').textContent; 
      setLocationUUID(sessionLocationUUID);
      fetchData(sessionLocationUUID);
    } catch (error) {
      console.error('Error fetching session location data:', error);
    }
  };

  const fetchData = async (locationUUID) => {
    try {
      const response = await fetch(
        `/openmrs/ws/rest/v1/bahmnicore/sql?location_uuid=${locationUUID}&q=emrapi.sqlSearch.activePatients`,
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
            <div
              key={patient.uuid}
              onClick={() =>
                navigate(`/patient_dashboard/${patient.uuid}`, {
                  state: { patientData: patient },
                })
              }
            >
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
