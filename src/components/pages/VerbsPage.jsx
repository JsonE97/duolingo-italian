import React, { useState, useEffect, useCallback } from 'react';

import { VerbList } from '../verbs/VerbList.jsx';
import { Dropdown } from '../common/Dropdown.jsx';

import { ITVerbModel, MOODS, TENSES } from '../../model/ITVerbModel.js';

import "./VerbsPage.scss";

const allITMoods = ITVerbModel.getAllMoods();

export const VerbsPage = ({ verbData }) => {
  const [inputVerb, setInputVerb] = useState("");
  const [filteredVerbs, setFilteredVerbs] = useState({});

  const initialTense = ITVerbModel.getTensesForMood(allITMoods.INDICATIVO)[0];
  const [filterData, setFilterData] = useState({ mood: allITMoods.INDICATIVO, tense: initialTense })
  const [currentTensesForMood, setCurrentTensesForMood] = useState(ITVerbModel.getTensesForMood(allITMoods.INDICATIVO));

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
    return Object.values(ITVerbModel.getAllMoods()).map((label) => Object.assign({}, { label, label }));
  }

  const prepareTensesForDropdown = () => {
    return currentTensesForMood.map(tense => Object.assign({}, { value: tense, label: tense }));
  }

  const onMoodChanged = useCallback((mood) => {
    const newTensesForMood = ITVerbModel.getTensesForMood(mood);
    setCurrentTensesForMood(newTensesForMood);
    setFilterData(Object.assign({}, { mood: mood, tense: newTensesForMood[0] }))
  }, [filterData]);

  const onTenseChanged = useCallback((tense) => {
    setFilterData(Object.assign({}, { mood: filterData.mood, tense: tense }));
  }, [filterData])

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
          onChange={onMoodChanged}
        />
        <Dropdown
          category="Tenses"
          defaultText="Select tense:"
          options={prepareTensesForDropdown()}
          onChange={onTenseChanged}
        />
      </div>
      <VerbList
        verbData={!filteredVerbs || Object.keys(filteredVerbs).length === 0 ?
          verbData
          :
          filteredVerbs
        }
        filterData={filterData}
      >

      </VerbList>
    </div>
  )
}