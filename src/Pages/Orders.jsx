// src/pages/Home.jsx
import React from "react";
import Stats from "../Components/Stats/StatsSection";
import "./style.css";
import HeaderSection from "../Components/Header";
import Dashboard from "../Components/Verification/Veripage";
import Sidebar from "../Components/Sidebar/Sidebar";
import OrdersPage from './../Components/Orders/Orderspage';
const Verification = () => {
  return (
    <div className="homepage_bg">
      
      <Sidebar/><div className="maincon">

      
      <OrdersPage/></div>
    </div>
  );
};

export default Verification;