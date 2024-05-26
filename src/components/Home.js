import React, { useState } from 'react';
import WeakDeclension from './WeakDeclension';
import MixedDeclension from './MixedDeclension';
import StrongDeclension from './StrongDeclension';
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
  const [showWeakInfo, setShowWeakInfo] = useState(true);
  const [showMixedInfo, setShowMixedInfo] = useState(true);
  const [showStrongInfo, setShowStrongInfo] = useState(true);
  const [adjective, setAdjective] = useState('schön');

  const handleAdjectiveChange = (event) => {
    setAdjective(event.target.value);
  };

  return (
    <div>
      <div>
        <label>
          Введите прилагательное: 
          <input type="text" value={adjective} onChange={handleAdjectiveChange} />
        </label>
      </div>
      <section>
        <Toggle label="Слабое склонение (der/die/das/die)" isOpen={showWeakInfo} onToggle={() => setShowWeakInfo(!showWeakInfo)}>
          <p>
            Слабое склонение прилагательных используется после определенного артикля или указательных местоимений, таких как “dieser” (этот), “jener” (тот), “jeder” (каждый), “welcher” (какой), “alle” (все), “mancher” (некоторый).
          </p>
          <WeakDeclension adjective={adjective} />
        </Toggle>
      </section>
      <section>
        <Toggle label="Смешанное склонение (ein/ein/eine/-)" isOpen={showMixedInfo} onToggle={() => setShowMixedInfo(!showMixedInfo)}>
          <p>
            Смешанное склонение прилагательных используется после неопределенного артикля, отрицательных местоимений “kein” (никакой) или притяжательных местоимений, таких как “mein” (мой), “dein” (твой), “sein” (его), “ihr” (ее), “unser” (наш), “euer” (ваш).
          </p>
          <MixedDeclension adjective={adjective} />
        </Toggle>
      </section>
      <section>
        <Toggle label="Сильное склонение (без артикля)" isOpen={showStrongInfo} onToggle={() => setShowStrongInfo(!showStrongInfo)}>
          <p>
            Сильное склонение прилагательных используется, когда нет артикля или после слов, таких как "viel" (много), "wenig" (мало), "mehrere" (несколько), "einige" (некоторые), "ein bisschen" (немного), "ein paar" (несколько).
          </p>
          <StrongDeclension adjective={adjective} />
        </Toggle>
      </section>
    </div>
  );
};

export default Home;
