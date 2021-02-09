import { createContext, useEffect, useState } from "react";
import { db, auth, provider } from "../utils/firebase";

export const ChatContext = createContext();

const ChatProvider = (props) => {
  const userData = {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    active: null,
  };

  const [user, setUser] = useState(userData);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    detectUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detectUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          active: true,
        });
        loadMessages();
      } else {
        setUser({
          uid: null,
          email: null,
          displayName: null,
          photoURL: null,
          active: false,
        });
      }
    });
  };

  const userLogin = async () => {
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = () => {
    auth.signOut();
  };

  const loadMessages = () => {
    db.collection("chat")
      .orderBy("date")
      .onSnapshot((query) => {
        const messagesArray = query.docs.map((item) => item.data());
        setMessages(messagesArray);
      });
  };

  const addMessages = async (uid, text) => {
    try {
      await db.collection("chat").add({
        date: Date.now(),
        text,
        uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{ user, userLogin, userLogout, messages, addMessages }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
