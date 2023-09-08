import { useTheme } from "@emotion/react";
import { ButtonGroup, Button } from "@mui/material";
import { useTodos } from "../contexts/TodosContext";

function ButtonNav() {
  const myTheme = useTheme();
  const { handleTabClick, todosType } = useTodos();
  return (
    <ButtonGroup
      variant='outlined'
      color='secondary'
      aria-label='outlined primary button group'>
      <Button
        variant={todosType.all ? "outlined" : todosType.done?"outlined":"contained"}
        value='not-done'
        onClick={(e) => {
          handleTabClick(e.target.value);
        }}
        sx={{ color: myTheme.palette.primary.contrastText }}>
        غير منجز
      </Button>
      <Button
        variant={todosType.all ? "outlined" : todosType.done?"contained":"outlined"}
        value='done'
        onClick={(e) => {
          handleTabClick(e.target.value);
        }}
        sx={{ color: myTheme.palette.primary.contrastText }}>
        منجز
      </Button>
      <Button
        variant={todosType.all ? "contained" : "outlined"}
        value='all'
        onClick={(e) => {
          handleTabClick(e.target.value);
        }}
        sx={{ color: myTheme.palette.primary.contrastText }}>
        الكل
      </Button>
    </ButtonGroup>
  );
}

export default ButtonNav;
