// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./style.css";
import  Learninghubform from "../Components/Forms comp/Formpages/Learninghubcms";
import Chips from "../Components/Chips/Chipcon";

const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />

      <div className="maincon">
        <Chips/>

    <Learninghubform/>
      </div>
    </div>
  );
};

export default Home;