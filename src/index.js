import React from "react";
import ReactDOM from "react-dom";
import Example from "./example";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <h1>React Drag n' Drop with material-ui table</h1>
      <DndProvider backend={Backend}>
        <Example />
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
