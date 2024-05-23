import React from 'react';

const WeakDeclension = ({ adjective }) => {
  return (
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
        <tr>
          <td>Nominativ</td>
          <td>{adjective}<span style={{ color: 'red' }}>e</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>e</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>e</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
        </tr>
        <tr>
          <td>Akkusativ</td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>e</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>e</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
        </tr>
        <tr>
          <td>Dativ</td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
        </tr>
        <tr>
          <td>Genitiv</td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
          <td>{adjective}<span style={{ color: 'red' }}>en</span></td>
        </tr>
      </tbody>
    </table>
  );
};

export default WeakDeclension;