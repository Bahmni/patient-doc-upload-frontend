import React from "react";
import { Tabs, Tab } from "carbon-components-react";
import { Monster16, Bee16 } from "@carbon/icons-react";
const TabsComponent = () => {
  return (
    <Tabs>
      <Tab
        id="activePatients"
        label="Active Patients"
        icon={<Monster16 />}
        style={{ backgroundColor: "#D3D3D3" }}
      >
      </Tab>
      <Tab
        id="allPatients"
        label="All Patients"
        icon={<Bee16 />}
        style={{ backgroundColor: "#D3D3D3" }}
      >
      </Tab>
    </Tabs>
  );
};
export default TabsComponent;
