import React, { useState } from "react";
import { styled } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import Chatbot from "./ChatBot/Chatbot";

const useStyles = styled((theme) => ({
  chatIcon: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    cursor: "pointer",
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ChatIcon className={classes.chatIcon} onClick={handleClick} />
      <Chatbot open={open} setOpen={setOpen} />
    </>
  );
};

export default Chat;
