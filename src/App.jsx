import React, { useState } from 'react';
import './App.scss';
import { VerbList } from './VerbList.jsx';
import IndicativeData from  './data/indicativo.json';

function App() {
  const [presentData, setPresentData] = useState(IndicativeData.PRESENTE);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Italian Verbs with Json</h1>
      </header>

      <div className="App-current-page">
        <h2>Some common verbs</h2>
        <VerbList verbData={presentData}></VerbList>
      </div>
    </div>
  );
}

export default App;
