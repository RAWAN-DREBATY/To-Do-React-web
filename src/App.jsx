import "./App.css";
import ToDoList from "./Components/ToDoList";
import { todosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

import { ToastProvider } from "./contexts/ToastContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#004d40",
    },
  },
});
const todos = [
  {
    id: uuidv4(),
    title: "The first ToDo",
    details: "Details of the first ToDo",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "The first ToDo",
    details: "Details of the first ToDo",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "The first ToDo",
    details: "Details of the first ToDo",
    isCompleted: false,
  },
];
function App() {
  const [ToDoS, setToDoS] = useState([todos]);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <todosContext.Provider value={{ ToDoS, setToDoS }}>
            <ToDoList />
          </todosContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
