import React from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import TabsComponent from "./components/TabsComponent";
import SearchButton from "./components/SearchButton";
import PatientList from "./components/PatientList";
const App = () => {
  return (
    <>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <div className="tabs-container">
            <TabsComponent />
          </div>
          <div className="search-container">
            <SearchButton />
          </div>
        </div>
        <div className="patient_list-container">
          <PatientList />
        </div>
      </div>
    </>
  );
};
export default App;
