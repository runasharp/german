import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
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
      <Button variant="contained" color="primary" onClick={generateQuestion}>
        Новый вопрос с печатью целого предложения
      </Button>
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
            <TextField
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Ваш ответ"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Проверить ответ
            </Button>
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

export default Quiz;