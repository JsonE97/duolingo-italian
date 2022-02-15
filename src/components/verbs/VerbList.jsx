import React, { useState, useEffect } from 'react';

import './VerbList.scss';
import './VerbContainer.jsx';
import InfiniteScroll from 'react-infinite-scroller';
import { VerbContainer } from './VerbContainer.jsx';

export const VerbList = ({ verbData, filterData }) => {
  const [verbObjects, setVerbObjects] = useState([]);
  const [filteredVerbObjects, setFilteredVerbObjects] = useState([]);

  const moreVerbsExist = () => {
    return filteredVerbObjects.length !== verbObjects.length;
  }

  const loadFunc = () => {
    var newItems = verbObjects.slice(0, filteredVerbObjects.length + 4);
    setFilteredVerbObjects(newItems);
  }

  const convertVerbDataToContainer = () => {
    return Object.keys(verbData).map(k => {
      const specificData = verbData[k][filterData.mood][filterData.tense];
      if (specificData) {
        return <VerbContainer verbName={k} verbData={specificData} translation={verbData[k].Translation}></VerbContainer>
      } else {
        throw("unexpected error, no verb data found!");
      }
    })
  }

  useEffect(() => {
    const newVerbObjects = convertVerbDataToContainer();
    setVerbObjects(newVerbObjects);
    setFilteredVerbObjects(newVerbObjects.slice(0, 4));
  }, [verbData, filterData]);

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={moreVerbsExist()}
        loader={<div>loading...</div>}
      >
        {filteredVerbObjects}
      </InfiniteScroll>
    </div>
  )
}