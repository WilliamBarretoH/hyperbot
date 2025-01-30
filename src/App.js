import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define que "/" redireciona para "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      
      </Routes>
    </Router>
  );
};

export default App;
