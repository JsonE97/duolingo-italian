import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.scss';

import allITVerbData from './data/italianVerbData.json';

import { VerbsPage } from './VerbsPage';
import { DocParserPage } from './DocParserPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Italian Verbs with Json</h1>
          <div className="container">
            <nav>
              <ul>
                <li><Link className="nav-link" to="/flashcards">Flashcards</Link></li>
                <li><Link className="nav-link" to="/verbs">Verbs</Link></li>
                <li><Link className="nav-link" to="/parser">Document Parser</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="div-page-container">
          <Switch>
            <Route path="/verbs">
              <VerbsPage verbData={allITVerbData}></VerbsPage>
            </Route>
            <Route path="/parser">
              <DocParserPage></DocParserPage>
            </Route>
            <Route path="/flashcards">
            </Route>
          </Switch>
        </div>

      </div>
    </Router>
  );
}

export default App;
