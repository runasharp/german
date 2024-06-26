import React, { useState } from 'react';
import { medicalTexts } from './quiz/medicalTexts';
import { getRandomElement, handleInputChange, checkAnswers } from './quiz/utils';

const generateQuizTable = () => {
  const quiz = getRandomElement(medicalTexts);
  const correctEndings = [...quiz.correctEndings]; // Make a copy of the correctEndings array
  const words = quiz.text.split(/(___)/).filter(Boolean); // Split text into words and blanks
  const table = words.map((word, index) => ({
    text: word,
    userInput: '',
    correct: word === '___' ? correctEndings.shift() : null,
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
  const [hintCount, setHintCount] = useState(0);

  const startQuiz = () => {
    setQuizTable(generateQuizTable());
    setResult(null);
    setShowResults(false); // Reset results visibility
    setShowHints(false); // Reset hints visibility
    setHintCount(0); // Reset hint count
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTable = checkAnswers(quizTable, setResult, setShowResults);
    setQuizTable(updatedTable);
  };

  const handleShowHints = () => {
    if (!showHints && hintCount < 3) {
      setHintCount(hintCount + 1);
    }
    setShowHints(!showHints);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
                    onChange={(e) => handleInputChange(index, e.target.value, setQuizTable, quizTable)}
                    placeholder={showHints && hintCount <= 3 ? item.correct : ''}
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
                      outline: 'none',
                      borderTop: 'none', // Remove top border
                      borderLeft: 'none', // Remove left border
                      borderRight: 'none', // Remove right border
                      borderRadius: '0', // Remove border radius
                    }}
                  />
                </>
              ) : (
                item.text
              )}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
          <button onClick={handleSubmit}>Проверить ответы</button>
          <button onClick={startQuiz}>Следующий вопрос</button>
          <button onClick={handleShowHints}>
            {showHints ? 'Скрыть подсказки' : 'Показать подсказки'}
          </button>
        </div>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
};

export default MedicalTextQuiz;
