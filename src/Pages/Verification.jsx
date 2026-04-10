// src/pages/Home.jsx
import React from "react";
import Stats from "../Components/Stats/StatsSection";
import "./style.css";
import HeaderSection from "../Components/Header";
import Dashboard from "../Components/Verification/Veripage";
import Sidebar from "../Components/Sidebar/Sidebar";
import VerificationPage from './../Components/Verification/Veripage';
const Verification = () => {
  return (
    <div className="homepage_bg">
      
      <Sidebar/><div className="maincon">
<HeaderSection  title="Verification & Trust"
        subtitle="Manage verification, badges, and reputation"
       
      
      />
      
      <VerificationPage/></div>
    </div>
  );
};

export default Verification;