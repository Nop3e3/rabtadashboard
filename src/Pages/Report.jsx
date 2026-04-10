// src/pages/Home.jsx
import React from "react";
import Stats from "../Components/Stats/StatsSection";
import "./style.css";
import HeaderSection from "../Components/Header";
import Dashboard from "../Components/Verification/Veripage";
import Sidebar from "../Components/Sidebar/Sidebar";
import Reports from './../Components/Reports/Reportspage';
const Orders = () => {
  return (
    <div className="homepage_bg">
      
      <Sidebar/><div className="maincon">

      
      <Reports/></div>
    </div>
  );
};

export default Orders;