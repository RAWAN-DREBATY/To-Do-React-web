import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState, useContext } from "react";
import { todosContext } from "../contexts/todosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ToDo = ({ td }) => {
  const { ToDoS, setToDoS } = useContext(todosContext);
  const [showDeleteAlert, setshowDeleteAlert] = useState(false);
  const [showUpdateAlert, setshowUpdateAlert] = useState(false);
  const [updatetodo, setupdatetodo] = useState({
    title: td.title,
    details: td.details,
  });

  function handleComplete() {
    const updatedToDos = ToDoS.map((todo) => {
      if (todo.id === td.id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setToDoS(updatedToDos);
    localStorage.setItem("todos", JSON.stringify(updatedToDos));
  }

  function handleDelete() {
    setshowDeleteAlert(true);
  }

  function handleUpdate() {
    setupdatetodo({ title: td.title, details: td.details });
    setshowUpdateAlert(true);
  }

  function handleClose() {
    setshowDeleteAlert(false);
  }

  function handleUpdateClose() {
    setshowUpdateAlert(false);
  }

  function handleDeleteConfirm() {
    const filteredTodos = ToDoS.filter((t) => t.id !== td.id);
    setToDoS(filteredTodos);
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
    setshowDeleteAlert(false);
  }

  function handleUpdateConfirm() {
    const updatedList = ToDoS.map((t) => {
      if (t.id === td.id) {
        return { ...t, title: updatetodo.title, details: updatetodo.details };
      }
      return t;
    });
    setToDoS(updatedList);
    localStorage.setItem("todos", JSON.stringify(updatedList));
    setshowUpdateAlert(false);
  }

  return (
    <div>
      {/* نافذة الحذف */}
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

      {/* نافذة التحديث */}
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

      <Card
        className="todo-card"
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          marginTop: 2,
          color: "white",
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: td.isCompleted ? "line-through" : "none",
                }}
              >
                {td.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "left",
                  opacity: 0.8,
                  textDecoration: td.isCompleted ? "line-through" : "none",
                }}
              >
                {td.details}
              </Typography>
            </Grid>
            <Grid
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <IconButton
                onClick={handleComplete}
                style={{
                  color: td.isCompleted ? "white" : "#8bc34a",
                  backgroundColor: td.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                  borderRadius: "5px",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handleUpdate}
                style={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "solid #1769aa 3px",
                  borderRadius: "5px",
                }}
              >
                <ModeOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                style={{
                  color: "#b23c17",
                  backgroundColor: "white",
                  border: "solid #b23c17 3px",
                  borderRadius: "5px",
                }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToDo;
