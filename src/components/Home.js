import React, { useState } from 'react';
import WeakDeclension from './WeakDeclension';
import MixedDeclension from './MixedDeclension';
import StrongDeclension from './StrongDeclension';
import AdjectiveDeclensionQuiz from './AdjectiveDeclensionQuiz';
import Carousel from './Carousel';
import './styles.css';

const Toggle = ({ label, isOpen, onToggle, children }) => {
  return (
    <div className="toggle-container">
      <div className="toggle-header" onClick={onToggle}>
        <span className={`toggle-icon ${isOpen ? 'open' : ''}`}>▶</span>
        <span className="toggle-label">{label}</span>
      </div>
      {isOpen && <div className="toggle-content">{children}</div>}
    </div>
  );
};

const Home = () => {
  const [showWeakInfo, setShowWeakInfo] = useState(false);
  const [showMixedInfo, setShowMixedInfo] = useState(false);
  const [showStrongInfo, setShowStrongInfo] = useState(false);

  return (
    <div>
      <section>
        <Toggle label="Слабое склонение (der/die/das/die)" isOpen={showWeakInfo} onToggle={() => setShowWeakInfo(!showWeakInfo)}>
          <p>
            Слабое склонение прилагательных используется после определенного артикля или указательных местоимений, таких как “dieser” (этот), “jener” (тот), “jeder” (каждый), “welcher” (какой), “alle” (все), “mancher” (некоторый).
          </p>
        </Toggle>
        <WeakDeclension adjective="schön" />
      </section>
      <section>
        <Toggle label="Смешанное склонение (ein/ein/eine/-)" isOpen={showMixedInfo} onToggle={() => setShowMixedInfo(!showMixedInfo)}>
          <p>
            Смешанное склонение прилагательных используется после неопределенного артикля, отрицательных местоимений “kein” (никакой) или притяжательных местоимений, таких как “mein” (мой), “dein” (твой), “sein” (его), “ihr” (ее), “unser” (наш), “euer” (ваш).
          </p>
        </Toggle>
        <MixedDeclension adjective="schön" />
      </section>
      <section>
        <Toggle label="Сильное склонение (без артикля)" isOpen={showStrongInfo} onToggle={() => setShowStrongInfo(!showStrongInfo)}>
          <p>
            Сильное склонение прилагательных используется, когда нет артикля или после слов, таких как "viel" (много), "wenig" (мало), "mehrere" (несколько), "einige" (некоторые), "ein bisschen" (немного), "ein paar" (несколько).
          </p>
        </Toggle>
        <StrongDeclension adjective="schön" />
      </section>
      <section>
      </section>
      <section>
        <h2>Объяснение склонений прилагательных</h2>
        <Carousel />
      </section>
    </div>
  );
};

export default Home;