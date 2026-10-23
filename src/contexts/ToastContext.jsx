import { createContext, useState } from "react";
import MySnackbar from "../Components/MySnackbar";

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [messege, setmessege] = useState(false);
  function showHideToast(messege) {
    setmessege(messege);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnackbar open={open} messege={messege} /> {children}{" "}
    </ToastContext.Provider>
  );
};
