import React from 'react';
import './DocParserPage.scss';
import { ParseContainer } from "../parser/ParseContainer.jsx";

// disabing this feature for now due to backend problems
const FEATURE_ENABLED = false;

const FEATURE_DISABLED_MESSAGE = "This feature is currently unavailable.";
const FEATURE_ENABLED_MESSAGE = "Enter text below in Italian and hit submit to grab the verbs and nouns from the text!";

export const DocParserPage = () => {
  return (
    <div className="div-doc-parser-page">
      <p>{FEATURE_ENABLED ? FEATURE_ENABLED_MESSAGE : FEATURE_DISABLED_MESSAGE}</p>
      {FEATURE_ENABLED ? <ParseContainer /> : null}
    </div>
  )
}