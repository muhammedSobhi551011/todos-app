import { Grid } from "@mui/material";
import Todo from "../components/Todo";
import { useTodos } from "../contexts/TodosContext";
import TodoProvider from "../contexts/TodoContext";

function Todos() {
  const { currentTodos} = useTodos();
  return (
    <Grid container spacing={2} maxHeight={300} overflow={"auto"} padding={2}>
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
