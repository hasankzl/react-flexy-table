# react-flexy-table

most easy to use react table

## install

```
npm install react-flexy-table
```

# live demo

https://react-flexy-table.netlify.app/

# usage

its realy simple just import and pass to data! React flexy table will care after that

```js
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

const App = () => {
  return <ReactFlexyTable data={data} />
}

export default App
```

<img crossorigin="anonymous" src="https://github.com/CoderSau/react-flexy-table/blob/master/rft-images/data.png" />

| :memo: | if your data includes key with '\_' like 'user_id' in header of table. It will be transform to 'User Id' |
| ------ | :------------------------------------------------------------------------------------------------------- |


thats is !

if you want to make sortable add sortable prop

```js
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

const App = () => {
  return <ReactFlexyTable data={data} sortable />
}

export default App
```

if you want to add some additional columns you can use additionalCols props like that

```js
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import deleteIcon from './icons/delete-button-svgrepo-com.svg'
import editIcon from './icons/edit-svgrepo-com.svg'

const App = () => {
  const additionalCols = [
    {
      header: 'Actions',
      td: (data) => {
        return (
          <div>
            <img
              src={deleteIcon}
              width='30'
              height='20'
              onClick={() => alert('this is delete for id ' + data.id)}
            />{' '}
            // delete icon
            <img
              src={editIcon}
              width='30'
              height='20'
              onClick={() => alert('this is edit for id ' + data.id)}
            /> // edit icon
          </div>
        )
      }
    }
  ]
  return <ReactFlexyTable data={data} additionalCols={additionalCols} />
}
```

<img crossorigin="anonymous" src="https://github.com/CoderSau/react-flexy-table/blob/master/rft-images/additionalCols.png" />

you can also define your columns so you can change the table values anything you like. (Note if you define columns your additionalcol value will not work)

```js
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

const App = () => {
  columns = [
    {
      header: 'id value',
      key: 'id',
      td: (data) => <div>the id is {data.id}</div>
    },
    {
      header: 'username',
      key: 'name'
    },
    {
      header: 'city',
      // can also use with nested objects
      key: 'address.city'
    }
  ]
  return <ReactFlexyTable data={data} columns={columns} />
}

export default App
```

if you want to limit sortable columns you can pass thats columns with nonSortCols props

```js
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

const App = () => {
  return (
    <ReactFlexyTable data={data} sortable nonSortCols={['name', 'surname']} />
  )
}

export default App
```

if you want to make your table filterable just add filterable props

```js
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

const App = () => {
  return <ReactFlexyTable data={data} filterable />
}

export default App
```

<img crossorigin="anonymous" src="https://github.com/CoderSau/react-flexy-table/blob/master/rft-images/filter.png" />

if you want to limit filterable columns you can pass thats columns with nonFilterCols props

```js
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"

const App = ()=>{

return <ReactFlexyTable data={data} filterable nonFilterCols={["gender","email"]]/>
}
export default App;
```

<img crossorigin="anonymous" src="https://github.com/CoderSau/react-flexy-table/blob/master/rft-images/nonFilterCols.png" />

You can also add global search input for search in all data.

```js
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

const App = () => {
  return <ReactFlexyTable data={data} filterable globalSearch />
}
export default App
```

<img crossorigin="anonymous" src="https://github.com/CoderSau/react-flexy-table/blob/master/rft-images/globalSearch.png" />

default filter inputs doesn't works case sensitive for do that add caseSensitive props like this.(Also work with global search)

```js
return <ReactFlexyTable data={data} filterable caseSensitive />
```

you can change pagination text with this props

```
  previousText: String,
  nextText: String,
  rowsText: String,
  pageText: String,
  ofText: String,
  totalDataText: String,
  filteredDataText: String,
```

you can also use this callbacks for table actions

```
   onPageChange: Function,
  onSortedChange: Function,
  onPageSizeChange: Function,
```

# styling

you can simply change the colors just change this css variables

```
:root {
  --rft-main-color: #00b879;
  --rft-button-color: #00b879;
  --rft-even-row-color: #f3f3f3;
}
```

you can also override the rft-table class or you can pass your own table class like

```js
return <ReactFlexyTable data={data} className='my-table' />
```

and you can change the styling

```css
.my-table tr {
  color: red;
  font-weight: bold;
}
```

you can also change the global search input style with override this classes

```
rtf-gs-input
rft-gs-td
rft-gs-tr
```

# props

|     property     |   type   | default               |                                                             description                                                              |
| :--------------: | :------: | --------------------- | :----------------------------------------------------------------------------------------------------------------------------------: |
|       data       |  array   | [ ]                   |                                                            data for table                                                            |
|     columns      |  array   | null                  |                                                          columns for table                                                           |
|  additionalCols  |  Array   | [ ]                   |                                                      additional cols for table                                                       |
|     pageSize     |  Number  | 5                     |                                                        page size of the table                                                        |
|     sortable     | Boolean  | false                 |                                                   allows to sort data from header                                                    |
|    filterable    | Boolean  | false                 |                                                     open filter inputs for table                                                     |
|   GlobalSearch   | Boolean  | false                 |                                                    shows the global search input                                                     |
|  nonFilterCols   |  array   | [ ]                   | if filterable open but you dont want to filter some cols you can use this. array includes column names that you dont want to filter. |
|   nonSortCols    |  array   | [ ]                   |             if you dont want to sort some cols you can use this. array includes column name that you dont want to sort.              |
| pageSizeOptions  |  array   | [5,10,15,20]          |                                                  represent page size select options                                                  |
|   onPageChange   | function |                       |                                                       callback for page change                                                       |
|  onSortedChange  | function |                       |                                                      callback for sorted change                                                      |
| onPageSizeChange | funtion  |                       |                                                    callback for page size change                                                     |
|   previousText   |  String  | "Previous"            |                                                       text for previos button                                                        |
|      ofText      |  String  | "of"                  |                                                             text for of                                                              |
|    searchText    |  String  | "Search"              |                                                        text for global search                                                        |
|  totalDataText   |  String  | "Total data count"    |                                                         text for total data                                                          |
| filteredDataText |  String  | "Filtered data count" |                                                        text for filtered data                                                        |
|  caseSensitive   | Boolean  | false                 |                                                 controls search input case sensitive                                                 |
|    className     |  String  | ""                    |                                                         className for table                                                          |
