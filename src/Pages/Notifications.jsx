// src/pages/Home.jsx
import React from "react";

import "./style.css";
import HeaderSection from "../Components/Header";
import Notification from "../Components/Notifications/Notificationspage";
import Sidebar from "../Components/Sidebar/Sidebar";
const Home = () => {
  return (
    <div className="homepage_bg">
      
      <Sidebar/><div className="maincon">

     
      <Notification/></div>
    </div>
  );
};

export default Home;