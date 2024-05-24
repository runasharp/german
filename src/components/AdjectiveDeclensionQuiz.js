import React, { useState } from 'react';
import { endings, definiteArticles, indefiniteArticles } from './quiz/rules';
import { adjectives, germanWords } from './quiz/words';

const declensions = ['слабое скл.', 'смешанное скл.', 'сильное скл.'];
const cases = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'];
const genders = ['m', 'n', 'f', 'plural'];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const generateIncompleteTable = (declension, adjective) => {
  const incompleteTable = {};
  const nouns = {
    m: getRandomElement(germanWords.filter(word => word.gender === 'm')).word,
    n: getRandomElement(germanWords.filter(word => word.gender === 'n')).word,
    f: getRandomElement(germanWords.filter(word => word.gender === 'f')).word,
    plural: getRandomElement(germanWords).plural
  };

  cases.forEach((caseType) => {
    incompleteTable[caseType] = {};
    genders.forEach((gender) => {
      let article = '';
      if (declension === 'слабое скл.') {
        article = definiteArticles[gender][caseType];
      } else if (declension === 'смешанное скл.') {
        article = indefiniteArticles[gender][caseType];
      }
      incompleteTable[caseType][gender] = {
        correct: `${adjective}${endings[declension][caseType][gender]}`,
        userInput: '',
        article,
        noun: nouns[gender]
      };
    });
  });
  return incompleteTable;
};

const AdjectiveDeclensionQuiz = () => {
  const [currentDeclension, setCurrentDeclension] = useState('');
  const [currentAdjective, setCurrentAdjective] = useState('');
  const [incompleteTable, setIncompleteTable] = useState({});
  const [result, setResult] = useState(null);
  const [showHints, setShowHints] = useState(false);

  const startQuiz = () => {
    const declension = getRandomElement(declensions);
    const adjective = getRandomElement(adjectives);
    setCurrentDeclension(declension);
    setCurrentAdjective(adjective);
    setIncompleteTable(generateIncompleteTable(declension, adjective));
    setResult(null);
    setShowHints(false); // Reset hints visibility
  };

  const handleInputChange = (caseType, gender, value) => {
    setIncompleteTable({
      ...incompleteTable,
      [caseType]: {
        ...incompleteTable[caseType],
        [gender]: {
          ...incompleteTable[caseType][gender],
          userInput: value
        }
      }
    });
  };

  const checkAnswers = () => {
    let correctCount = 0;
    let totalCount = 0;

    cases.forEach((caseType) => {
      genders.forEach((gender) => {
        if (incompleteTable[caseType][gender].userInput === incompleteTable[caseType][gender].correct) {
          correctCount++;
        }
        totalCount++;
      });
    });

    setResult(`${correctCount} из ${totalCount} правильных ответов.`);
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  return (
    <div>
      <button onClick={startQuiz}>Начать квиз</button>
      {currentDeclension && currentAdjective && (
        <div>
          <h3>Заполните таблицу склонений прилагательных ({currentDeclension})</h3>
          <p>Прилагательное: <b>{currentAdjective}</b></p>
          <button onClick={toggleHints}>{showHints ? 'Скрыть подсказки' : 'Показать подсказки'}</button>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Maskulin</th>
                <th>Neutrum</th>
                <th>Feminin</th>
                <th>Plural</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseType) => (
                <tr key={caseType}>
                  <td>{caseType}</td>
                  {genders.map((gender) => (
                    <td key={gender}>
                      {incompleteTable[caseType][gender].article} {currentAdjective}
                      <input
                        type="text"
                        value={incompleteTable[caseType][gender].userInput}
                        onChange={(e) => handleInputChange(caseType, gender, e.target.value)}
                        placeholder={showHints ? endings[currentDeclension][caseType][gender] : ''}
                        style={{
                          border: 'none',
                          borderBottom: '1px solid black',
                          width: '20px',
                          color: incompleteTable[caseType][gender].userInput ? 'black' : 'grey',
                          margin: '0',
                          padding: '0',
                          fontSize: 'inherit',
                          outline: 'none'
                        }}
                      /> {incompleteTable[caseType][gender].noun}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={checkAnswers}>Проверить ответы</button>
          {result && <p>{result}</p>}
        </div>
      )}
    </div>
  );
};

export default AdjectiveDeclensionQuiz;