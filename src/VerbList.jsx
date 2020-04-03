import React from 'react';

import './VerbList.scss';
import './VerbContainer.jsx';
import { VerbContainer } from './VerbContainer.jsx';

export const VerbList = ({verbData}) => {
    console.log(Object.keys(verbData));
    return (
        <div>
            {Object.keys(verbData).map(k => {
                return <VerbContainer verbData={verbData[k]}></VerbContainer>
            })}
        </div>
    )
}