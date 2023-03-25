import React, { useState } from "react";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const useStyles = styled((theme) => ({
  chatbot: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(2),
    zIndex: 9999,
    backgroundColor: "#ffffff",
    borderRadius: theme.spacing(1),
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
}));

const Chatbot = ({ open, setOpen }) => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    // code to handle user input and get bot response goes here
    setOutput(input);
    setInput("");
  };

  return open ? (
    <div className={classes.chatbot}>
      <Button onClick={handleClose}>Close</Button>
      <TextField
        id="input"
        label="Type your message here"
        value={input}
        onChange={handleInput}
      />
      <Button onClick={handleSend}>Send</Button>
      {output && <p>{output}</p>}
    </div>
  ) : null;
};

export default Chatbot;
