import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import TabsComponent from './components/TabsComponent';
import PatientList from './components/PatientList';
import PatientDashboard from './Patient_Dashboard/PatientDashboard';
import SearchButton from './components/SearchButton';
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/patient_dashboard/:id" element={<PatientDashboardLayout />} />
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
const PatientDashboardLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PatientDashboard />} />
      </Routes>
    </div>
  );
};
export default App;