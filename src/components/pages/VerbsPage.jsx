import React, { useState, useEffect } from 'react';

import { VerbList } from '../verbs/VerbList.jsx';
import { Dropdown } from '../common/Dropdown.jsx';

import { ITVerbModel } from '../../model/ITVerbModel.js';

import "./VerbsPage.scss";

export const VerbsPage = ({ verbData }) => {
  const [inputVerb, setInputVerb] = useState("");
  const [filteredVerbs, setFilteredVerbs] = useState({});
  console.log(verbData);

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
  }, [inputVerb, verbData]);

  const prepareMoodsForDropdown = () => {
    return Object.entries(ITVerbModel.getAllMoods()).map(([value, label]) => Object.assign({}, { value, label }));
  }

  return (
    <div className="verbs-page">
      <p>This page shows commonly used verbs!
        You can use the search bar to search for a specfic verb.
      </p>
      <div className="App-verb-search">
        <label>Search for verb:</label>
        <input type="text" value={inputVerb} onChange={event => setInputVerb(event.target.value)}></input>
      </div>

      <div className="App-verb-filter">
        <Dropdown
          category="Moods"
          defaultText="Select mood:"
          options={prepareMoodsForDropdown()}
          onChange={alert}
        />
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