import React from "react";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import router from "app/router";
import useThemeMode from "app/hooks/useThemeMode";

const App: React.FC<AppProps> = () => {
  const theme = useThemeMode();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

interface AppProps {}
