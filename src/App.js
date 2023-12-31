import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import TabsComponent from './components/TabsComponent/TabsComponent';
import PatientList from './components/PatientList/PatientList';
import PatientDashboard from './Patient_Dashboard/PatientDashboard/PatientDashboard';
import UploadDocumentPage from './Patient_Dashboard/UploadDocumentPage/UploadDocumentPage';
import SearchButton from './components/SearchButton/SearchButton';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/patient_dashboard/:id" element={<PatientDashboard />} />
            <Route path="/upload/:visitId" element={<UploadDocumentPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const HomeLayout = () => {
  return (
    <>
      <div className="tabs-container">
        <TabsComponent />
      </div>
      <div className="search-container">
        <SearchButton />
      </div>
      <Routes>
        <Route path="/" element={<PatientList />} />
      </Routes>
    </>
  );
};
export default App;
