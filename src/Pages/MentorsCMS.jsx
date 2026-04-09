// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebarcms";
import "./style.css";
import HeaderSection from "../Components/Header";
import  Mentorscms from "../Components/Forms comp/Formpages/Mentorscms";
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

    <Mentorscms/>
      </div>
    </div>
  );
};

export default Home;