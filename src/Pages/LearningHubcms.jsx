// src/pages/Home.jsx
import React from "react";
import HeaderSection from "../Components/Header";
import Sidebar from "../Components/Sidebar/Sidebarcms";
import "./style.css";
import  Learningcms from "../Components/Forms comp/Formpages/Learningcms";
import Chips from "../Components/Chips/Chipcon";

const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />

      <div className="maincon"><HeaderSection/>
        <Chips/>
<Learningcms/>
      </div>
    </div>
  );
};

export default Home;