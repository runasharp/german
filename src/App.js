import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import './App.css'; // Import your CSS file for styling

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
        </section>
      </main>
    </div>
  );
}

export default App;