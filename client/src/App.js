import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PalettesPage from "./pages/PalettesPage";
import HomePage from "./pages/HomePage";

import useFBTracker from "./hooks/useFBTracker";

function App() {
  const { addEventToTracker } = useFBTracker();

  useEffect(() => {
    addEventToTracker("Page View", "inital_search_page_viewed", "");
  }, []);

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
