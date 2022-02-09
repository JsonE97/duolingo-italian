import React, { useState } from 'react';
import Loader from 'react-loader-spinner';

import { Bridge } from '../../lib/BridgeFunctions.js';

import './ParseContainer.scss';

export const ParseContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [nounsObtained, setNounsObtained] = useState({});
  const [verbsObtained, setVerbsObtained] = useState({});

  const onSubmit = () => {
    setIsLoading(!isLoading);
    Bridge.executeFunction('parse_input_text', { text: inputText }).then(res => {
      setIsLoading(false);
      setNounsObtained(res.result.nouns);
      setVerbsObtained(res.result.verbs);
    });
  }

  const getButtonText = () => {
    return (
      inputText === "" ?
        "Nothing to parse!"
        :
        isLoading ? "Parsing ..." : "Submit"
    );
  }

  const GenerateTokenEntryPane = (type, collection) => {
    return <div>
      <h3>{type + " collected"}</h3>
      <ul>
        {Object.keys(collection).map((k) => {
          return <li>{k + " - " + collection[k]}</li>
        })}
      </ul>
    </div>
  }

  const TokenResultsPane = () => {
    if (Object.keys(nounsObtained).length === 0 && Object.keys(verbsObtained).length === 0) return null;

    return (
      <div className="parser-tokens">
        {() => GenerateTokenEntryPane("Nouns", nounsObtained)}
        {() => GenerateTokenEntryPane("Verbs", verbsObtained)}
      </div>
    )
  }

  return (
    <div className="parser-container-frame">
      <h2>Enter text below:</h2>
      <textarea
        className="parser-container-entry"
        onChange={(e) => setInputText(e.target.value)}
        type="text"
        value={inputText}
      />
      <div className="parser-options">
        <div className="parser-options-content">
          <button
            disabled={isLoading || inputText === ""}
            onClick={onSubmit}
            className={`parser-options-button${inputText === "" ? " empty" : " submit"}`}
          >
            {() => getButtonText()}
          </button>
          {isLoading ?
            <div className="parser-options-spinner">
              <Loader
                type="Oval"
                height="25"
                width="25"
              />
            </div>
            :
            null
          }
        </div>
      </div>

      <TokenResultsPane />
    </div>
  )
}