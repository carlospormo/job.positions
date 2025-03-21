import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PositionsPage from "./pages/PositionsPage";
import EditPositionPage from "./pages/EditPositionPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PositionsPage />} />
      <Route path="/edit/:id" element={<EditPositionPage />} />
      <Route path="/create" element={<EditPositionPage />} />
    </Routes>
  </Router>
);

export default App;
