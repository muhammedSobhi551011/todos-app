import { Grid } from "@mui/material";
import Todo from "../components/Todo";
import { useTodos } from "../contexts/TodosContext";
import TodoProvider from "../contexts/TodoContext";
import { useTheme } from "@emotion/react";

function Todos() {
  const { currentTodos } = useTodos();
  const myTheme = useTheme()
  return (
    <Grid
      container
      spacing={2}
      maxHeight={300}
      overflow={"auto"}
      padding={2}
      justifyContent={"center"}>
      {currentTodos.length === 0 ? (
        <h4 style={{ color: myTheme.palette.primary.contrastText, opacity:0.7}}>...فارغ</h4>
      ) : (
        currentTodos.map((todo) => {
          return (
            <TodoProvider key={todo.id} sTodo={todo}>
              <Todo />
            </TodoProvider>
          );
        })
      )}
    </Grid>
  );
}

export default Todos;
