import React, { useState } from 'react'

import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import "./index.css"
import data from "./jsonData"
import deleteIcon from "./icons/delete-button-svgrepo-com.svg"
import editIcon from "./icons/edit-svgrepo-com.svg"
const App = () => {
  const [caseSensivite, setCaseSensivite] = useState(0)
  const [sortable, setSortable] = useState(1)
  const [filterable, setFilterable] = useState(1)
  const additionalCols = [{
    header: "Actions",
    td: (data) => {
      return <div>
        <img src={deleteIcon} width="30" height="20" onClick={() => alert("this is delete for id " + data.id)} />
        <img src={editIcon} width="30" height="20" onClick={() => alert("this is edit for id " + data.id)} />
      </div>
    }
  }]

  return <div style={{ margin: "30px" }}>
    <h2 style={{textAlign:"center"}}>react-flexy-table</h2>
    <div style={{ display: "flex" }}>
      <div style={{ margin: "30px" }}>
        <label>Handle search case sensivite</label>
        <select onChange={e => setCaseSensivite(Number(e.target.value))} style={{ marginLeft: "10px", padding: "5px" }} value={caseSensivite}>
          < option value={0}>Close</option>
          <option value={1}>Open</option>
        </select>
      </div>
      <div style={{ margin: "30px" }}>
        <label>Handle  sortable</label>
        <select onChange={e => setSortable(Number(e.target.value))} style={{ marginLeft: "10px", padding: "5px" }} value={sortable}>
          < option value={0}>Close</option>
          <option value={1}>Open</option>
        </select>
      </div>
      <div style={{ margin: "30px" }}>
        <label>Handle  filterable</label>
        <select onChange={e => setFilterable(Number(e.target.value))} style={{ marginLeft: "10px", padding: "5px" }} value={filterable}>
          < option value={0}>Close</option>
          <option value={1}>Open</option>
        </select>
      </div>
    </div>
    <ReactFlexyTable data={data} sortable={sortable} filterable={filterable} caseSensitive={caseSensivite} additionalCols={additionalCols} nonFilterCols={["gender"]}
    />
  </div>
}

export default App
