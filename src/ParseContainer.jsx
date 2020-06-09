import React, { useState } from 'react';
import './ParseContainer.scss';
import Loader from 'react-loader-spinner';
import { executeFunction } from './lib/BridgeFunctions.jsx';

export const ParseContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [inputText, setInputText] = useState("");

    const onSubmit = () => {
        setIsLoading(!isLoading);
        executeFunction('parseText', inputText).then(res => {
            console.log(res);
        });
    }

    const onTextEntered = (text) => {
        setInputText(text);
    }

    return (
        <div className="parser-container-frame">
            <h2>Enter text below:</h2>
            <textarea className="parser-container-entry" onChange={(e) => onTextEntered(e.target.value)} type="text" value={inputText}></textarea>
            <div className="parser-options">
                <button disabled={isLoading} onClick={() => onSubmit()}>{isLoading ? "Parsing ..." : "Submit"}</button>
                <div className="parser-loading-spinner">
                    {isLoading ?
                        <Loader
                            type="Oval"
                            height="30"
                            width="30"
                        >
                        </Loader>
                        :
                        <>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}