import React, { useState, useEffect } from 'react';

import './VerbList.scss';
import './VerbContainer.jsx';
import InfiniteScroll from 'react-infinite-scroller';
import { VerbContainer } from './VerbContainer.jsx';

export const VerbList = ({ verbData }) => {
    const [verbObjects, setVerbObjects] = useState([]);
    const [filteredVerbObjects, setFilteredVerbObjects] = useState([]);

    const moreVerbsExist = () => {
        return filteredVerbObjects.length !== verbObjects.length;
    }

    const loadFunc = () => {
        var newItems = verbObjects.slice(0, filteredVerbObjects.length + 4);
        setFilteredVerbObjects(newItems);
    }

    useEffect(() => {
        const newVerbObjects = Object.keys(verbData).map(k => <VerbContainer verbName={k} verbData={verbData[k]}></VerbContainer>)
        setVerbObjects(newVerbObjects);
        setFilteredVerbObjects(newVerbObjects.slice(0, 4));
    }, [verbData]);

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