
import React from "react";
import Stats from "../Components/Stats/StatsSection";
import "./style.css";
import plus from "../Assets/plus.svg";
import HeaderSection from "../Components/Header";
import Usercms from "../Components/Usercms/Createuserpage";
import Sidebar from "../Components/Sidebar/Sidebar";
const Userscms = () => {
  return (
    <div className="homepage_bg">
      
      <Sidebar/><div className="maincon">

             <HeaderSection  title="User Management"
  subtitle="Manage and monitor users"
  buttonText="Add User"
  icon={plus}
  onButtonClick={() => console.log("save")}
/>
    
      <Usercms/></div>
    </div>
  );
};
export default Userscms;