import { useTheme } from "@emotion/react";
import {
  Grid,
  Paper,
  Stack,
  Checkbox,
  Typography,
  IconButton,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTodo } from "../contexts/TodoContext";

export default function Todo() {
  const myTheme = useTheme();
  const { handleCheckTodo, sTodo , handleMyDialog} = useTodo();
  return (
    <Grid item xs={12}>
      <Paper elevation={2} sx={{ background: myTheme.palette.secondary.light }}>
        <Stack direction='row-reverse' justifyContent='space-between'>
          <Stack direction='row-reverse' alignItems='center'>
            <Checkbox
              checked={sTodo.isDone}
              onChange={() => {
                handleCheckTodo(sTodo.id);
              }}
              icon={
                <RadioButtonUncheckedIcon
                  sx={{ color: myTheme.palette.primary.light }}
                />
              }
              checkedIcon={
                <CheckCircleOutlineIcon
                  sx={{ color: myTheme.palette.primary.dark }}
                />
              }
            />
            <Typography
              sx={{
                color: myTheme.palette.secondary.contrastText,
                direction: "rtl"
              }}>
              {sTodo.title}
            </Typography>
          </Stack>
          <Stack direction='row-reverse'>
            <IconButton
              aria-label='edit'
              onClick={() => {
                handleMyDialog("edit", { title: sTodo.title, id: sTodo.id });
              }}>
              <EditIcon sx={{ color: myTheme.palette.primary.light }} />
            </IconButton>
            <IconButton
              aria-label='delete'
              onClick={() => {
                handleMyDialog("delete", { title: sTodo.title, id: sTodo.id });
              }}>
              <DeleteIcon sx={{ color: myTheme.palette.error.main }} />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
}
