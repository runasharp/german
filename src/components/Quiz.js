import React, { useState } from 'react';
import { germanWords, adjectives } from './quiz/words';
import { sentenceTemplates } from './quiz/templates';
import { getRandomElement, getCorrectAnswer, getArticle } from './quiz/utils';

const cases = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'];
const declensions = ['слабое скл.', 'смешанное скл.', 'сильное скл.'];

const Quiz = () => {
  const [currentWord, setCurrentWord] = useState({});
  const [currentAdjective, setCurrentAdjective] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);

  const generateQuestion = () => {
    const word = getRandomElement(germanWords);
    const adjective = getRandomElement(adjectives);
    const caseType = getRandomElement(cases);
    const declension = getRandomElement(declensions);
    const isPlural = Math.random() < 0.5; // Randomly choose between singular and plural
    const templateKey = `${declension}${isPlural ? ' Plural' : ''}`;

    if (!sentenceTemplates[templateKey]) {
      console.error(`Template key "${templateKey}" not found in sentenceTemplates`);
      return;
    }

    const template = sentenceTemplates[templateKey][caseType];

    setCurrentWord({ ...word, case: caseType, declension, template, isPlural });
    setCurrentAdjective(adjective);
    setUserAnswer('');
    setResult(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const correctAnswer = getCorrectAnswer(currentWord, currentAdjective);
    setResult(userAnswer === correctAnswer);
  };

  return (
    <div>
      <button onClick={generateQuestion} style={buttonStyle}>
        Новый вопрос с печатью целого предложения
      </button>
      {currentWord.word && (
        <div>
          <h3>Заполните правильную форму прилагательного</h3>
          <p>
            ({currentWord.case}, {currentWord.declension}):{' '}
            {currentWord.template
              .replace('(adjective ending)', `... (${currentAdjective})`)
              .replace('article', getArticle(currentWord, currentWord.case, currentWord.declension, currentWord.isPlural))
              .replace(currentWord.isPlural ? 'noun_plural' : 'noun', `${currentWord.word} (${currentWord.gender}, ${currentWord.isPlural ? 'Pl.' : 'Sing.'})`)}
          </p>
          <form onSubmit={handleSubmit}>
            <br />
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Ваш ответ"
              style={inputStyle}
            />
            <br />
            <button type="submit" style={buttonStyle}>
              Проверить ответ
            </button>
          </form>
          {result !== null && (
            <p>
              {result
                ? 'Правильно!'
                : `Неправильно. Правильный ответ: ${getCorrectAnswer(currentWord, currentAdjective)}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
};

const inputStyle = {
  width: '600px', // Adjust width as needed
  height: '30px', // Adjust height as needed
  fontSize: '16px', // Optionally adjust font size
  padding: '10px', // Optionally adjust padding
  margin: '10px', // Optionally adjust margin
  border: '1px solid #ccc', // Optionally adjust border style
  borderRadius: '4px', // Optionally adjust border radius
  outline: 'none',
};

export default Quiz;
