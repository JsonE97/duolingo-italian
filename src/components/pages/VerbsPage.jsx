import React, { useState, useEffect } from 'react';

import { VerbList } from '../verbs/VerbList.jsx';
import "./VerbsPage.scss";

export const VerbsPage = ({ verbData }) => {
    const [inputVerb, setInputVerb] = useState("");
    const [filteredVerbs, setFilteredVerbs] = useState({});

    useEffect(() => {
        if (inputVerb.length === 0) {
            setFilteredVerbs({});
        } else {
            const allVerbs = Object.keys(verbData);

            const filtered = {};
            allVerbs.forEach(v => {
                if (v.toUpperCase().startsWith(inputVerb.toUpperCase()) ||
                    verbData[v].Translation.toUpperCase().startsWith(inputVerb.toUpperCase())) {
                    filtered[v] = verbData[v];
                }
            })
            setFilteredVerbs(filtered);
        }
    }, [inputVerb]);

    return (
        <div className="App-current-page">
            <h3>Commonly used verbs</h3>
            <div className="App-verb-search">
                <label>Search for verb:</label>
                <input type="text" value={inputVerb} onChange={event => setInputVerb(event.target.value)}></input>
            </div>
            <VerbList
                verbData={!filteredVerbs || Object.keys(filteredVerbs).length === 0 ?
                    verbData
                    :
                    filteredVerbs
                }
            >

            </VerbList>
        </div>
    )
}