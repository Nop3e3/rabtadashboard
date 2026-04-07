// src/pages/Home.jsx
import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import ContentSectionEditor from "../Components/Forms comp/ContentSectionEditor"; // Import the reusable form page
import "./style.css";

const Home = () => {
  return (
    <div className="homepage_bg">
      <Sidebar />
      <div className="maincon">
        <ContentSectionEditor /> {/* Reusable form replaces previous Stats and Dashboard */}
      </div>
    </div>
  );
};

export default Home;