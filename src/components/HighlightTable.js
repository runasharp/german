import React from 'react';
import { endings, definiteArticles, indefiniteArticles } from './quiz/rules'; // Adjust the import path as needed

const cases = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'];
const genders = ['m', 'n', 'f', 'plural'];

const generateEndingsData = (adjective) => {
  const data = {};
  Object.keys(endings).forEach((declension) => {
    data[declension] = {};
    cases.forEach((caseType) => {
      data[declension][caseType] = genders.map((gender) => {
        let article = '';
        if (declension === 'слабое скл.') {
          article = definiteArticles[gender][caseType];
        } else if (declension === 'смешанное скл.') {
          article = indefiniteArticles[gender][caseType];
        }
        const ending = endings[declension][caseType][gender];
        return {
          fullForm: `${article} ${adjective}${ending}`,
          ending,
          base: article ? `${article} ${adjective}` : adjective
        };
      });
    });
  });
  return data;
};

const HighlightTable = ({ adjective, highlightEnding, declensions, selectedCase, selectedGender }) => {
  const endingsData = generateEndingsData(adjective);

  const shouldHighlight = (ending) => {
    if (Array.isArray(highlightEnding)) {
      return highlightEnding.includes(ending);
    }
    return ending.endsWith(highlightEnding);
  };

  return (
    <div>
      {declensions.map((dec) => (
        <table key={dec}>
          <thead>
            <tr>
              <th>{dec}</th>
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
                {genders.map((gender, index) => {
                  const { base, ending } = endingsData[dec][caseType][index];
                  const highlighted = shouldHighlight(ending) && (selectedGender === gender || selectedGender === 'all') && (selectedCase === caseType || selectedCase === 'all');
                  return (
                    <td
                      key={index}
                      style={{
                        backgroundColor: highlighted ? 'yellow' : 'transparent',
                      }}
                    >
                      <span style={{ color: 'black' }}>
                        {base}<b style={{ color: 'red' }}>{ending}</b>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default HighlightTable;