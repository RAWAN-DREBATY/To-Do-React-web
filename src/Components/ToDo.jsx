import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import { useState, useContext } from "react";
// import { todosContext } from "../contexts/todosContext";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";

const ToDo = ({ td, showDelete, showUpdate, onComplete }) => {
  function handleDeleteClick() {
    showDelete(td);
  }
  function handleUpdateClick() {
    showUpdate(td);
  }

  return (
    <div>
      {/* نافذة الحذف */}

      {/* نافذة التحديث */}

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
                onClick={() => {
                  onComplete(td);
                }}
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
                onClick={handleUpdateClick}
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
                onClick={handleDeleteClick}
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
