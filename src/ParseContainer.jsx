import React from 'react';
import './ParseContainer.scss';

export const ParseContainer = () => {
    return (
        <div className="parser-container-frame">
            <h2>Enter text below:</h2>

            <input className="parser-container-entry" type="text"></input>
        </div>
    )
}