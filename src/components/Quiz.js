import React, { useState } from 'react';
import { germanWords, adjectives } from './quiz/words';
import { definiteArticles, indefiniteArticles, endings } from './quiz/rules';
import { sentenceTemplates } from './quiz/templates';

const cases = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'];
const declensions = ['слабое скл.', 'смешанное скл.', 'сильное скл.'];

const getArticle = (word, caseType, declension, isPlural) => {
  if (declension === 'сильное скл.' && !isPlural) return '';
  const articles = declension === 'смешанное скл.' ? indefiniteArticles : definiteArticles;
  return articles[isPlural ? 'plural' : word.gender][caseType];
};

const getEnding = (word, caseType, declension, isPlural) => {
  const gender = isPlural ? 'plural' : word.gender;
  return endings[declension][caseType][gender];
};

const applyNDeclension = (word, caseType, isPlural) => {
  if (word.nDeclension) {
    if (isPlural) {
      return word.word; // Do nothing, already handled by plural
    } else if (caseType !== 'Nominativ') {
      return word.plural; // Use the plural form for singular Akkusativ, Genitiv, or Dativ
    }
  }
  return word.word;
};

const applyDativePluralEnding = (word) => {
    const pluralEnding = word.plural.slice(-1); // Получаем последний символ формы множественного числа
  
    switch (pluralEnding) {
      case 'n':
        return word.plural; // Оставляем без изменений, если оканчивается на "-n"
      case 's':
        return `${word.plural}`; // Не добавляем ничего, если оканчивается на "-s"
      case 'e':
        return `${word.plural}n`; // Добавляем только "-n", если оканчивается на "-e"
      default:
        return `${word.plural}n`; // Добавляем "-n" для всех остальных случаев
    }
  };

  const getCorrectAnswer = (word, adjective) => {
    const ending = getEnding(word, word.case, word.declension, word.isPlural);
    const adj = `${adjective}${ending}`;
    let noun = applyNDeclension(word, word.case, word.isPlural);
  
    if (word.case === 'Dativ' && word.isPlural) {
      noun = applyDativePluralEnding(word); // Используем функцию для обработки дательного падежа во множественном числе
    }
  
    return word.template
      .replace('article', getArticle(word, word.case, word.declension, word.isPlural))
      .replace('(adjective ending)', adj)
      .replace(word.isPlural ? 'noun_plural' : 'noun', word.isPlural ? word.plural : noun);
  };

const Quiz = () => {
  const [currentWord, setCurrentWord] = useState({});
  const [currentAdjective, setCurrentAdjective] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);

  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

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
      <button onClick={generateQuestion}>Сгенерировать вопрос</button>
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