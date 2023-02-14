import React from "react";
import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import useThemeMode from "app/hooks/useThemeMode";

const App: React.FC<AppProps> = () => {
  const theme = useThemeMode();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <p>App</p>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

interface AppProps {}
