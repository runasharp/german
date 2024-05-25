import React, { useState } from 'react';
import { medicalTexts } from './quiz/medicalTexts';

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const generateQuizTable = () => {
  const quiz = getRandomElement(medicalTexts);
  const words = quiz.text.split(/(___)/).filter(Boolean); // Split text into words and blanks
  const table = words.map((word, index) => ({
    text: word,
    userInput: '',
    correct: word === '___' ? quiz.correctEndings.shift() : null,
    isCorrect: null,
    isChecked: false
  }));
  return table;
};

const MedicalTextQuiz = () => {
  const [quizTable, setQuizTable] = useState(generateQuizTable());
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const startQuiz = () => {
    setQuizTable(generateQuizTable());
    setResult(null);
    setShowResults(false); // Reset results visibility
    setShowHints(false); // Reset hints visibility
  };

  const handleInputChange = (index, value) => {
    const updatedTable = quizTable.map((item, i) => i === index ? { ...item, userInput: value } : item);
    setQuizTable(updatedTable);
  };

  const checkAnswers = () => {
    let correctCount = 0;
    let totalCount = 0;

    const updatedTable = quizTable.map((item) => {
      if (item.correct !== null) {
        const isCorrect = item.userInput === item.correct;
        if (isCorrect) {
          correctCount++;
        }
        totalCount++;
        return { ...item, isCorrect, isChecked: true };
      }
      return item;
    });

    setQuizTable(updatedTable);
    setResult(`${correctCount} aus ${totalCount} richtigen Antworten.`);
    setShowResults(true); // Show results after checking answers
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  return (
    <div>
      <button onClick={startQuiz}>Новый вопрос с медицинскими предложениями</button>
      <div>
        <h3>Заполните пропущенные окончания в medizinischen текстах</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', color: 'black' }}>
          {quizTable.map((item, index) => (
            <span key={index} style={{ display: 'inline-flex', alignItems: 'center', color: 'black' }}>
              {item.correct !== null ? (
                <>
                  <input
                    type="text"
                    value={item.userInput}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder={showHints ? item.correct : ''}
                    style={{
                      width: '20px',
                      color: item.userInput === '' ? 'grey' : (
                        showResults && item.isChecked
                          ? (item.isCorrect ? 'green' : 'red')
                          : 'black'
                      ),
                      border: 'none',
                      borderBottom: '1px solid black',
                      margin: '0 2px',
                      padding: '0',
                      fontSize: 'inherit',
                      outline: 'none'
                    }}
                  />
                </>
              ) : (
                item.text
              )}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={checkAnswers}>Проверить ответы</button>
          <button onClick={startQuiz}>Следующий вопрос</button>
          <button onClick={toggleHints}>{showHints ? 'Скрыть подсказки' : 'Показать подсказки'}</button>
        </div>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
};

export default MedicalTextQuiz;