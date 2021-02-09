import { createContext, useEffect, useState } from "react";
import { db, auth, provider, storage } from "../utils/firebase";

export const ChatContext = createContext();

const ChatProvider = (props) => {
  const userData = {
    active: false,
    user: {
      uid: null,
      displayName: null,
      email: null,
      photoURL: null,
    },
  };

  const [user, setUser] = useState(userData);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getActiveUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userLogin = async () => {
    try {
      const res = await auth.signInWithPopup(provider);
      const tmpUser = {
        uid: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
      };
      const userDB = await db.collection("users").doc(tmpUser.email).get();
      if (userDB.exists) {
        setUser({
          ...user,
          user: userDB.data(),
          active: true,
        });
        localStorage.setItem("user-chat", JSON.stringify(userDB.data()));
      } else {
        await db.collection("users").doc(tmpUser.email).set(tmpUser);
        setUser({
          ...user,
          user: tmpUser,
          active: true,
        });
        localStorage.setItem("user-chat", JSON.stringify(tmpUser));
      }
    } catch (error) {
      console.log(error);
      setUser(...userData);
    }
  };

  const getActiveUser = () => {
    if (localStorage.getItem("user-chat")) {
      setUser({
        ...user,
        user: JSON.parse(localStorage.getItem("user-chat")),
        active: true,
      });
    }
  };

  const userLogout = () => {
    auth.signOut();
    localStorage.removeItem("user-chat");
    setUser({
      ...userData,
    });
  };

  const loadMessages = () => {
    db.collection("chat")
      .orderBy("date")
      .onSnapshot((query) => {
        const messagesArray = query.docs.map((item) => item.data());
        setMessages(messagesArray);
      });
  };

  const addMessages = async (uid, text, photo) => {
    try {
      await db.collection("chat").add({
        date: Date.now(),
        text,
        uid,
        photo,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserName = async (userName, activeUser) => {
    try {
      await db.collection("users").doc(activeUser.email).update({
        displayName: userName,
      });

      const tmpUser = {
        uid: activeUser.uid,
        displayName: userName,
        email: activeUser.email,
        photoURL: activeUser.photoURL,
      };

      setUser({
        ...user,
        user: tmpUser,
        active: true,
      });
      localStorage.setItem("user-chat", JSON.stringify(tmpUser));
    } catch (error) {
      console.log(error);
    }
  };

  const updatePhoto = async (photo, activeUser) => {
    console.log("photo >>> ", photo);
    console.log("user >>> ", activeUser);
    try {
      const imageRef = await storage
        .ref()
        .child(activeUser.email)
        .child("profile_photo");
      await imageRef.put(photo);
      const imageURL = await imageRef.getDownloadURL();

      await db.collection("users").doc(activeUser.email).update({
        photoURL: imageURL,
      });

      const tmpUser = {
        uid: activeUser.uid,
        displayName: activeUser.displayName,
        email: activeUser.email,
        photoURL: imageURL,
      };
      setUser({
        ...user,
        user: tmpUser,
        active: true,
      });
      localStorage.setItem("user-chat", JSON.stringify(tmpUser));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        messages,
        addMessages,
        loadMessages,
        updateUserName,
        updatePhoto,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
