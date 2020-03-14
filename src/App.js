import React, { useState } from 'react';
import './css/App.css';
import MyDivTest from './MyDivTest';

function App() {

  const [hidden, setHidden] = useState(false);

  const myFunc = () => {
    setHidden(true);
  };

  const myUnHideFunc = () => {
    setHidden(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Duolingo Online
        </p>

        <MyDivTest hidden={hidden} myFunc={myFunc} myUnHideFunc={myUnHideFunc}></MyDivTest>
      </header>
    </div>
  );
}

export default App;
