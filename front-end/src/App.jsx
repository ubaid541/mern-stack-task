import { Box, Stack } from "@mui/material";
import "./App.css";
import Form from "./components/form/Form";
import QAList from "./components/list/QAList";
import Chat from "./components/Chat";

function App() {
  return (
    <Box>
      <Stack direction="col" justifyContent="center">
        <Form />
        {/* <QAList />
        <Chat /> */}
      </Stack>
    </Box>
  );
}

export default App;
