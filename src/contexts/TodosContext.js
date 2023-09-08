import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useReducer,
} from "react";
import MyDialog from "../components/MyDialog";
import MySnackbar from "../components/MySnackbar";
import TodosReducer from "../reducers/TodosReducer";

const todosContext = createContext([]);
export default function TodosProvider({ children }) {
  // STATES
  const [todos, todosDispatch] = useReducer(TodosReducer, []);

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
  const [snackbar, setSnackbar] = useState({ open: false, text: "" });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useMemo(()=>{
    todosDispatch({ type: "initialTodos" });
  },[])
  const doneTodos = useMemo(() => {
    return todos.filter((todo) => {
      return todo.isDone;
    });
  }, [todos]);
  const notDoneTodos = useMemo(() => {
    return todos.filter((todo) => {
      return !todo.isDone;
    });
  }, [todos]);


  const currentTodos = todosType.all
    ? todos
    : todosType.done
    ? doneTodos
    : notDoneTodos;



  //HANDLERS
  const handleAddTodos = () => {
    todosDispatch({ type: "add", payload: { title: newTitle } });
    setNewTitle("");
    handleShowSnackbar("تمت اضافة مهمة");
  };
  const handleClickEdit = () => {
    todosDispatch({ type: "edit", payload: { myDialog: myDialog } });
    setMyDialog({
      ...myDialog,
      open: false,
    });
    handleShowSnackbar("تم تعديل المهمة");
  };
  const handleDeleteTodo = () => {
    todosDispatch({ type: "delete", payload: { myDialog: myDialog } });
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
    setSnackbar({ ...snackbar, open: false });
  };
  const handleShowSnackbar = (text) => {
    setSnackbar({ open: true, text: text });
  };
  return (
    <todosContext.Provider
      value={{
        todos,
        todosDispatch,
        handleAddTodos,
        newTitle,
        setNewTitle,
        myDialog,
        setMyDialog,
        handleChangeMyDialogTextField,
        handleClickEdit,
        handleDeleteTodo,
        handleCloseMyDialog,
        currentTodos,
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
