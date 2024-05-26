import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import './App.css'; // Import your CSS file for styling
import AdjectiveDeclensionQuiz from './components/AdjectiveDeclensionQuiz';
import MedicalTextQuiz from './components/MedicalTextQuiz';
import TypingQuiz from './components/TypingQuiz';
import Carousel from './components/Carousel';

function App() {
  const [adjective, setAdjective] = useState('schön');

  const handleAdjectiveChange = (event) => {
    setAdjective(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Склонения</Link>
              </li>
              <li>
                <Link to="/carousel">Объяснения</Link>
              </li>
              <li>
                <Link to="/quiz">Квиз: правильно написать предложение</Link>
              </li>
              <li>
                <Link to="/adjective-declension-quiz">Квиз: таблица</Link>
              </li>
              <li>
                <Link to="/medical-text-quiz">Квиз: правильное окончание</Link>
              </li>
              <li>
                <Link to="/typing-quiz">Печать письма</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home adjective={adjective} handleAdjectiveChange={handleAdjectiveChange} />} />
            <Route path="/carousel" element={<Carousel />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/adjective-declension-quiz" element={<AdjectiveDeclensionQuiz adjective={adjective} />} />
            <Route path="/medical-text-quiz" element={<MedicalTextQuiz />} />
            <Route path="/typing-quiz" element={<TypingQuiz />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;