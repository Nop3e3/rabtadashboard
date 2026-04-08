import React from "react";
import { Routes, Route } from "react-router-dom";
import Supplierdiscovery from "./Pages/supplier-discovery";
import Home from "./Pages/Home";
import Supplierdetail from "./Pages/supplier-detail"
import AppContentHome from "./Pages/AppContentHome";

function App() {
  return (
    <Routes>
         <Route path="/supplier-detail" element={<Supplierdetail/>} />
      <Route path="/supplier-discovery" element={<Supplierdiscovery/>} />
       <Route path="/" element={<Home />} />
 <Route path="/AppContentHome" element={<AppContentHome/>} />
    </Routes>
  );
}

export default App;