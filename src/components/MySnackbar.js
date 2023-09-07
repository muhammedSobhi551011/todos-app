import { Snackbar, Alert } from "@mui/material";
import { useTodos } from "../contexts/TodosContext";

function MySnackbar() {
  const { snackbar, handleHideSnackbar } = useTodos();
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2300}
      onClose={handleHideSnackbar}>
      <Alert severity='success' sx={{ width: "100%" }}>
        {snackbar.text}
      </Alert>
    </Snackbar>
  );
}

export default MySnackbar;
