import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect } from "react";
import { todosContext } from "../contexts/todosContext";
import { v4 as uuidv4 } from "uuid";

export default function SimpleContainer() {
  const { ToDoS, setToDoS } = useContext(todosContext);
  const [title, setTitle] = useState("");
  const [displaytodo, setdisplaytodo] = useState("All");

  useEffect(() => {
    const storagetodo = localStorage.getItem("todos");
    if (storagetodo) {
      setToDoS(JSON.parse(storagetodo));
    }
  }, []);

  const completedtodos = ToDoS.filter((t) => t.isCompleted);
  const uncompletedtodos = ToDoS.filter((t) => !t.isCompleted);

  let todosRender = ToDoS;

  if (displaytodo === "Completed") {
    todosRender = completedtodos;
  } else if (displaytodo === "UnCompleted") {
    todosRender = uncompletedtodos;
  }

  const todoElements = todosRender.map((todo) => (
    <ToDo key={todo.id} td={todo} />
  ));

  function changedisplay(e) {
    if (e.target.value !== null) {
      setdisplaytodo(e.target.value);
    }
  }

  function handleAddToDo() {
    if (!title.trim()) return;

    const newToDo = {
      id: uuidv4(),
      title: title,
      details: "",
      isCompleted: false,
    };

    const ut = [...ToDoS, newToDo];
    setToDoS(ut);
    localStorage.setItem("todos", JSON.stringify(ut));
    setTitle("");
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh",
          overflow: "scroll",
        }}
      >
        <CardContent>
          <Typography variant="h2">My ToDo List</Typography>
          <Divider />

          <ToggleButtonGroup
            exclusive
            aria-label="text alignment"
            style={{ marginTop: "10px" }}
            value={displaytodo}
            onChange={changedisplay}
            color="primary"
          >
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Completed">Completed</ToggleButton>
            <ToggleButton value="UnCompleted">UnCompleted</ToggleButton>
          </ToggleButtonGroup>

          {todoElements}

          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid xs={8}>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="outlined-basic"
                label="Title of ToDo"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid xs={4}>
              <Button
                onClick={handleAddToDo}
                style={{ height: "100%", width: "100%" }}
                variant="contained"
                disabled={title.length == 0}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
