// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebarcms";
import "./style.css";
import HeaderSection from "../Components/Header";
import Supplierform from "../Components/Forms comp/Formpages/Supplierdiscoveryform"; // Import the reusable form page
import Chips from "../Components/Chips/Chipcon";
import save from"../Assets/SAVE.svg";
const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />
      <div className="maincon">
       <HeaderSection  title="Mobile App Content Manager"
  subtitle="Edit all screens and sections"
  buttonText="Save Changes"
  icon={save}
  onButtonClick={() => console.log("save")}
/>
        <Chips/>
        <Supplierform/>
    
      </div>
    </div>
  );
};

export default Home;