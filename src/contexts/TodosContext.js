import { createContext, useContext, useEffect, useState } from "react";
import uuid4 from "uuid4";
import MyDialog from "../components/MyDialog";
import MySnackbar from "../components/MySnackbar";

const todosContext = createContext([]);
export default function TodosProvider({ children }) {
  // STATES
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos"))
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [newTitle, setNewTitle] = useState("");
  const [myDialog, setMyDialog] = useState({
    title: "",
    open: false,
    inputs: {
      id: "",
      button: { isDisabled: true, title: "", color: "primary" },
      textField: { isTextField: true, text: "" },
      initialTextField: "",
    },
    content: { isContent: false, text: "" },
  });
  const [todosType, setTodosType] = useState({ all: true, done: false });
  const [snackbar, setSnackbar] = useState({open:false, text:''});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //HANDLERS
  const handleAddTodos = () => {
    setTodos([
      ...todos,
      {
        id: uuid4(),
        title: newTitle,
        isDone: false,
      },
    ]);
    setNewTitle("");
    handleShowSnackbar("تمت اضافة مهمة");
  };
  const handleClickEdit = () => {
    const newTodos = [...todos];
    for (const todo of newTodos) {
      if (todo.id === myDialog.inputs.id) {
        todo.title = myDialog.inputs.textField.text;
      }
    }
    setTodos(newTodos);
    setMyDialog({
      ...myDialog,
      open: false,
    });
    handleShowSnackbar("تم تعديل المهمة");
  };
  const handleDeleteTodo = () => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== myDialog.inputs.id;
      })
    );
    setMyDialog({
      ...myDialog,
      open: false,
    });
    handleShowSnackbar("تم حذف المهمة");
  };
  const handleChangeMyDialogTextField = (e) => {
    setMyDialog({
      ...myDialog,
      inputs: {
        ...myDialog.inputs,
        textField: { isTextField: true, text: e.target.value },
        button: {
          ...myDialog.inputs.button,
          isDisabled:
            e.target.value === ""
              ? true
              : e.target.value === myDialog.inputs.initialTextField
              ? true
              : false,
        },
      },
    });
  };
  const handleCloseMyDialog = () => {
    setMyDialog({ ...myDialog, open: false });
  };
  const handleTabClick = (type) => {
    setTodosType({
      all: type === "all" ? true : false,
      done: type === "done" ? true : false,
    });
  };
  const handleHideSnackbar = () => {
    setSnackbar({...snackbar,open: false});
  };
  const handleShowSnackbar = (text) => {
    setSnackbar({open: true, text:text});
  };
  return (
    <todosContext.Provider
      value={{
        todos,
        setTodos,
        handleAddTodos,
        newTitle,
        setNewTitle,
        myDialog,
        setMyDialog,
        handleChangeMyDialogTextField,
        handleClickEdit,
        handleDeleteTodo,
        handleCloseMyDialog,
        todosType,
        handleTabClick,
        snackbar,
        handleHideSnackbar,
        handleShowSnackbar,
      }}>
      <MySnackbar />
      <MyDialog />
      {children}
    </todosContext.Provider>
  );
}
export const useTodos = () => {
  return useContext(todosContext);
};
