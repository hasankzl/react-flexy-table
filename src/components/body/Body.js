import React from 'react'
import { getProp } from '../util/functions'
function Body({ data, pageSize, page, keys, additionalCols, columns }) {
  return (
    <tbody>
      {data
        .slice(pageSize * (page - 1), pageSize * page)
        .map((singleData, index) => {
          return columns ? (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.td
                    ? col.td(singleData)
                    : getProp(singleData, col.key.split('.')).toString()}
                </td>
              ))}
            </tr>
          ) : (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>{singleData[key].toString()}</td>
              ))}
              {additionalCols.map((col, i) => (
                <td key={i}>{col.td(singleData, i)}</td>
              ))}
            </tr>
          )
        })}
    </tbody>
  )
}

export default Body
