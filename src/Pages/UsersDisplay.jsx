
import React from "react";
import Stats from "../Components/Stats/StatsSection";
import "./style.css";
import plus from "../Assets/plus.svg";
import HeaderSection from "../Components/Header";
import UserManagementPage from "../Components/Users/Users";
import Sidebar from "../Components/Sidebar/Sidebar";
const UsersDisplay = () => {
  return (
    <div className="homepage_bg">
      
      <Sidebar/><div className="maincon">

             <HeaderSection  title="User Management"
  subtitle="Manage and monitor users"
  buttonText="Add User"
  icon={plus}
   path="/Userscms"
  onButtonClick={() => console.log("save")}
/>
    
      <UserManagementPage/></div>
    </div>
  );
};
export default UsersDisplay;