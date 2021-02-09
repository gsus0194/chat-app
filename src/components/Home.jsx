import { Box, Container, Typography } from "@material-ui/core";
import React from "react";

const Home = () => {
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
        <Typography variant="h4" component="h1" align="center">
          Work In Progress
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
