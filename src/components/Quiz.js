import React, { useState } from 'react';
import { germanWords, adjectives } from './quiz/words';
import { sentenceTemplates } from './quiz/templates';
import { getRandomElement, getCorrectAnswer, handleInputChange, getArticle } from './quiz/utils';

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
      <button onClick={generateQuestion}>Новый вопрос с печатью целого предложения</button>
      {currentWord.word && (
        <div>
          <h3>Заполните правильную форму прилагательного</h3>
          <p>({currentWord.case}, {currentWord.declension}): {currentWord.template.replace('(adjective ending)', `... (${currentAdjective})`).replace('article', getArticle(currentWord, currentWord.case, currentWord.declension, currentWord.isPlural)).replace(currentWord.isPlural ? 'noun_plural' : 'noun', `${currentWord.word} (${currentWord.gender}, ${currentWord.isPlural ? 'Pl.' : 'Sing.'})`)}</p>
          <form onSubmit={handleSubmit}>
            <br />
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Ваш ответ"
              style={{
                width: '600px', // Adjust width as needed
                height: '30px', // Adjust height as needed
                fontSize: '16px', // Optionally adjust font size
                padding: '10px', // Optionally adjust padding
                margin: '10px', // Optionally adjust margin
                border: '1px solid #ccc', // Optionally adjust border style
                borderRadius: '4px', // Optionally adjust border radius
              }}
            />
            <br />
            <button
              type="submit"
              style={{
                width: '200px', // Adjust width as needed
                height: '50px', // Adjust height as needed
                fontSize: '18px', // Optionally adjust font size
                padding: '10px', // Optionally adjust padding
                margin: '10px', // Optionally adjust margin
                border: 'none', // Optionally remove border
                borderRadius: '6px', // Optionally adjust border radius
                backgroundColor: '#3498db', // Optionally adjust background color
                color: '#fff', // Optionally adjust text color
                cursor: 'pointer', // Optionally change cursor on hover
              }}
            >
              Проверить ответ
            </button>
          </form>
          {result !== null && (
            <p>{result ? 'Правильно!' : `Неправильно. Правильный ответ: ${getCorrectAnswer(currentWord, currentAdjective)}`}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;