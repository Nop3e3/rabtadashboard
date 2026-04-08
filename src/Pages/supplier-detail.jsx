// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./style.css";
import  SupplierDetail from "../Components/Forms comp/Formpages/SupplierDetail";
import Chips from "../Components/Chips/Chipcon";

const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />

      <div className="maincon">
        <Chips/>
    <SupplierDetail/>
    
      </div>
    </div>
  );
};

export default Home;