// src/pages/Home.jsx
import React from "react";
import Stats from "../Components/Stats/StatsSection";
import "./style.css";
import plus from "../Assets/plus.svg";
import HeaderSection from "../Components/Header";
import Dashboard from "../Components/Community/Communitypage";
import Sidebar from "../Components/Sidebar/Sidebar";
const Home = () => {
  return (
    <div className="homepage_bg">
      
      <Sidebar/><div className="maincon">
<HeaderSection  title="Community & Mentorship"
        subtitle="Manage community, mentorship, and engagement"
    
      />
      
    
      <Dashboard/></div>
    </div>
  );
};

export default Home;