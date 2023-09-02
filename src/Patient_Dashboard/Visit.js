import React from 'react';
import VisitDate from './VisitDate';

const Visit = ({ visit }) => {
  return (
    <div className="visit">
      <span className="visit-description">Visit</span>
      <VisitDate datetime={visit.startDatetime} />
    </div>
  );
};

export default Visit;
