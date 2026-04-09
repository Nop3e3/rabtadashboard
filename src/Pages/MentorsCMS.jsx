// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./style.css";
import  Mentorscms from "../Components/Forms comp/Formpages/Mentorscms";
import Chips from "../Components/Chips/Chipcon";

const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />

      <div className="maincon">
        <Chips/>

    <Mentorscms/>
      </div>
    </div>
  );
};

export default Home;