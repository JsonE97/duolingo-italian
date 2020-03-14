import React, { useState, useEffect } from 'react';
import MyButton from './MyButton';

export default function MyDivTest({hidden, myFunc, myUnHideFunc}) {
    return (
    <div>
        <div hidden={hidden}>
            <MyButton></MyButton>
        </div>

        <button onClick={() => myFunc()}>Hide</button>
        <button onClick={() => myUnHideFunc()}>UnHide</button>
    </div>
    )
}