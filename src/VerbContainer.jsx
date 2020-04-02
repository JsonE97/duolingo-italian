import React, { useEffect, useState } from 'react';
import './VerbContainer.scss';

export const VerbContainer = ({verbData}) => {
    const [componentData, setComponentData] = useState({});

    useEffect(() => {
        if(verbData !== undefined && verbData !== null){
            const newData = {};
            newData.engVerb = verbData[0];
            newData.itVerb = verbData[1];
            newData.iVerb = verbData[2];
            newData.youVerb = verbData[3];
            newData.heSheVerb = verbData[4];
            newData.weVerb = verbData[5];
            newData.youPlVerb = verbData[6];
            newData.theyVerb = verbData[7];

            setComponentData(newData)
        }
    }, [verbData])

    return (
        <div className="verbContainer">
            <table align="center" className="verbTable">
                <tr>
                    <th>{componentData.engVerb}</th>
                    <th>{componentData.itVerb}</th>
                </tr>
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
                <p>Test</p>
            </div>
        </div>
    )
}