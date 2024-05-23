import React, { useState } from 'react';
import HighlightTable from './HighlightTable';

const explanations = [
  {
    text: 'В слабом склонении все окончания либо "e", либо "en" во всех родах.',
    highlightEnding: ['e'],
    declensions: ['слабое скл.'],
    selectedCase: 'all',
    selectedGender: 'all'
  },
  {
    text: 'В смешанном склонении всё почти так же, как в слабом, только есть es, e, er.',
    highlightEnding: ['e', 'es', 'er'], 
    declensions: ['смешанное скл.'],
    selectedCase: 'all',
    selectedGender: 'all'
  },
  {
    text: 'Во всех склонениях, в Akkusativ для Maskulin это "en".',
    highlightEnding: 'en',
    declensions: ['слабое скл.', 'смешанное скл.', 'сильное скл.'],
    selectedCase: 'Akkusativ',
    selectedGender: 'm'
  },
  {
    text: 'В слабом и смешанном склонениях, все окончания в Plural это "en".',
    highlightEnding: 'en',
    declensions: ['слабое скл.', 'смешанное скл.'],
    selectedCase: 'all',
    selectedGender: 'plural'
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { text, highlightEnding, declensions, selectedCase, selectedGender } = explanations[currentIndex];

  const nextExplanation = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % explanations.length);
  };

  const prevExplanation = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + explanations.length) % explanations.length);
  };

  return (
    <div>
      <p>{text}</p>
      <HighlightTable
        adjective="schön"
        highlightEnding={highlightEnding}
        declensions={declensions}
        selectedCase={selectedCase}
        selectedGender={selectedGender}
      />
      <div>
        <button onClick={prevExplanation}>Предыдущий</button>
        <button onClick={nextExplanation}>Следующий</button>
      </div>
    </div>
  );
};

export default Carousel;