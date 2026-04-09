// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./style.css";
import Communitycms from "../Components/Forms comp/Formpages/CommunityEditorPage"
import Chips from "../Components/Chips/Chipcon";

const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />

      <div className="maincon">
        <Chips/>
        <Communitycms/>

      </div>
    </div>
  );
};

export default Home;