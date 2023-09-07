import "./App.css";
import {
  Container,
  CardActions,
  Card,
  CardHeader,
  CardContent,
  Typography,
  createTheme,
  ThemeProvider,
  Stack,
} from "@mui/material";

import AddTodo from "./components/AddTodo";
import TodosProvider from "./contexts/TodosContext";
import Todos from "./components/Todos";
import ButtonNav from "./components/ButtonNav";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#016A70",
    },
    secondary: {
      main: "#A2C579",
    },
  },
  typography: {
    fontFamily: 'arabic'
  }
});
function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={myTheme}>
        <TodosProvider>
          <Container
            maxWidth='sm'
            sx={{
              height: "100dvh",
              justifyContent: "center",
              flexDirection: "column",
              display: "flex",
            }}>
            <Card
              variant='elevation'
              elevation={4}
              sx={{ background: myTheme.palette.primary.main }}>
              <CardHeader
                title={<Typography variant='h4'>مهامي</Typography>}
                sx={{ color: myTheme.palette.primary.contrastText }}
              />
              <CardContent>
                <Stack direction="column" justifyContent="center" alignItems="center" rowGap={2}>
                  <ButtonNav />
                  <Todos />
                </Stack>
              </CardContent>
              <CardActions>
                <AddTodo />
              </CardActions>
            </Card>
          </Container>
        </TodosProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
