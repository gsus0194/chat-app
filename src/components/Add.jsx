import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  TextField,
  Toolbar,
  useTheme,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatProvider";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - 260px)`,
      marginLeft: 260,
    },
  },
  input: {
    color: "inherit",
    padding: theme.spacing(1, 1, 1, 0),
  },
}));

const Add = () => {
  const classes = useStyles();
  const { user, addMessages } = useContext(ChatContext);
  const [message, setMessage] = useState("");

  const add = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
    addMessages(user.uid, message);
    setMessage("");
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid
          container
          justify="center"
          alignItems="center"
          component="form"
          onSubmit={add}
        >
          <Grid item xs={11}>
            <InputBase
              placeholder="Write a message..."
              className={classes.input}
              fullWidth
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton type="submit">
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Add;
