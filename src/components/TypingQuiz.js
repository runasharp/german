import React, { useState, useRef, useEffect } from 'react';
import './TypingQuiz.css';

const TypingQuiz = () => {
  const [userInput, setUserInput] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const inputRef = useRef(null);

  const sentences = [
    "Herr Dr. Mustermann Musterkrankenhaus",
    "Musterstraße X Musterstraße X, XXXXX Musterstadt XXXXX Musterstadt",
    "Prüfungsort, XX. Monat Jahr",
    "Sehr geehrter Herr Dr. Mustermann,",
    "wir berichten Ihnen über Frau Muster Musterfrau, geboren am XX. Monat Jahr, wohnhaft in der Musterstraße X, XXXXX Musterstadt, die sich vom XX.XX. bis zum XX.XX.XXXX in unserer stationären Behandlung befand.",
    "Diagnosen:",
    "Herzinsuffizienz NYHA-Stadium 3",
    "Arterielle Hypertonie",
    "Diabetes mellitus Typ 2",
    "Hypercholesterinämie",
    "Anamnese:",
    "Frau Muster Musterfrau stellte sich am XX.XX.XXXX in unserer Notaufnahme mit einer seit 4 Tagen bestehenden Luftnot bei Belastung und einem Beklemmungsgefühl in der Brust vor.",
    "Sie gab an, dass ihre Beine seit mehreren Wochen dicker geworden seien und sie seit ein paar Tagen nicht mehr ihre Schuhe anziehen könne.",
    "An Vorerkrankungen leide sie an einer arteriellen Hypertonie und an einem Diabetes mellitus Typ 2.",
    "Im Kindesalter seien eine Operation eines Leistenbruchs rechts, vor 40 Jahren eine Gallenblasenentfernung und vor 13 Jahren eine Appendektomie durchgeführt worden.",
    "Im Rahmen der Blinddarmentzündung sei eine Bauchfellentzündung aufgetreten.",
    "Die Patientin nehme täglich Ramipril 2,5 mg 1-0-0, Amlodipin 5 mg 1-0-0, Metformin 1000 1-0-0 und Simvastatin 20 mg 0-0-1 ein.",
    "In der vegetativen Anamnese wurde eine Nykturie bis 4-mal pro Nacht und Schlafstörungen wegen einer Orthopnoe angegeben.",
    "Allergien wurden verneint.",
    "Sie hörte vor 23 Jahren mit dem Rauchen auf.",
    "Ein Alkohol- sowie Drogenkonsum wurde verneint.",
    "In der Familienanamnese fanden sich bei der Mutter, bei der Schwester sowie bei den Kindern ein zu hoher Blutdruck und bei dem Vater ein Schlaganfall.",
    "Die Eltern und die Schwester des Patienten seien verstorben.",
    "Soziale Anamnese:",
    "Sie sei Rentnerin, verwitwet und habe 2 Kinder.",
    "Sie wohne in einer Wohnung im 2. Stock.",
    "Untersuchungsbefunde:",
    "Frau Muster Musterfrau, eine XX-jährige Patientin, war in leicht reduziertem Allgemeinzustand und normalem Ernährungszustand.",
    "Zu Ort, Zeit und Person war sie orientiert.",
    "Der arterielle Blutdruck und die Herzfrequenz waren unauffällig.",
    "Die Herztöne waren rein.",
    "In der Lunge hörte man Rasselgeräusche beidseits.",
    "Das Abdomen war unauffällig.",
    "Sie hatte Beinödeme beidseits.",
    "Epikrise:",
    "Die stationäre Aufnahme erfolgte mit dem Verdacht auf eine Herzinsuffizienz.",
    "Röntgenologisch ließen sich ein beidseits verbreitertes Herz und Stauungszeichen in der Lunge nachweisen.",
    "In der Echokardiografie zeigte sich eine eingeschränkte Funktion des linken Ventrikels.",
    "In den Laborwerten waren ein erhöhter Blutzuckerwert, ein erhöhtes HbA1c und mäßig erhöhte Blutwerte auffällig.",
    "Die Nierenwerte und Elektrolyte waren grenzwertig noch im Normbereich.",
    "Wir leiteten eine diuretische Therapie mit Furosemid intravenös ein.",
    "Darunter kam es zu einer Besserung der Symptomatik.",
    "Die Patientin wurde dauerhaft auf Torasemid 20 mg oral eingestellt.",
    "Wir entließen die Patientin in Ihre ambulante Betreuung und bitten um regelmäßige Kontrollen des Blutdrucks und der Laborwerte.",
    "Stand: April 2024",
    "Medikation bei Entlassung:",
    "Torasemid 20 mg 1-0-0 und",
    "Fortsetzung der Hausmedikation.",
    "Wir bitten um die weitere Betreuung der Patientin und verbleiben mit freundlichen Grüßen",
    "Chefarzt Oberärztin Prüfling",
  ];

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setUserInput(value);

    if (value === sentences[currentSentenceIndex]) {
      setUserInput('');
      setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }
  };

  const handleSentenceChange = (index) => {
    setCurrentSentenceIndex(index);
    setUserInput(''); // Reset user input when changing sentences
  };

  const getStyledText = () => {
    const sentence = sentences[currentSentenceIndex];
    const splitSentence = sentence.split('');

    return splitSentence.map((char, index) => {
      let style = {};
      if (index < userInput.length) {
        style.color = userInput[index] === char ? 'black' : 'red';
      } else if (index === userInput.length) {
        style.backgroundColor = 'blue';
        style.color = 'white'; // Ensure the text color is readable against the blue background
      } else {
        style.color = 'grey';
      }

      return (
        <span key={index} style={style}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-quiz" onClick={() => inputRef.current.focus()}>
      <div>
        <h2>Выбрать предложение:</h2>
        <ul style={{ maxHeight: '100px', overflowY: 'scroll', padding: '0', listStyleType: 'none', border: '1px solid #ccc' }}>
          {sentences.map((sentence, index) => (
            <li
              key={index}
              onClick={() => handleSentenceChange(index)}
              style={{
                cursor: 'pointer',
                padding: '5px',
                backgroundColor: currentSentenceIndex === index ? 'lightblue' : 'white',
                color: currentSentenceIndex === index ? 'blue' : 'black'
              }}
            >
              {sentence}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-container">{getStyledText()}</div>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleChange}
        className="hidden-input"
        autoFocus
      />
    </div>
  );
};

export default TypingQuiz;