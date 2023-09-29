import React from 'react';
import { format, isValid, parseISO } from 'date-fns';

const VisitDate = ({ datetime }) => {
  const date = parseISO(datetime);
  
  if (!isValid(date)) {
    return <span className="visit-date">Invalid Date</span>;
  }

  const formattedDate = format(date, 'MMM dd, yyyy hh:mm a');
  return <span className="visit-date">{formattedDate}</span>;
};

export default VisitDate;
