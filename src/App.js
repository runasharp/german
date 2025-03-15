import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import "./App.css"; // Import your CSS file for styling
import AdjectiveDeclensionQuiz from "./components/AdjectiveDeclensionQuiz";
import MedicalTextQuiz from "./components/MedicalTextQuiz";
import TypingQuiz from "./components/TypingQuiz";
import Carousel from "./components/Carousel";
import Header from "./components/Header";

function App() {
  const [adjective, setAdjective] = useState("schön");

  const handleAdjectiveChange = (event) => {
    setAdjective(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  adjective={adjective}
                  handleAdjectiveChange={handleAdjectiveChange}
                />
              }
            />
            <Route path="/carousel" element={<Carousel />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route
              path="/adjective-declension-quiz"
              element={<AdjectiveDeclensionQuiz adjective={adjective} />}
            />
            <Route path="/medical-text-quiz" element={<MedicalTextQuiz />} />
            <Route path="/typing-quiz" element={<TypingQuiz />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
