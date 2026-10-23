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
import { useState, useContext, useEffect, useMemo } from "react";
import { todosContext } from "../contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../contexts/ToastContext";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
export default function SimpleContainer() {
  const { ToDoS, setToDoS } = useContext(todosContext);
  const { showHideToast } = useContext(ToastContext);
  const [title, setTitle] = useState("");
  const [displaytodo, setdisplaytodo] = useState("All");
  const [showDeleteAlert, setshowDeleteAlert] = useState(false);
  const [dailogToDo, setDailogToDo] = useState(null);
  const [dtd, setdtd] = useState(null);
  const [showUpdateAlert, setshowUpdateAlert] = useState(false);
  const [updatetodo, setupdatetodo] = useState({
    title: "",
    details: "",
  });

  useEffect(() => {
    const storagetodo = localStorage.getItem("todos");
    if (storagetodo) {
      setToDoS(JSON.parse(storagetodo));
    }
  }, []);

  const completedtodos = useMemo(() => {
    return ToDoS.filter((t) => t.isCompleted);
  }, [ToDoS]);
  const uncompletedtodos = useMemo(() => {
    return ToDoS.filter((t) => !t.isCompleted);
  }, [ToDoS]);

  let todosRender = ToDoS;

  if (displaytodo === "Completed") {
    todosRender = completedtodos;
  } else if (displaytodo === "UnCompleted") {
    todosRender = uncompletedtodos;
  }

  const todoElements = todosRender.map((todo) => (
    <ToDo
      key={todo.id}
      td={todo}
      showDelete={showDeleteDialog}
      showUpdate={showUpdateDialog}
      onComplete={handleComplete}
    />
  ));

  function changedisplay(e) {
    if (e.target.value !== null) {
      setdisplaytodo(e.target.value);
    }
  }
  function handleClose() {
    setshowDeleteAlert(false);
  }

  function handleDeleteConfirm() {
    const filteredTodos = ToDoS.filter((t) => t.id !== dailogToDo.id);
    setToDoS(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
    setshowDeleteAlert(false);
    showHideToast("deleted successfully");
  }
  function showDeleteDialog(todo) {
    setDailogToDo(todo);
    setshowDeleteAlert(true);
  }
  function showUpdateDialog(tod) {
    setdtd(tod);
    setupdatetodo({ title: tod.title, details: tod.details });
    setshowUpdateAlert(true);
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
    showHideToast("you added successfully a new todo");
  }
  //update functions
  function handleUpdateClose() {
    setshowUpdateAlert(false);
  }

  function handleUpdateConfirm() {
    const updatedList = ToDoS.map((t) => {
      if (t.id === dtd.id) {
        return { ...t, title: updatetodo.title, details: updatetodo.details };
      }
      return t;
    });
    setToDoS(updatedList);
    localStorage.setItem("todos", JSON.stringify(updatedList));
    setshowUpdateAlert(false);
    showHideToast("edited successfully");
  }
  function handleComplete(todoo) {
    const updatedToDos = ToDoS.map((todo) => {
      if (todo.id === todoo.id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setToDoS(updatedToDos);
    localStorage.setItem("todos", JSON.stringify(updatedToDos));
    showHideToast("successfully edited");
  }
  return (
    <>
      <Dialog open={showDeleteAlert} onClose={handleClose}>
        <DialogTitle>{"Are You sure to delete this ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Deletion cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showUpdateAlert} onClose={handleUpdateClose}>
        <DialogTitle>{"Edit Your task :"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Title :"
            fullWidth
            variant="standard"
            value={updatetodo.title}
            onChange={(e) =>
              setupdatetodo({ ...updatetodo, title: e.target.value })
            }
          />
          <TextField
            required
            margin="dense"
            label="Details :"
            fullWidth
            variant="standard"
            value={updatetodo.details}
            onChange={(e) =>
              setupdatetodo({ ...updatetodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={handleUpdateConfirm}>Edit</Button>
        </DialogActions>
      </Dialog>
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
    </>
  );
}
