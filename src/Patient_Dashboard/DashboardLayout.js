import React from 'react';
import Navbar from '../components/Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
