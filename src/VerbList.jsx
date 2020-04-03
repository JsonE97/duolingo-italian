import React, { useState } from 'react';

import './VerbList.scss';
import './VerbContainer.jsx';
import InfiniteScroll from 'react-infinite-scroller';
import { VerbContainer } from './VerbContainer.jsx';

export const VerbList = ({verbData}) => {
    const verbObjects = Object.keys(verbData).map(k => <VerbContainer verbData={verbData[k]}></VerbContainer>)
    const [items, setItems] = useState(verbObjects.slice(0,4));

    const loadMoreItemsPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(verbObjects.slice(0, items.length + 4)), 1000);
    });

    const moreVerbsExist = () => {
        return items.length !== verbObjects.length;
    }

    const loadFunc = () => {
        loadMoreItemsPromise.then(newItems => {
            setItems(newItems);
        });
    }

    return (
        <div>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                hasMore={moreVerbsExist()}
                loader={<div>loading...</div>}
            >
                {items}
            </InfiniteScroll>
        </div>
    )
}