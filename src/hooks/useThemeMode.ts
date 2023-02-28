import { useEffect, useState } from "react";
import { Theme } from "@mui/material";
import getCustomTheme from "theme/mui";
import { ThemeMode } from "spec/theme";
import useAppSelector from "./useAppSelector";

const useThemeMode = () => {
  const mode: ThemeMode = useAppSelector(state => state.common.mode);
  const customTheme: Theme = getCustomTheme(mode);

  const [theme, setTheme] = useState(customTheme);

  useEffect(() => {
    setTheme(getCustomTheme(mode));
    document.body.className = mode;
  }, [mode]);

  return theme;
};

export default useThemeMode;
