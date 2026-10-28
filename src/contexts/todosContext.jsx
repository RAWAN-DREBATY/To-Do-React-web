import { createContext, useReducer } from "react";
import todosReducer from "../reducers/todosReducer";

export const todosContext = createContext([]);

const TodosProvider = ({ children }) => {
  // جلب البيانات مباشرة عند إقلاع التطبيق كقيمة ابتدائية للمخزن
  const initializer = () => {
    const storagetodo = localStorage.getItem("todos");
    return storagetodo ? JSON.parse(storagetodo) : [];
  };

  const [todos, todosDispatch] = useReducer(todosReducer, [], initializer);

  return (
    <todosContext.Provider value={{ todos: todos, dispatch: todosDispatch }}>
      {children}
    </todosContext.Provider>
  );
};

export default TodosProvider;
