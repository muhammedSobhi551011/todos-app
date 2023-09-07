import { Stack, Button, TextField, useTheme } from "@mui/material";
import { useTodos } from "../contexts/TodosContext";

export default function AddTodo() {
  const myTheme = useTheme();
  const { handleAddTodos, newTitle, setNewTitle } = useTodos();
  return (
    <Stack spacing={2} direction='row' width='100%'>
      <Button
        variant='contained'
        color='secondary'
        disabled={newTitle === "" ? true : false}
        onClick={handleAddTodos}>
        اضافة
      </Button>
      <TextField
        label='اضف مهمة'
        size='small'
        variant='outlined'
        color='secondary'
        fullWidth
        value={newTitle}
        inputProps={{
          sx: {
            color: myTheme.palette.primary.contrastText,
            direction: "rtl",
          },
        }}
        InputLabelProps={{
          sx: {
            color: myTheme.palette.secondary.contrastText,
          },
        }}
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
      />
    </Stack>
  );
}
