// src/pages/Home.jsx
import React from "react";
import Stats from "../Components/Stats/StatsSection";
import "./style.css";
import plus from "../Assets/plus.svg";
import HeaderSection from "../Components/Header";
import Suppliertable from "../Components/Supplier/Suppliercontentpsge";
import Sidebar from "../Components/Sidebar/Sidebar";
const Home = () => {
  return (
    <div className="homepage_bg">
        
      <Sidebar/><div className="maincon">
<HeaderSection  title="Supplier Management"
        subtitle="Manage and review suppliers"
        buttonText="Add Supplier"
        icon={plus}
        onButtonClick={() => console.log("save")}
          path="/supplier-detail"
      />
      
      <Suppliertable/></div>
    </div>
  );
};

export default Home;