import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.scss';
import { VerbList } from './VerbList.jsx';
import IndicativeData from  './data/indicativo.json';

function App() {
  const [presentData, setPresentData] = useState(IndicativeData.PRESENTE);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Italian Verbs with Json</h1>
          <div className="container">
            <nav>
              <ul>
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/verbs">Verbs</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <Switch>
          <Route path="/verbs">
            <div className="App-current-page">
              <h2>Commonly used verbs</h2>
              <VerbList verbData={presentData}></VerbList>
            </div>
          </Route>
          <Route path="/">
            <></>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
