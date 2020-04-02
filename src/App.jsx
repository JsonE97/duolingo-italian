import React, { useEffect, useState } from 'react';
import './App.scss';
import { VerbContainer } from './VerbContainer.jsx';
import IndicativeData from  './data/indicativo.json';

function App() {
  const [presentData, setPresentData] = useState([]);

  const getInitialData = () => {
    const present = IndicativeData.PRESENTE;
    setPresentData(present.ACCETTARE.split(","));
  }

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Some common verbs</h1>
        <VerbContainer verbData={presentData}></VerbContainer>
      </header>
    </div>
  );
}

export default App;
