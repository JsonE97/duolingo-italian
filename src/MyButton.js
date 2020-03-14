import React, { useState } from 'react';

export default function MyButton() {
    return(
        <div>
            <input type="checkbox" onChange={() => alert()}></input>
        </div>
    )
}