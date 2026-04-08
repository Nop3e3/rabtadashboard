// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./style.css";
import Supplierform from "../Components/Forms comp/Formpages/Supplierdiscoveryform"; // Import the reusable form page
import Chips from "../Components/Chips/Chipcon";

const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />
      <div className="maincon">
        <Chips/>
        <Supplierform/>
    
      </div>
    </div>
  );
};

export default Home;