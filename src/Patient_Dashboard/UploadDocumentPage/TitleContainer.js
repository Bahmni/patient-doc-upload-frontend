import React from "react";
import { isValid, format} from "date-fns";


const TitleContainer = ({ visitDate }) => {
  const formattedVisitDate = isValid(new Date(visitDate))
    ? format(new Date(visitDate), "MMM dd, yyyy hh:mm a")
    : "Invalid Date";

  return (
    <div className="title-container">
      <h3 className="upload-heading">Upload Document</h3>
      <div className="visit-info">{`Visit: ${formattedVisitDate}`}</div>
    </div>
  );
};

export default TitleContainer;
