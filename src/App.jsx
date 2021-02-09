import React, { useContext, useEffect, useState } from "react";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { auth } from "./utils/firebase";
import { ChatContext } from "./context/ChatProvider";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from "react-router-dom";
import Settings from "./components/Settings";

const App = (props) => {
  const { loadMessages } = useContext(ChatContext);
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    detectUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detectUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user);
        loadMessages();
      } else {
        setFirebaseUser(null);
      }
    });
  };

  const PrivateRoute = ({ component, path, ...rest }) => {
    if (localStorage.getItem("user-chat")) {
      const userStorage = JSON.parse(localStorage.getItem("user-chat"));
      if (userStorage.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest} />;
      } else {
        return <Redirect to="login" {...rest} />;
      }
    } else {
      return <Redirect to="login" {...rest} />;
    }
  };

  return (
    <Router>
      <Navbar>
        {firebaseUser !== false ? (
          <Switch>
            <PrivateRoute component={Chat} path="/chat" />
            <PrivateRoute component={Settings} path="/settings" />
            <Route component={Login} path="/login" />
            <Route component={Login} path="/" />
          </Switch>
        ) : (
          <p>Loading...</p>
        )}
      </Navbar>
    </Router>
  );
  //  <Navbar>{firebaseUser !== false ? <Chat /> : <Home />}</Navbar>;
};

export default App;
