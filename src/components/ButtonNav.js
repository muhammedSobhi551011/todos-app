import { useTheme } from "@emotion/react";
import { ButtonGroup, Button } from "@mui/material";
import { useTodos } from "../contexts/TodosContext";

function ButtonNav() {
  const myTheme = useTheme();
  const { handleTabClick } = useTodos();
  return (
    <ButtonGroup
      variant='outlined'
      color='secondary'
      aria-label='outlined primary button group'>
      <Button
        value='not-done'
        onClick={(e) => {
          handleTabClick(e.target.value);
        }}
        sx={{ color: myTheme.palette.primary.contrastText }}>
        غير منجز
      </Button>
      <Button
        value='done'
        onClick={(e) => {
          handleTabClick(e.target.value);
        }}
        sx={{ color: myTheme.palette.primary.contrastText }}>
        منجز
      </Button>
      <Button
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
