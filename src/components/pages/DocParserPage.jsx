import React from 'react';
import './DocParserPage.scss';
import { ParseContainer } from "../parser/ParseContainer.jsx";

export const DocParserPage = () => {
    // deprecating this feature for now
    return <p className="doc-parser-page-message">This feature is currently unavailable.</p>;
    return(
        <div className="div-doc-parser-page">
            <p className="doc-parser-page-message"> Enter text below in Italian and hit submit to grab the verbs and nouns
                from the text!
            </p>
            <div>
                <ParseContainer></ParseContainer>
            </div>
        </div>
    )
}