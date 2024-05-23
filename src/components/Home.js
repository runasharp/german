import React from 'react';
import WeakDeclension from './WeakDeclension';
import MixedDeclension from './MixedDeclension';
import StrongDeclension from './StrongDeclension';

const Home = ({ adjective, handleAdjectiveChange }) => {
  return (
    <div>
      <div>
        <label>
          Введите прилагательное: 
          <input type="text" value={adjective} onChange={handleAdjectiveChange} />
        </label>
      </div>
      <section>
        <h2>Слабое склонение (der/die/das/die)</h2>
        <WeakDeclension adjective={adjective} />
      </section>
      <section>
        <h2>Смешанное склонение (ein/ein/eine/-)</h2>
        <MixedDeclension adjective={adjective} />
      </section>
      <section>
        <h2>Сильное склонение (без артикля)</h2>
        <StrongDeclension adjective={adjective} />
      </section>
    </div>
  );
};

export default Home;