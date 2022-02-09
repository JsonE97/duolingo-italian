import React, { useEffect, useState } from 'react';
import './VerbContainer.scss';

const PRONOUNS = ["I", "You", "He/She", "We", "You all", "They"];

export const VerbContainer = ({ verbName, verbData }) => {
  const [indicativo, setIndicativo] = useState([]);
  useEffect(() => {
    setIndicativo(verbData?.Indicativo["Indicativo presente"]);
  }, [verbData])

  const getEnglishPronounForRow = (i) => PRONOUNS[i];

  return (
    <div className="verbContainer">
      <table align="center" className="verbTable">
        <thead>
          <tr>
            <th colSpan={2}>{verbName + "-" + verbData.Translation}</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(indicativo).map((k, i) => {
              return (
                <tr>
                  <td>{(i === 2 ?
                    "lui/lei"
                    :
                    (i === 5 ?
                      "loro"
                      :
                      k
                    )) + ' (' + getEnglishPronounForRow(i) + ')'}</td>
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