import React from "react";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import router from "router";
import useThemeMode from "hooks/useThemeMode";
import { checkMobileAgent } from "utils";
import Desktop from "pages/Desktop";
import DefaultLoading from "components/DefaultLoading";
import DefaultNotification from "components/DefaultNotification";

const App: React.FC<Props> = () => {
  const theme = useThemeMode();
  const isMobile: boolean = checkMobileAgent();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isMobile ? <RouterProvider router={router} /> : <Desktop />}
        <DefaultLoading />
        <DefaultNotification />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

interface Props {}
