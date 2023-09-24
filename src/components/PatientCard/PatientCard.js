import React from 'react';
import { Tile } from 'carbon-components-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from '../PatientCard/PatientCard.module.scss';
const PatientCard = ({ patient, isMobileView, to }) => {
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
    <Tile className={styles.patientCard}>
      <div className={styles.patientInfo}>
        <div className={styles.patientPhoto}>
          {getInitials(patient.name) ? (
            <div className={styles.initialsIcon}>{getInitials(patient.name)}</div>
          ) : (
            <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
          )}
        </div>
        <div className={styles.patientContent}>
          <h4 className={styles.patientName}>{patient.name}</h4>
          <div className={styles.patient_id}>{patient.identifier}</div>
        </div>
        <div className={styles.showDetailsButton}>
          {isMobileView ? (
            <Link to={to}>Details</Link>
          ) : (
            <Link to={to}>
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
            </Link>
          )}
        </div>
      </div>
      {isMobileView && <div className={styles.bottomBorder} />}
    </Tile>
  );
};
export default PatientCard;