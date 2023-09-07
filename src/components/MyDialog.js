import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useTodos } from "../contexts/TodosContext";

function MyDialog() {
  const {
    myDialog,
    handleChangeMyDialogTextField,
    handleClickEdit,
    handleDeleteTodo,
    handleCloseMyDialog,
  } = useTodos();
  return (
    <Dialog open={myDialog.open} onClose={handleCloseMyDialog} dir='rtl'>
      <DialogTitle>{myDialog.title}</DialogTitle>
      <DialogContent>
        {myDialog.content.isContent ? (
          <DialogContentText>{myDialog.content.text}</DialogContentText>
        ) : (
          ""
        )}
        {myDialog.inputs.textField.isTextField ? (
          <TextField
            size='small'
            autoFocus
            label='تعديل المهمة'
            margin='dense'
            type='text'
            fullWidth
            variant='outlined'
            value={myDialog.inputs.textField.text}
            onChange={handleChangeMyDialogTextField}
          />
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions>
        {/* <Button >Cancel</Button> */}
        <Button
          variant='contained'
          color={myDialog.inputs.button.color}
          disabled={myDialog.inputs.button.isDisabled}
          onClick={
            myDialog.content.isContent ? handleDeleteTodo : handleClickEdit
          }>
          {myDialog.inputs.button.title}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MyDialog;
