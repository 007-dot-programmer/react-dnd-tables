import React, {useState} from "react";
import ReactDOM from "react-dom";
import DnDTable from "./DnDTable";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function App() {
  const [rowsToSelect, setRowsToSelect] = useState([
    {
      id: 1,
      text: "Write a cool JS library"
    },
    {
      id: 2,
      text: "Make it generic enough"
    },
    {
      id: 3,
      text: "Write README"
    },
    {
      id: 4,
      text: "Create some examples"
    },
  ]);
  const [rowsSelected, setRowsSelected] = useState([    
    {
      id: 5,
      text:
        "Spam in Twitter and IRC to promote it (note that this element is taller than the others)"
    },
    {
      id: 6,
      text: "???"
    },
    {
      id: 7,
      text: "PROFIT"
    }
  ]);

  const setData = (dataRaw, dataType) => {
    if (dataType === 0)
      setRowsToSelect(dataRaw)
    else
    setRowsSelected(dataRaw)
  }
  
  const changedrowsToSelect = (data) => {
    setData(data, 0);
  }
  const changedrowsSelected = (data) => {
    setData(data, 1);
  }

  return (
    <div className="App">
      <h1>React Drag n' Drop with material-ui table</h1>
      <DndProvider backend={Backend} >
        <DnDTable rows={rowsToSelect} tableId={0} onChangeData={changedrowsToSelect}/>
        <br/>
        <DnDTable rows={rowsSelected} tableId={1} onChangeData={changedrowsSelected}/>
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
