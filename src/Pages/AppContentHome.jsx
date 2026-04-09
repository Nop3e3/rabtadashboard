// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebarcms";
import ContentSectionEditor from "../Components/Forms comp/Formpages/homepagecms"; // Import the reusable form page
import "./style.css";
import save from"../Assets/SAVE.svg";
import HeaderSection from "../Components/Header";
import Chips from "../Components/Chips/Chipcon";

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
        <ContentSectionEditor /> {/* Reusable form replaces previous Stats and Dashboard */}
      </div>
    </div>
  );
};

export default Home;