import React from 'react'

import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import "./index.css"
import data from "./jsonData"
import deleteIcon from "./icons/delete-button-svgrepo-com.svg"
import editIcon from "./icons/edit-svgrepo-com.svg"
const App = () => {

  const additionalCols = [{
    header: "Actions",
    td: (data) => {
      return <div>
        <img src={deleteIcon} width="30" height="20" onClick={() => alert("this is delete for" + data.id)} />
        <img src={editIcon} width="30" height="20" onClick={() => alert("this is edit for" + data.id)} />
      </div>
    }
  }]

  return <ReactFlexyTable data={data} filterable nonFilterCol={["age", "date"]} nonSortCol={["age"]} additionalCols={additionalCols}
    onPageChange={(p) => alert(p)} onSortedChange={(key) => alert(key)} onPageSizeChange={(size) => alert(size)}
  />
}

export default App
