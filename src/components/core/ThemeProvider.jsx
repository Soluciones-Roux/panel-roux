// src/components/core/ThemeProvider.jsx
import React from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import luxTheme from "../../theme/theme";

const ThemeProvider = ({ children }) => {
  return (
    <MUIThemeProvider theme={luxTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
