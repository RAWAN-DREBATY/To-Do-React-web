import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newToDo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };
      const ut = [...currentTodos, newToDo];
      localStorage.setItem("todos", JSON.stringify(ut));
      return ut;
    }
    case "delete": {
      const filteredTodos = currentTodos.filter(
        (t) => t.id !== action.payload.id,
      );
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      return filteredTodos;
    }
    case "update": {
      const updatedList = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedList));
      return updatedList;
    }
    case "toggleComplete": {
      const updatedList = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedList));
      return updatedList;
    }
    default:
      return currentTodos;
  }
}
