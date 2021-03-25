import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import './App.scss';

import allITVerbData from './data/italianVerbData.json';

import { VerbsPage } from './VerbsPage';
import { DocParserPage } from './DocParserPage';

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <header className="App-header">
          <h1>Italian Verbs with Json</h1>
          <div className="container">
            <nav>
              <ul>
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/flashcards">Flashcards</Link></li>
                <li><Link className="nav-link" to="/verbs">Verbs</Link></li>
                <li><Link className="nav-link" to="/parser">Parser</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="div-page-container">
          <Route exact path="/" />
          <Route exact path="/verbs" render={() => (<VerbsPage verbData={allITVerbData}></VerbsPage>)} />
          <Route exact path="/parser" component={() => (<DocParserPage></DocParserPage>)} />
          <Route exact path="/flashcards" />
        </div>

      </div>
    </HashRouter>
  );
}

export default App;
