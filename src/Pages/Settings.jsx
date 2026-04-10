// src/pages/Home.jsx
import React from "react";
import Stats from "../Components/Stats/StatsSection";
import "./style.css";
import HeaderSection from "../Components/Header";
import Settings from "../Components/Settings/Settingspage";
import Sidebar from "../Components/Sidebar/Sidebar";
const Home = () => {
  return (
    <div className="homepage_bg">
      
      <Sidebar/><div className="maincon">

  
      <Settings/></div>
    </div>
  );
};

export default Home;