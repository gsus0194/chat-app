import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import ChatProvider from "./context/ChatProvider";
import ThemeProvider from "./context/ThemeProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
