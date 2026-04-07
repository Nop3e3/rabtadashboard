// src/pages/Home.jsx
import React from "react";
import Stats from "../Components/Stats/StatsSection";
import "./style.css";
import Dashboard from "../Components/Graphs/Dashboard";
import Sidebar from "../Components/Sidebar/Sidebar";
const Home = () => {
  return (
    <div className="homepage_bg">
      
      <Sidebar/><div className="maincon">

        <Stats/>
      <Dashboard/></div>
    </div>
  );
};

export default Home;