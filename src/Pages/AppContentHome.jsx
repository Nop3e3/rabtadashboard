// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import ContentSectionEditor from "../Components/Forms comp/homepagecms"; // Import the reusable form page
import "./style.css";
import Chips from "../Components/Chips/Chipcon";

const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />
      <div className="maincon">
        <Chips/>
        <ContentSectionEditor /> {/* Reusable form replaces previous Stats and Dashboard */}
      </div>
    </div>
  );
};

export default Home;