import { createContext, useContext } from "react";
import { useTodos } from "./TodosContext";

const todoContext = createContext({});
export default function TodoProvider({ children, sTodo }) {
  const { todos, setTodos, setMyDialog } = useTodos();

  // HANDLERs
  const handleCheckTodo = () => {
    let newTodos = [...todos];
    for (const todo of newTodos) {
      if (todo.id === sTodo.id) {
        todo.isDone = !todo.isDone;
      }
    }
    setTodos(newTodos);
  };
  
  const handleMyDialog = (dialogType, { title, id }) => {
    if (dialogType === "edit") {
      setMyDialog({
        title: "تعديل المهمة",
        open: true,
        inputs: {
          id: id,
          button: { title: "تعديل", isDisabled: true, color: "primary" },
          textField: {isTextField: true, text: title},
          initialTextField: title,
        },
        content: {isContent: false, text: ""}
      });
    }else if(dialogType === "delete"){
        setMyDialog({
          title: "حذف المهمة",
          open: true,
          inputs: {
            id: id,
            button: { title: "حذف", isDisabled: false, color: "error" },
            textField: { isTextField: false, text: "" },
            initialTextField: title,
          },
          content: { isContent: true, text: "هل انت متأكد من حذف هذه المهمة؟" },
        });
    }
  };

  return (
    <todoContext.Provider
      value={{ handleCheckTodo, sTodo, handleMyDialog }}>
      {children}
    </todoContext.Provider>
  );
}
export const useTodo = () => {
  return useContext(todoContext);
};
