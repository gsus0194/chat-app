import React, { useContext } from "react";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { ChatContext } from "./context/ChatProvider";

const App = () => {
  const { user } = useContext(ChatContext);

  return user !== null ? (
    <Navbar>{user.active ? <Chat /> : <Home />}</Navbar>
  ) : (
    <div>Loading</div>
  );
};

export default App;
