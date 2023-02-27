import React from "react";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import router from "app/router";
import useThemeMode from "app/hooks/useThemeMode";
import { checkMobileAgent } from "app/utils";
import Desktop from "app/pages/Desktop";
import DefaultLoading from "app/components/DefaultLoading";
import DefaultNotification from "app/components/DefaultNotification";

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
