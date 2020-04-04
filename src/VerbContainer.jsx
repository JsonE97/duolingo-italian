import React, { useEffect, useState } from 'react';
import './VerbContainer.scss';

export const VerbContainer = ({verbData}) => {
    const [componentData, setComponentData] = useState({});

    useEffect(() => {
        if(verbData !== undefined && verbData !== null){
            const arrayData = verbData.split(";");

            const newData = {};
            newData.engVerb = arrayData[0];
            newData.itVerb = arrayData[1];
            newData.iVerb = arrayData[2];
            newData.youVerb = arrayData[3];
            newData.heSheVerb = arrayData[4];
            newData.weVerb = arrayData[5];
            newData.youPlVerb = arrayData[6];
            newData.theyVerb = arrayData[7];

            setComponentData(newData)
        }
    }, [verbData])

    return (
        <div className="verbContainer">
            <table align="center" className="verbTable">
                <thead>
                    <tr>
                        <th>{componentData.engVerb}</th>
                        <th>{componentData.itVerb}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{"I " + componentData.engVerb}</td>
                        <td>{componentData.iVerb}</td>
                    </tr>
                    <tr>
                        <td>{"You " + componentData.engVerb}</td>
                        <td>{componentData.youVerb}</td>
                    </tr>
                    <tr>
                        <td>{"He/She/It " + componentData.engVerb + "s"}</td>
                        <td>{componentData.heSheVerb}</td>
                    </tr>
                    <tr>
                        <td>{"We " + componentData.engVerb}</td>
                        <td>{componentData.weVerb}</td>
                    </tr>
                    <tr>
                        <td>{"You (plural) " + componentData.engVerb}</td>
                        <td>{componentData.youPlVerb}</td>
                    </tr>
                    <tr>
                        <td>{"They " + componentData.engVerb}</td>
                        <td>{componentData.theyVerb}</td>
                    </tr>
                </tbody>
            </table>

            <div className="verbContainerOptions">
                test
            </div>
        </div>
    )
}