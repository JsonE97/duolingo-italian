import React from 'react';
import './DocParserPage.scss';
import { ParseContainer } from "./ParseContainer.jsx";

export const DocParserPage = () => {
    return(
        <div>
            <p><strong>Notice</strong> - This tool only supports textual paste for the moment. Try again later for
                parsing html links to documents.
            </p>
            <div>
                <ParseContainer></ParseContainer>
            </div>
        </div>
    )
}