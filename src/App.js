import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import './App.css'; // Import your CSS file for styling
import AdjectiveDeclensionQuiz from './components/AdjectiveDeclensionQuiz';
import HighlightTable from './components/HighlightTable';
import { Carousel } from 'bootstrap';
import MedicalTextQuiz from './components/MedicalTextQuiz';
import TypingQuiz from './TypingQuiz';

function App() {
  const [adjective, setAdjective] = useState('schön');

  const handleAdjectiveChange = (event) => {
    setAdjective(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1>Склонения прилагательных</h1>
      </header>
      <main className="main-content">
        <section className="home-section">
          <Home adjective={adjective} handleAdjectiveChange={handleAdjectiveChange} />
        </section>
        <section className="quiz-section">
          <Quiz />
          <AdjectiveDeclensionQuiz adjective={adjective} />
          <MedicalTextQuiz />
          <TypingQuiz />
          </section>
      </main>
    </div>
  );
}

export default App;