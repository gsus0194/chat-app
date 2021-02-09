import {
  Avatar,
  Box,
  Button,
  Container,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  pic: {
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(24),
      height: theme.spacing(24),
    },
  },
}));

const Settings = () => {
  const classes = useStyles();
  const { user, updateUserName, updatePhoto } = useContext(ChatContext);
  const [userName, setUserName] = useState(user.user.displayName);
  const [userNameError, setUserNameError] = useState(false);
  const [userNameErrorMsg, setUserNameErrorMsg] = useState(null);
  const [activateForm, setActivateForm] = useState(false);
  console.log(user);

  const updateUser = () => {
    if (!userName.trim()) {
      setUserNameError(true);
      setUserNameErrorMsg("User Name can't be empty");
    } else {
      setUserNameError(false);
    }

    if (userName.trim()) {
      updateUserName(userName, user.user);
      setActivateForm(false);
    }
  };

  const selectPhoto = (image) => {
    const imageClient = image.target.files[0];
    if (imageClient === undefined) {
      return;
    }

    updatePhoto(imageClient, user.user);
  };

  return (
    <Container>
      <Toolbar />
      <div className={classes.paper}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={5}>
          <Avatar
            src={user.user.photoURL}
            alt="User Photo"
            className={classes.pic}
          />
        </Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Name: {user.user.displayName}
        </Typography>
        <Typography variant="h6" component="h2" style={{ marginBottom: 20 }}>
          Email: {user.user.email}
        </Typography>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setActivateForm(true)}
            style={{ marginBottom: 25 }}
            fullWidth
          >
            Edit Name
          </Button>
          <input
            accept="image/*"
            id="button-file"
            hidden
            type="file"
            onChange={(e) => selectPhoto(e)}
            style={{ width: "100%" }}
          />
          <label htmlFor="button-file" style={{ width: "100%" }}>
            <Button
              variant="contained"
              color="secondary"
              component="span"
              startIcon={<PublishIcon />}
              fullWidth
            >
              Update Photo
            </Button>
          </label>
        </Box>
        {activateForm && (
          <Box display="flex" alignItems="center" mt={4} flexDirection="column">
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              error={userNameError}
              helperText={userNameError ? userNameErrorMsg : ""}
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={2}
              width="100%"
            >
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                onClick={() => setActivateForm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => updateUser()}
              >
                Update
              </Button>
            </Box>
          </Box>
        )}
      </div>
    </Container>
  );
};

export default Settings;
