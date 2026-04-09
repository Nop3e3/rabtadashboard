// src/pages/Home.jsx
import React from "react";

import "./style.css";
import plus from "../Assets/plus.svg";
import HeaderSection from "../Components/Header";
import LearningContentPage from "../Components/learning hub course display/Learningdisplay";
import Sidebar from "../Components/Sidebar/Sidebar";
const Home = () => {
  return (
    <div className="homepage_bg">
        
      <Sidebar/><div className="maincon">
<HeaderSection  title="Learning Content"
        subtitle="Manage courses and educational content"
        buttonText="Add Course"
        icon={plus}
        onButtonClick={() => console.log("save")}
          path="/Learninghubcms"
      />
      
      <LearningContentPage/></div>
    </div>
  );
};

export default Home;