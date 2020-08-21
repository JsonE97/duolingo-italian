import React, { useState, useEffect } from 'react';

import { VerbList } from './VerbList.jsx';
import "./VerbsPage.scss";

export const VerbsPage = ({verbData}) => {
    const [inputVerb, setInputVerb] = useState("");
    const [filteredVerbs, setFilteredVerbs] = useState({});

    useEffect(() => {
        if(inputVerb.length === 0){
            setFilteredVerbs({});
        }else{
            const allKeys = Object.keys(verbData);
            const resultantVerbs = allKeys.filter(v => v.startsWith(inputVerb.toUpperCase()));
            const filtered = {};
            resultantVerbs.forEach(v => {
                filtered[v] = verbData[v];
            })
            setFilteredVerbs(filtered);
        }
    }, [inputVerb]);

    return (
        <div className="App-current-page">
            <h2>Commonly used verbs</h2>
            <div className="App-verb-search">
                <label>Search for verb:</label>
                <input type="text" value={inputVerb} onChange={event => setInputVerb(event.target.value)}></input>
            </div>
            <VerbList
                verbData={Object.keys(filteredVerbs).length === 0 || filteredVerbs === undefined || filteredVerbs === null ?
                            verbData
                            :
                            filteredVerbs
                            }
            >

            </VerbList>
        </div>
    )
}