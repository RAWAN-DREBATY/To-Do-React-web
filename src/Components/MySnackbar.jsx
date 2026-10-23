// import * as React from "react";
// import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackbar({ open, messege }) {
  return (
    <div>
      {/* 1. تفعيل الزر ليقوم بفتح الـ Snackbar عند الضغط عليه */}
      {/* <Button variant="contained" onClick={handleClick}>
        Open Snackbar
      </Button> */}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        // onClose={handleClose}
        // تذكير: عند استخدام Alert كمكون ابن، احذف خصائص message و action من هنا
      >
        {/* 2. الـ Alert يتولى إظهار الرسالة وزر الإغلاق تلقائياً عبر خاصية onClose */}
        <Alert
          // onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {messege}
        </Alert>
      </Snackbar>
    </div>
  );
}
