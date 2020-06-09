import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.scss';

import IndicativeData from  './data/indicativo.json';
import { executeFunction } from './lib/BridgeFunctions.jsx';
import { VerbsPage } from './VerbsPage';
import { DocParserPage } from './DocParserPage';

function App() {

  // useEffect(() => {
  //   console.log(typeof executeFunction('time'));
  //   // executeFunction('/time').then(res => {
  //   //   console.log(res);
  //   // });
  // }, [])

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
                <li><Link className="nav-link" to="/parser">Document Parser</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="div-page-container">
          <Switch>
            <Route path="/verbs">
              <VerbsPage verbData={presentData}></VerbsPage>
            </Route>
            <Route path="/parser">
              <DocParserPage></DocParserPage>
            </Route>
            <Route path="/">
              <></>
            </Route>
          </Switch>
        </div>

      </div>
    </Router>
  );
}

export default App;
