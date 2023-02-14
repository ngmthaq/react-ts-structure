import { createTheme, Theme } from "@mui/material/styles";
import { ThemeMode } from "spec/theme";
import lightPalette from "../scss/modules/light.module.scss";
import darkPalette from "../scss/modules/dark.module.scss";
import zIndexRaw from "../scss/modules/zIndex.module.scss";
import breakpointsRaw from "../scss/modules/breakpoints.module.scss";

const zIndex = Object.entries(zIndexRaw).reduce(
  (zIndexObj: any, data: [string, string]) => {
    const [key, value] = data;
    zIndexObj[key] = parseInt(value);

    return zIndexObj;
  },
  {}
);

const breakpointsValue = Object.entries(breakpointsRaw).reduce(
  (breakpointObj: any, data: [string, string]) => {
    const [key, value] = data;
    breakpointObj[key] = parseInt(value);

    return breakpointObj;
  },
  {}
);

const light = Object.entries(lightPalette).reduce(
  (palette: any, data: [string, any]) => {
    const [key, value] = data;
    const spliter = key.split("_");
    const prefix = spliter[0];
    const modifier = spliter[1];

    if (Object.keys(palette).includes(prefix)) {
      palette[prefix] = Object.assign(palette[prefix], { [modifier]: value });
    } else {
      palette[prefix] = { [modifier]: value };
    }

    return palette;
  },
  {}
);

const dark = Object.entries(darkPalette).reduce(
  (palette: any, data: [string, any]) => {
    const [key, value] = data;
    const spliter = key.split("_");
    const prefix = spliter[0];
    const modifier = spliter[1];

    if (Object.keys(palette).includes(prefix)) {
      palette[prefix] = Object.assign(palette[prefix], { [modifier]: value });
    } else {
      palette[prefix] = { [modifier]: value };
    }

    return palette;
  },
  {}
);

const palette = {
  light: light,
  dark: dark,
};

const getCustomTheme = (mode: ThemeMode): Theme => {
  const paletteMode = palette[mode];
  return createTheme({
    palette: Object.assign(
      {
        mode: mode,
      },
      paletteMode
    ),
    zIndex: zIndex,
    breakpoints: {
      values: breakpointsValue,
    },
  });
};

export default getCustomTheme;
