import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import AppContentHome from "./Pages/AppContentHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
 <Route path="/AppContentHome" element={<AppContentHome/>} />
    </Routes>
  );
}

export default App;