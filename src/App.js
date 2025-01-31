import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import RoboInvestidor from "./components/RoboInvestidor/RoboInvestidor";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define que "/" redireciona para "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/robo" element={<RoboInvestidor />} />
      </Routes>
    </Router>
  );
};

export default App;
