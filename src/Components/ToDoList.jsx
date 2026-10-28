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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../contexts/ToastContext";

export default function SimpleContainer() {
  // تغيير الاسم هنا من ToDoS إلى todos ليتطابق مع الـ Context
  const { todos = [], dispatch } = useContext(todosContext);
  const { showHideToast } = useContext(ToastContext);
  const [title, setTitle] = useState("");
  const [displaytodo, setdisplaytodo] = useState("All");
  const [showDeleteAlert, setshowDeleteAlert] = useState(false);
  const [dailogToDo, setDailogToDo] = useState(null);
  const [dtd, setdtd] = useState(null);
  const [showUpdateAlert, setshowUpdateAlert] = useState(false);
  const [updatetodo, setupdatetodo] = useState({ title: "", details: "" });

  // useEffect(() => {
  //   dispatch({ type: "get" });
  // }, [dispatch]);

  const completedtodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted);
  }, [todos]);

  const uncompletedtodos = useMemo(() => {
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);

  let todosRender = todos;
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
    dispatch({ type: "delete", payload: { id: dailogToDo.id } });
    setshowDeleteAlert(false);
    showHideToast("deleted successfully");
  }

  function showDeleteDialog(todo) {
    setDailogToDo(todo);
    setshowDeleteAlert(true);
  }

  function showUpdateDialog(tod) {
    setdtd(tod);
    setupdatetodo({ id: tod.id, title: tod.title, details: tod.details });
    setshowUpdateAlert(true);
  }

  function handleAddToDo() {
    dispatch({ type: "added", payload: { newTitle: title } });
    setTitle("");
    showHideToast("you added successfully a new todo");
  }

  function handleUpdateClose() {
    setshowUpdateAlert(false);
  }

  function handleUpdateConfirm() {
    dispatch({
      type: "update",
      payload: {
        id: updatetodo.id,
        title: updatetodo.title,
        details: updatetodo.details,
      },
    });
    setshowUpdateAlert(false);
    showHideToast("edited successfully");
  }

  // تعديل الدالة لتستخدم الـ dispatch بدلاً من setToDoS
  function handleComplete(todo) {
    dispatch({ type: "toggleComplete", payload: { id: todo.id } });
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
          style={{ maxHeight: "80vh", overflow: "scroll" }}
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
              <Grid item xs={8}>
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="outlined-basic"
                  label="Title of ToDo"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={handleAddToDo}
                  style={{ height: "100%", width: "100%" }}
                  variant="contained"
                  disabled={title.length === 0}
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
