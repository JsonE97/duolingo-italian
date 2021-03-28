import React, { useEffect, useState } from 'react';
import './VerbContainer.scss';

export const VerbContainer = ({ verbName, verbData }) => {
    const [indicativo, setIndicativo] = useState([]);
    useEffect(() => {
        if (verbData) {
            setIndicativo(verbData.Indicativo["Indicativo presente"]);
        }
    }, [verbData])

    return (
        <div className="verbContainer">
            <table align="center" className="verbTable">
                <thead>
                    <tr>
                        <th colSpan={2}>{verbName} - {verbData.Translation}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(indicativo).map(k => {
                            return (
                                <tr>
                                    <td>{k}</td>
                                    <td>{indicativo[k]}</td>
                                </tr>
                            )
                        })}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2}>test</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}