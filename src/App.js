import './App.css';

import Weather from './components/weather/weather';
import Swap from './components/swap/swap';

import React, { useState } from 'react';

function App() {
    
    const [unit, setUnit] = useState('C');

    function switchUnit() {
        if (unit === 'C') {
            setUnit('F');
        } else if (unit === 'F') {
            setUnit('C');
        }
        return unit;
    };
    
  return (
    <div className="app">
      <Weather unit={unit} switchUnit={switchUnit} />
      <Swap unit={unit} switchUnit={switchUnit} />
    </div>
  );
}

export default App;
