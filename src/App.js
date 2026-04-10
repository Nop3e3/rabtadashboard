import React from "react";
import { Routes, Route } from "react-router-dom";
import Supplierdiscovery from "./Pages/supplier-discovery";
import Home from "./Pages/Home";
import Supplierdetail from "./Pages/supplier-detail";
import AppContentHome from "./Pages/AppContentHome";
import MentorsCMS from "./Pages/MentorsCMS";
import Learninghubcms from "./Pages/LearningHubcms";
import Learninghub from "./Pages/LearningHubDisplay";
import Communitycms from "./Pages/Communitycms";
import Community from "./Pages/CommunityFeedDisplay";
import Suppliercontentpages from "./Pages/Suppliercontentpages";
import Users from "./Pages/UsersDisplay";
import Userscms from "./Pages/Usercms";
function App() {
  return (
    <Routes>
      
          <Route path="/Userscms" element={<Userscms/>} />
          <Route path="/Users" element={<Users/>} />
          <Route path="/Community" element={<Community/>} />
         <Route path="/supplier-detail" element={<Supplierdetail/>} />
          <Route path="/Suppliercontentpages" element={<Suppliercontentpages/>} />
                  <Route path="/Communitycms" element={<Communitycms/>} />
      <Route path="/supplier-discovery" element={<Supplierdiscovery/>} />
       <Route path="/" element={<Home />} />
             <Route path="/Learninghubcms" element={<Learninghubcms/>} />
                        <Route path="/Learninghub" element={<Learninghub/>} />
          <Route path="/MentorsCMS" element={<MentorsCMS/>} />
 <Route path="/AppContentHome" element={<AppContentHome/>} />
    </Routes>
  );
}

export default App;