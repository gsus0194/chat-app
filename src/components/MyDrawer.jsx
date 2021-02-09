import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import LockIcon from "@material-ui/icons/Lock";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import ChatIcon from "@material-ui/icons/Chat";
import { ChatContext } from "../context/ChatProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { NavLink, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: { maxWidth: "100%" },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const MyDrawer = (props) => {
  const { history } = props;
  const pathname = history.location.pathname;
  const classes = useStyles();
  const { user, userLogin, userLogout } = useContext(ChatContext);
  const { themeState, themeChange } = useContext(ThemeContext);
  const [selectedIndex, setSelectedIndex] = useState(1);

  useEffect(() => {
    pathname === "/chat"
      ? setSelectedIndex(1)
      : pathname === "/settings"
      ? setSelectedIndex(2)
      : setSelectedIndex(1);
  }, [pathname]);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                className={classes.large}
                src={user.active ? user.user.photoURL : ""}
                aria-label="profile-pic"
                sizes="large"
              />
            }
            action={
              <IconButton onClick={themeChange}>
                {themeState ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            }
          />
          <CardContent>
            <Typography component="p" variant="h6">
              {user.active ? user.user.displayName : "User Name"}
            </Typography>
            <Typography component="p" variant="caption">
              {user.active ? user.user.email : "User Email"}
            </Typography>
          </CardContent>
        </Card>
        <List>
          {user.active ? (
            <>
              <ListItem
                button
                component={NavLink}
                to="/chat"
                selected={selectedIndex === 1}
                onClick={(e) => handleListItemClick(e, 1)}
              >
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Chat" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/settings"
                selected={selectedIndex === 2}
                onClick={(e) => handleListItemClick(e, 2)}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button onClick={userLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItem>
            </>
          ) : (
            <ListItem button onClick={userLogin}>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          )}
        </List>
      </div>
      <div>
        <Divider />
        <Box display="flex" alignItems="center" justifyContent="center" m={2}>
          <Typography variant="caption" component="p">
            Coded by{" "}
            <a
              href="https://jesusvillegas.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Jesús Villegas
            </a>
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default withRouter(MyDrawer);
