import React, { useState, useEffect } from 'react'

import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

import GitHubButton from 'react-github-btn'
import deleteIcon from './icons/delete-button-svgrepo-com.svg'
import editIcon from './icons/edit-svgrepo-com.svg'

const App = () => {
  const [caseSensivite, setCaseSensivite] = useState(false)
  const [sortable, setSortable] = useState(true)
  const [filterable, setFilterable] = useState(true)
  const [data, setData] = useState([
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question: 'The Great Wall of China is visible from the moon.',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: 'GeneralKnowledge',
      type: 'boolean',
      difficulty: null,
      question:
        'Video streaming website YouTube was purchased in it&#039;s entirety by Facebook for US$1.65 billion in stock.',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: null,
      type: 'boolean',
      difficulty: 'easy',
      question: null,
      correct_answer: 'True',
      incorrect_answers: ['False']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question:
        'It is automatically considered entrapment in the United States if the police sell you illegal substances without revealing themselves.',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: null,
      question: 'Nutella is produced by the German company Ferrero.',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question:
        'A scientific study on peanuts in bars found traces of over 100 unique specimens of urine.',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question: 'Bulls are attracted to the color red.',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question: 'The Sun rises from the North.',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question: 'The color orange is named after the fruit.',
      correct_answer: 'True',
      incorrect_answers: ['False']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question:
        'On average, at least 1 person is killed by a drunk driver in the United States every hour.',
      correct_answer: 'True',
      incorrect_answers: ['False']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question:
        'In 2010, Twitter and the United States Library of Congress partnered together to archive every tweet by American citizens.',
      correct_answer: 'True',
      incorrect_answers: ['False']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question: 'Pluto is a planet.',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question: 'Adolf Hitler was born in Australia. ',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question: 'When you cry in space, your tears stick to your face.',
      correct_answer: 'True',
      incorrect_answers: ['False']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question:
        'One of Donald Trump&#039;s 2016 Presidential Campaign promises was to build a border wall between the United States and Mexico.',
      correct_answer: 'True',
      incorrect_answers: ['False']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question:
        'Romanian belongs to the Romance language family, shared with French, Spanish, Portuguese and Italian. ',
      correct_answer: 'True',
      incorrect_answers: ['False']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question:
        'Dihydrogen Monoxide was banned due to health risks after being discovered in 1983 inside swimming pools and drinking water.',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: null,
      type: 'boolean',
      difficulty: 'easy',
      question: 'The National Animal of Scotland is the Unicorn.',
      correct_answer: 'True',
      incorrect_answers: ['False']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question: 'A pasodoble is a type of Italian pasta sauce.',
      correct_answer: 'False',
      incorrect_answers: ['True']
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'easy',
      question: 'Slovakia is a member of European Union-',
      correct_answer: 'True',
      incorrect_answers: ['False']
    }
  ])
  const [downloadExcelProps, setDownloadExcelProps] = useState({
    type: 'all',
    title: 'test',
    showLabel: true
  })
  useEffect(() => {
    // fetchData(20)
  }, [])

  const fetchData = async (count) => {
    const endpoint = `https://opentdb.com/api.php?amount=${count}&category=9&difficulty=easy&type=boolean`
    const items = await (await fetch(endpoint)).json()
    setData(items.results)
  }
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
              onClick={() => alert('this is delete for ' + data.question)}
            />
            <img
              src={editIcon}
              alt='edit'
              width='30'
              height='20'
              onClick={() => alert('this is edit for ' + data.question)}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <GitHubButton
          href='https://github.com/hasankzl'
          data-size='large'
          data-show-count='true'
          aria-label='Follow @hasankzl on GitHub'
        >
          Follow @hasankzl
        </GitHubButton>
        <div style={{ margin: 10 }}></div>
        <GitHubButton
          href='https://github.com/hasankzl/react-flexy-table'
          data-icon='octicon-star'
          data-size='large'
          data-show-count='true'
          aria-label='Star hasankzl/react-pageable-select on GitHub'
        >
          Star
        </GitHubButton>
      </div>
      <button onClick={() => fetchData(10)}>SEARCH AGAIN</button>
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
        pageSize={10}
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
