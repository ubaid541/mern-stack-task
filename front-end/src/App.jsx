import { Box, Stack } from "@mui/material";
import "./App.css";
import Form from "./components/form/Form";
import QAList from "./components/list/QAList";

function App() {
  return (
    <Box>
      <Stack direction="col" justifyContent="center">
        <Form />
        <QAList />
      </Stack>
    </Box>
  );
}

export default App;
