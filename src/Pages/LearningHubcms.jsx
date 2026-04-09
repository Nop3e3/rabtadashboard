// src/pages/Home.jsx
import React from "react";
import HeaderSection from "../Components/Header";
import Sidebar from "../Components/Sidebar/Sidebarcms";
import "./style.css";
import save from"../Assets/SAVE.svg";
import  Learningcms from "../Components/Forms comp/Formpages/Learningcms";
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
<Learningcms/>
      </div>
    </div>
  );
};

export default Home;