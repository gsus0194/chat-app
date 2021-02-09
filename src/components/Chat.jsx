import { Box, Chip, Toolbar } from "@material-ui/core";
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
          user.uid === item.uid ? (
            <Box key={index} display="flex" justifyContent="flex-end" mb={2}>
              <Chip color="primary" label={item.text} />
            </Box>
          ) : (
            <Box key={index} display="flex" justifyContent="flex-start" mb={2}>
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
