import uuid4 from "uuid4";
function TodosReducer(currentState, action) {
  switch (action.type) {
    case "initialTodos":
      return JSON.parse(localStorage.getItem("todos"));

    case "add":
      return [
        {
          id: uuid4(),
          title: action.payload.title,
          isDone: false,
        },
        ...currentState,
      ];

    case "check":
      const todoId = action.payload.todoId;
      let newTodos = [...currentState];
      for (const todo of newTodos) {
        if (todo.id === todoId) {
          todo.isDone = !todo.isDone;
        }
      }
      return newTodos;

    case "showDialog":
      const dialogType = action.payload.dialogType;
      const setMyDialog = action.payload.setMyDialog;
      const todo = action.payload.todo;
      if (dialogType === "edit") {
        setMyDialog({
          title: "تعديل المهمة",
          open: true,
          inputs: {
            id: todo.id,
            button: { title: "تعديل", isDisabled: true, color: "primary" },
            textField: { isTextField: true, text: todo.title },
            initialTextField: todo.title,
          },
          content: { isContent: false, text: "" },
        });
      } else if (dialogType === "delete") {
        setMyDialog({
          title: "حذف المهمة",
          open: true,
          inputs: {
            id: todo.id,
            button: { title: "حذف", isDisabled: false, color: "error" },
            textField: { isTextField: false, text: "" },
            initialTextField: todo.title,
          },
          content: { isContent: true, text: "هل انت متأكد من حذف هذه المهمة؟" },
        });
      }
      return currentState;

    case "edit":
      const editedTodos = [...currentState];
      const editDialog = action.payload.myDialog;
      for (const todo of editedTodos) {
        if (todo.id === editDialog.inputs.id) {
          todo.title = editDialog.inputs.textField.text;
        }
      }
      return editedTodos;

    case "delete":
      const deleteDialog = action.payload.myDialog;
      const deletedTodos = currentState.filter((todo) => {
        return todo.id !== deleteDialog.inputs.id;
      });
      return deletedTodos;
    default:
      break;
  }
}

export default TodosReducer;
