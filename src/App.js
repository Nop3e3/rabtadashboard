import React from "react";
import { Routes, Route } from "react-router-dom";
import Supplierdiscovery from "./Pages/supplier-discovery";
import Home from "./Pages/Home";
import Supplierdetail from "./Pages/supplier-detail"
import AppContentHome from "./Pages/AppContentHome";
import MentorsCMS from "./Pages/MentorsCMS"
import Learninghubcms from "./Pages/LearningHubcms"
import Communitycms from "./Pages/Communitycms"
function App() {
  return (
    <Routes>
         <Route path="/supplier-detail" element={<Supplierdetail/>} />
                  <Route path="/Communitycms" element={<Communitycms/>} />
      <Route path="/supplier-discovery" element={<Supplierdiscovery/>} />
       <Route path="/" element={<Home />} />
             <Route path="/Learninghubcms" element={<Learninghubcms/>} />
          <Route path="/MentorsCMS" element={<MentorsCMS/>} />
 <Route path="/AppContentHome" element={<AppContentHome/>} />
    </Routes>
  );
}

export default App;