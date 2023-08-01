import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseString } from "xml2js";
import { Tile } from "carbon-components-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./PatientList.module.scss";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [activePatientCount, setActivePatientCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "/openmrs/ws/rest/v1/bahmnicore/sql?location_uuid={location_uuid}=emrapi.sqlSearch.activePatients",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/xml",
          },
        }
      );

      parseString(response.data, (err, result) => {
        if (err) {
          console.error("Error parsing XML:", err);
          return;
        }

        const patients = result.list.object;
        setPatients(patients);

        setActivePatientCount(patients.length);
      });
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

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

  return (
    <div className={styles.patientListContainer}>
      <div className={styles.centerHeading}>
        Patients ({activePatientCount})
      </div>
      <div className={styles.patientDataContainer}>
        {patients.map((patient) => (
          <Tile key={patient.uuid} className={styles.patientCard}>
            <div className={styles.patientInfo}>
              <div className={styles.patientPhoto}>
                {getInitials(patient.name) ? (
                  <div className={styles.initialsIcon}>
                    {getInitials(patient.name)}
                  </div>
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.userIcon}
                  />
                )}
              </div>
              <div className={styles.patientContent}>
                <h4 className={styles.patientName}>{patient.name}</h4>
                <div className={styles.patient_id}>{patient.identifier}</div>
              </div>
              <div className={styles.showDetailsButton}>
                Show All Details
                <svg
                  className={styles.dropdownIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 13l-4-4h8l-4 4z" />
                </svg>
              </div>
            </div>
          </Tile>
        ))}
      </div>
    </div>
  );
};

export default PatientList;

