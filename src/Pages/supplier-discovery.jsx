// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebarcms";
import "./style.css";
import HeaderSection from "../Components/Header";
import Supplierform from "../Components/Forms comp/Formpages/Supplierdiscoveryform"; // Import the reusable form page
import Chips from "../Components/Chips/Chipcon";

const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />
      <div className="maincon">
        <HeaderSection/>
        <Chips/>
        <Supplierform/>
    
      </div>
    </div>
  );
};

export default Home;