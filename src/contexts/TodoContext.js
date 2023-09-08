import { createContext, useContext } from "react";
import { useTodos } from "./TodosContext";

const todoContext = createContext({});
export default function TodoProvider({ children, sTodo }) {
  const { todosDispatch, setMyDialog } = useTodos();

  // HANDLERs
  const handleCheckTodo = (todoId) => {
    todosDispatch({ type: "check", payload: { todoId: todoId } });
  };

  const handleMyDialog = (dialogType, { title, id }) => {
    todosDispatch({
      type: "showDialog",
      payload: {
        setMyDialog: setMyDialog,
        dialogType: dialogType,
        todo: { title: title, id: id },
      },
    });
  };

  return (
    <todoContext.Provider value={{ handleCheckTodo, sTodo, handleMyDialog }}>
      {children}
    </todoContext.Provider>
  );
}
export const useTodo = () => {
  return useContext(todoContext);
};
