import { Avatar, Box, Chip, Toolbar } from "@material-ui/core";
import React, { useContext, useRef, useEffect } from "react";
import Add from "./Add";
import { ChatContext } from "../context/ChatProvider";

const Chat = () => {
  const { user, messages } = useContext(ChatContext);
  const refChatZone = useRef(null);

  useEffect(() => {
    console.log(refChatZone);
    refChatZone.current.scrollTop = refChatZone.current.scrollHeight;
  }, [messages]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      style={{ height: "100vh" }}
    >
      <Box
        mt={3}
        px={2}
        style={{
          height: "90%",
          overflowY: "scroll",
        }}
        ref={refChatZone}
      >
        {messages.map((item, index) =>
          user.user.uid === item.uid ? (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              mb={2}
            >
              <Chip
                color="primary"
                label={item.text}
                style={{ marginRight: 10 }}
              />
              <Avatar src={user.user.photoURL} />
            </Box>
          ) : (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              mb={2}
            >
              <Avatar src={item.photo} style={{ marginRight: 10 }} />
              <Chip color="secondary" label={item.text} />
            </Box>
          )
        )}
      </Box>
      <Toolbar />
      <Add />
    </Box>
  );
};

export default Chat;
