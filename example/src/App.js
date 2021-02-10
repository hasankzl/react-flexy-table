import React, { useState, useEffect } from 'react'

import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import './index.css'

import deleteIcon from './icons/delete-button-svgrepo-com.svg'
import editIcon from './icons/edit-svgrepo-com.svg'

const App = () => {
  const [caseSensivite, setCaseSensivite] = useState(false)
  const [sortable, setSortable] = useState(true)
  const [filterable, setFilterable] = useState(true)
  const [data, setData] = useState([])
  const [downloadExcelProps, setDownloadExcelProps] = useState({
    type: 'all',
    title: 'test',
    showLabel: true
  })
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean`
      const items = await (await fetch(endpoint)).json()
      setData(items.results)
    }

    fetchData()
  }, [])
  const additionalCols = [
    {
      header: 'Actions',
      td: (data, index) => {
        return (
          <div>
            <img
              src={deleteIcon}
              alt='delete'
              width='30'
              height='20'
              onClick={() => alert('this is delete for' + data.question)}
            />
            <img
              src={editIcon}
              alt='edit'
              width='30'
              height='20'
              onClick={() => alert('this is edit for' + data.question)}
            />
          </div>
        )
      }
    }
  ]

  const editDownloadProps = (e) => {
    let newProps = { ...downloadExcelProps }

    newProps[e.target.name] = e.target.value
    setDownloadExcelProps(newProps)
  }
  const editDownloadPropsCheckBox = (e) => {
    let newProps = { ...downloadExcelProps }

    newProps[e.target.name] = e.target.checked
    setDownloadExcelProps(newProps)
  }
  return (
    <div style={{ margin: '30px' }}>
      <h2 style={{ textAlign: 'center' }}>react-flexy-table</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ margin: '30px' }}>
          <label>Handle search case sensivite</label>
          <select
            onChange={(e) => setCaseSensivite(e.target.value === 'true')}
            style={{ marginLeft: '10px', padding: '5px' }}
            value={caseSensivite}
          >
            <option value={false}>Close</option>
            <option value={true}>Open</option>
          </select>
        </div>
        <div style={{ margin: '30px' }}>
          <label>Handle sortable</label>
          <select
            onChange={(e) => setSortable(e.target.value === 'true')}
            style={{ marginLeft: '10px', padding: '5px' }}
            value={sortable}
          >
            <option value={false}>Close</option>
            <option value={true}>Open</option>
          </select>
        </div>
        <div style={{ margin: '30px' }}>
          <label>Handle filterable</label>
          <select
            onChange={(e) => setFilterable(e.target.value === 'true')}
            style={{ marginLeft: '10px', padding: '5px' }}
            value={filterable}
          >
            <option value={false}>Close</option>
            <option value={true}>Open</option>
          </select>
        </div>

        <div style={{ margin: '30px' }}>
          <label>Download Excel Type</label>
          <select
            onChange={editDownloadProps}
            style={{ marginLeft: '10px', padding: '5px' }}
            value={downloadExcelProps.type}
            name='type'
          >
            <option value={'filtered'}>Filtered</option>
            <option value={'paged'}>Paged</option>
            <option value={'all'}>All</option>
          </select>
        </div>

        <div style={{ margin: '30px' }}>
          <label>Download Excel Show Label</label>
          <input
            type='checkbox'
            onChange={editDownloadPropsCheckBox}
            style={{ marginLeft: '10px', padding: '5px' }}
            checked={downloadExcelProps.showLabel}
            name='showLabel'
          />
        </div>
        <div style={{ margin: '30px' }}>
          <label>Download Excel title</label>
          <input
            type='text'
            onChange={editDownloadProps}
            style={{ marginLeft: '10px', padding: '5px' }}
            value={downloadExcelProps.title}
            name='title'
          />
        </div>
      </div>
      <ReactFlexyTable
        data={data}
        sortable={sortable}
        filterable={filterable}
        caseSensitive={caseSensivite}
        additionalCols={additionalCols}
        globalSearch
        downloadExcelProps={downloadExcelProps}
        showExcelButton
      />
    </div>
  )
}

export default App
