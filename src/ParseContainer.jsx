import React from 'react';
import './ParseContainer.scss';

export const ParseContainer = () => {
    return (
        <div className="parser-container-frame">
            <h2>Enter text below:</h2>
            <textarea className="parser-container-entry" type="text"></textarea>
            <div className="parser-options">
                <button>Submit</button>
            </div>
        </div>
    )
}