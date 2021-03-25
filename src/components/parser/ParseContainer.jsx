import React, { useState, useEffect } from 'react';
import './ParseContainer.scss';
import Loader from 'react-loader-spinner';
import { executeFunction } from '../../lib/BridgeFunctions.jsx';

export const ParseContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [inputText, setInputText] = useState("");
    const [nounsObtained, setNounsObtained] = useState({});
    const [verbsObtained, setVerbsObtained] = useState({});

    const onSubmit = () => {
        setIsLoading(!isLoading);
        executeFunction('parse_input_text', { text: inputText }).then(res => {
            setIsLoading(false);
            setNounsObtained(res.nouns);
            setVerbsObtained(res.verbs);
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
                <button disabled={isLoading || inputText === ""} onClick={() => onSubmit()}>{isLoading ? "Parsing ..." : "Submit"}</button>
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
            {Object.keys(nounsObtained).length !== 0 || Object.keys(verbsObtained).length !== 0 ?
                <div className="parser-tokens">
                    <div>
                        <h3>Nouns collected</h3>
                        <ul>
                            {Object.keys(nounsObtained).map((k) => {
                                return <li>{k + "-" + nounsObtained[k]}</li>
                            })}
                        </ul>
                    </div>

                    <div>
                        <h3>Verbs collected</h3>
                        <ul>
                            {Object.keys(verbsObtained).map((k) => {
                                return <li>{k + "-" + verbsObtained[k]}</li>
                            })}
                        </ul>
                    </div>
                </div>

                :

                <>
                </>
            }
        </div>
    )
}