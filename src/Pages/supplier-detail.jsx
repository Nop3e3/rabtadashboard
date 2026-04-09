// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebarcms";
import HeaderSection from "../Components/Header";
import "./style.css";
import  SupplierDetail from "../Components/Forms comp/Formpages/SupplierDetail";
import Chips from "../Components/Chips/Chipcon";

const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />

      <div className="maincon">
        <HeaderSection/>
        <Chips/>
    <SupplierDetail/>
    
      </div>
    </div>
  );
};

export default Home;