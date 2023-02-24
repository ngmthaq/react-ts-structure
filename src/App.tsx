import React from "react";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import router from "app/router";
import useThemeMode from "app/hooks/useThemeMode";
import { checkMobileAgent } from "app/utils";
import Desktop from "app/pages/Desktop";
import DefaultLoading from "app/components/DefaultLoading";

const App: React.FC<AppProps> = () => {
  const theme = useThemeMode();
  const isMobile: boolean = checkMobileAgent();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isMobile ? <RouterProvider router={router} /> : <Desktop />}
        <DefaultLoading />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

interface AppProps {}
