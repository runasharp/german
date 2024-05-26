import React, { useState } from 'react';
import { endings, definiteArticles, indefiniteArticles } from './quiz/rules';
import { adjectives } from './quiz/words';
import { getRandomElement, handleInputChange, checkAnswers } from './quiz/utils';

const declensions = ['слабое скл.', 'смешанное скл.', 'сильное скл.'];
const cases = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'];
const genders = ['m', 'n', 'f', 'plural'];

const generateIncompleteTable = (declension, adjective) => {
  const incompleteTable = [];
  cases.forEach((caseType) => {
    genders.forEach((gender) => {
      let article = '';
      if (declension === 'слабое скл.') {
        article = definiteArticles[gender][caseType];
      } else if (declension === 'смешанное скл.') {
        article = indefiniteArticles[gender][caseType];
      }
      incompleteTable.push({
        caseType,
        gender,
        correct: `${endings[declension][caseType][gender]}`,
        userInput: '',
        article,
        isCorrect: null,
        isChecked: false
      });
    });
  });
  return incompleteTable;
};

const AdjectiveDeclensionQuiz = () => {
  const [currentDeclension, setCurrentDeclension] = useState('');
  const [currentAdjective, setCurrentAdjective] = useState('');
  const [quizTable, setQuizTable] = useState([]);
  const [result, setResult] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const startQuiz = () => {
    const declension = getRandomElement(declensions);
    const adjective = getRandomElement(adjectives);
    setCurrentDeclension(declension);
    setCurrentAdjective(adjective);
    setQuizTable(generateIncompleteTable(declension, adjective));
    setResult(null);
    setShowHints(false); // Reset hints visibility
    setShowResults(false); // Reset results visibility
  };

  return (
    <div className="adjective-declension-quiz">
      <button onClick={startQuiz}>Новый вопрос с табличкой склонений</button>
      {currentDeclension && currentAdjective && (
        <div>
          <h3>Заполните таблицу склонений прилагательных ({currentDeclension})</h3>
          <p>Прилагательное: <b>{currentAdjective}</b></p>
          <button onClick={() => setShowHints(!showHints)}>
            {showHints ? 'Скрыть подсказки' : 'Показать подсказки'}
          </button>
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
                  {genders.map((gender) => {
                    const item = quizTable.find(
                      (cell) => cell.caseType === caseType && cell.gender === gender
                    );
                    return (
                      <td key={gender}>
                        {item.article} {currentAdjective}
                        <input
                          type="text"
                          value={item.userInput}
                          onChange={(e) =>
                            handleInputChange(
                              quizTable.indexOf(item),
                              e.target.value,
                              setQuizTable,
                              quizTable
                            )
                          }
                          placeholder={showHints ? item.correct : ''}
                          style={{
                            width: '20px',
                            color: item.userInput === '' ? 'grey' : showResults && item.isChecked ? (item.isCorrect ? 'green' : 'red') : 'black',
                            border: 'none',
                            borderBottom: '1px solid black',
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: '0',
                            margin: '0 2px',
                            padding: '0',
                            fontSize: 'inherit',
                            outline: 'none'
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => {
              const updatedTable = checkAnswers(quizTable, setResult, setShowResults);
              setQuizTable(updatedTable);
            }}>Проверить ответы</button>
            <button onClick={startQuiz}>Следующий вопрос</button>
          </div>
          {result && <p>{result}</p>}
        </div>
      )}
    </div>
  );
};

export default AdjectiveDeclensionQuiz;
