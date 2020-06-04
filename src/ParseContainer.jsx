import React, { useState } from 'react';
import './ParseContainer.scss';
import Loader from 'react-loader-spinner';

export const ParseContainer = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setIsLoading(! isLoading);
    }

    return (
        <div className="parser-container-frame">
            <h2>Enter text below:</h2>
            <textarea className="parser-container-entry" type="text"></textarea>
            <div className="parser-options">
                <button onClick={() => onSubmit()}>Submit</button>
                <div className="parser-loading-spinner">
                    {isLoading ?
                        <Loader
                            type="Oval"
                            height="30"
                            width="30"
                        >

                        </Loader>
                    :
                    <>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}