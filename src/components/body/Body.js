import React from 'react'

function Body({ data, pageSize, page, keys, additionalCols }) {
  return (
    <tbody>
      {
        data.slice(pageSize * (page - 1), pageSize * page).map((singleData, index) => {
          return (
            <tr key={index}>
              {
                keys.map(key => <td key={key}>{singleData[key].toString()}</td>)
              }
              {
                additionalCols.map((col, index) => <td key={index}>{col.td(singleData)}</td>)
              }
            </tr>
          )
        })
      }
    </tbody>
  )
}

export default Body
