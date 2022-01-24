import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PalettesPage from "./pages/PalettesPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/palettes" element={<PalettesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
