import React, { createContext, useEffect, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
} from "@material-ui/core";

export const ThemeContext = createContext();

const ThemeProvider = (props) => {
  const [themeState, setThemeState] = useState(false);

  const muiTheme = createMuiTheme({
    palette: {
      type: themeState ? "dark" : "light",
    },
  });

  const theme = responsiveFontSizes(muiTheme);

  useEffect(() => {
    const lastTheme = localStorage.getItem("themeChat");
    lastTheme === "true" ? setThemeState(true) : setThemeState(false);
  }, []);

  const themeChange = () => {
    const body = document.getElementsByTagName("body")[0];
    body.style.cssText = "transition: background 0.5s ease";

    localStorage.setItem("themeChat", !themeState);
    setThemeState(!themeState);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeContext.Provider value={{ themeState, themeChange }}>
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
