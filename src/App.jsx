import React, { useEffect, useState } from 'react';
import './App.scss';
import { VerbContainer } from './VerbContainer.jsx';
import { VerbList } from './VerbList.jsx';
import IndicativeData from  './data/indicativo.json';

function App() {
  const [presentData, setPresentData] = useState(IndicativeData.PRESENTE);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Some common verbs</h1>
      </header>

      <div>
        <VerbList verbData={presentData}></VerbList>
      </div>
    </div>
  );
}

export default App;
