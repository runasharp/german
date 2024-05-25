// quiz/utils.js
import { definiteArticles, indefiniteArticles, endings } from './rules';

export const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

export const getArticle = (word, caseType, declension, isPlural) => {
  if (declension === 'сильное скл.' && !isPlural) return '';
  const articles = declension === 'смешанное скл.' ? indefiniteArticles : definiteArticles;
  return articles[isPlural ? 'plural' : word.gender][caseType];
};

export const getEnding = (word, caseType, declension, isPlural) => {
  const gender = isPlural ? 'plural' : word.gender;
  return endings[declension][caseType][gender];
};

export const applyNDeclension = (word, caseType, isPlural) => {
  if (word.nDeclension) {
    if (isPlural) {
      return word.word; // Do nothing, already handled by plural
    } else if (caseType !== 'Nominativ') {
      return word.plural; // Use the plural form for singular Akkusativ, Genitiv, or Dativ
    }
  }
  return word.word;
};

export const applyDativePluralEnding = (word) => {
  const pluralEnding = word.plural.slice(-1);
  switch (pluralEnding) {
    case 'n':
      return word.plural; // No change if it already ends with "n"
    case 's':
      return word.plural; // No change if it ends with "s"
    case 'e':
      return `${word.plural}n`; // Add "n" if it ends with "e"
    default:
      return `${word.plural}n`; // Add "n" for other cases
  }
};

export const getCorrectAnswer = (word, adjective) => {
  const ending = getEnding(word, word.case, word.declension, word.isPlural);
  const adj = `${adjective}${ending}`;
  let noun = applyNDeclension(word, word.case, word.isPlural);

  if (word.case === 'Dativ' && word.isPlural) {
    noun = applyDativePluralEnding(word);
  }

  return word.template
    .replace('article', getArticle(word, word.case, word.declension, word.isPlural))
    .replace('(adjective ending)', adj)
    .replace(word.isPlural ? 'noun_plural' : 'noun', word.isPlural ? word.plural : noun);
};

export const handleInputChange = (index, value, setQuizTable, quizTable) => {
  const updatedTable = quizTable.map((item, i) => i === index ? { ...item, userInput: value } : item);
  setQuizTable(updatedTable);
};

export const checkAnswers = (quizTable, setResult, setShowResults) => {
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

  setResult(`${correctCount} aus ${totalCount} richtigen Antworten.`);
  setShowResults(true); // Show results after checking answers
  return updatedTable;
};