import { Box, Container, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ChatContext } from "../context/ChatProvider";

const Login = (props) => {
  const { history } = props;
  const { user } = useContext(ChatContext);

  useEffect(() => {
    if (user.active) {
      history.push("/chat");
    }
  }, [user.active, history]);

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
        flexDirection="column"
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          You must Sign in to participate in the chat
        </Typography>
      </Box>
    </Container>
  );
};

export default withRouter(Login);
