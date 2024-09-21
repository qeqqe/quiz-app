import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./index.css";
import WelcomeScreen from "./WelcomeScreen";
import Selction from "./Selction";
import Quiz from "./Quiz";
import ScoreBoard from "./ScoreBoard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/Selction" element={<Selction />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/ScoreBoard" element={<ScoreBoard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
