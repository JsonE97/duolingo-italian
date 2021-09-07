import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import './App.scss';

import allITVerbData from '../data/italianVerbData.json';

import { VerbsPage } from './pages/VerbsPage';
import { DocParserPage } from './pages/DocParserPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { HomePage } from './pages/HomePage';

import Flags from 'country-flag-icons/react/3x2'

function App() {
  const allVerbData = allITVerbData;

  return (
    <HashRouter basename="/">
      <div className="App">
        <header className="App-header">
          <div className="div-top-header">
            <Flags.RU title="Russia" className="flag-site-language" />
            <h1 className="h-site-header">Language learning with Json</h1>
          </div>
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

        <div className="div-page-wrapper">
          <div className="div-page-container">
            <Route exact path="/" component={() => (<HomePage></HomePage>)} />
            <Route exact path="/verbs" component={() => (<VerbsPage verbData={allVerbData}></VerbsPage>)} />
            <Route exact path="/parser" component={() => (<DocParserPage></DocParserPage>)} />
            <Route exact path="/flashcards" component={() => (<FlashcardsPage></FlashcardsPage>)} />
          </div>
        </div>

      </div>
    </HashRouter>
  );
}

export default App;
