# react-flexy-table
most easy to use react table

# live demo

https://react-flexy-table.netlify.app/

# usage
its realy simple just import and pass to data! React flexy table will care after that

```js
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"

const App = ()=>{

return <ReactFlexyTable data={data} />
}

export default App;
```

thats is !

if you want to make sortable add sortable prop

```js
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"

const App = ()=>{

return <ReactFlexyTable data={data} sortable />
}

export default App;
```

if you want to limit filterable columns you can pass thats columns with nonSortCols props

```js
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"

const App = ()=>{

return <ReactFlexyTable data={data} sortable nonSortCols={["name","surname"]} />
}

export default App;
```


if you want to make your table filterable just add filterable props


```js
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"

const App = ()=>{

return <ReactFlexyTable data={data} filterable/>
}

export default App;
``

if you want to limit filterable columns you can pass thats columns with nonFilterCols props

```js
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"

const App = ()=>{

return <ReactFlexyTable data={data} filterable nonFilterCols={["name","surname"]]/>
}

export default App;
```
default filter inputs doesn't works case sensitive for do that add caseSensitive props like this.

```js
return <ReactFlexyTable data={data} filterable caseSensitive/>
```

if you want to add some additional columns you can use additionalCols props like that

```js
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"
import deleteIcon from "./icons/delete-button-svgrepo-com.svg"
import editIcon from "./icons/edit-svgrepo-com.svg"

const App = ()=>{
 const additionalCols = [{
    header: "Actions",
    td: (data) => {
      return <div>
        <img src={deleteIcon} width="30" height="20" onClick={() => alert("this is delete for id " + data.id)} /> // delete icom
        <img src={editIcon} width="30" height="20" onClick={() => alert("this is edit for id " + data.id)} /> // edit icon
      </div>
    }
  }]
  return <ReactFlexyTable data={data} additionalCols={additionalCols}/>
  }
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

```
 return <ReactFlexyTable data={data} className="own-table"/>
```
i
# props


|     property     |   type   | default               |                                                              description                                                              |
|:----------------:|:--------:|-----------------------|:-------------------------------------------------------------------------------------------------------------------------------------:|
| data             | array    | [ ]                   | data for table                                                                                                                        |
| pageSize         | Number   | 5                     | page size of the table                                                                                                                |
| sortable         | Boolean  | false                 | allows to sort data from header                                                                                                       |
| filterable       | Boolean  | false                 | open filter inputs for table                                                                                                          |
| nonFilterCols    | array    | [ ]                   | if filterable open but you dont want to filter some cols you can use this.  array includes column names that you dont want to filter. |
| nonSortCols      | array    | [ ]                   | if you dont want to sort some cols you can use this. array includes column name that you dont want to sort.                           |
| pageSizeOptions  | array    | [5,10,15,20]          | represent page size select options                                                                                                    |
| onPageChange     | function |                       | callback for page change                                                                                                              |
| onSortedChange   | function |                       | callback for sorted change                                                                                                            |
| onPageSizeChange | funtion  |                       | callback for page size change                                                                                                         |
| previousText     | String   | "Previous"            | text for previos button                                                                                                               |
| ofText           | String   | "of"                  | text for of                                                                                                                           |
| totalDataText    | String   | "Total data count"    | text for total data                                                                                                                   |
| filteredDataText | String   | "Filtered data count" | text for filtered data                                                                                                                |
| caseSensitive    | Boolean  | false                 | controls search input case sensitive                                                                                                  |
| additionalCols   | Array    | [ ]                   | additional cols for table                                                                                                             |
| className        | String   | ""                    | className for table        
