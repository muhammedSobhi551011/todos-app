import { Grid } from "@mui/material";
import Todo from "../components/Todo";
import { useTodos } from "../contexts/TodosContext";
import TodoProvider from "../contexts/TodoContext";

function Todos() {
  const { todos, todosType } = useTodos();
  const doneTodos = todos.filter((todo) => {
    return todo.isDone;
  });
  const notDoneTodos = todos.filter((todo) => {
    return !todo.isDone;
  });
  const currentTodos = todosType.all
    ? todos
    : todosType.done
    ? doneTodos
    : notDoneTodos;
  return (
    <Grid container spacing={2}>
      {currentTodos.map((todo) => {
        return (
          <TodoProvider key={todo.id} sTodo={todo}>
            <Todo />
          </TodoProvider>
        );
      })}
    </Grid>
  );
}

export default Todos;
