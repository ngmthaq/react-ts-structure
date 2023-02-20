import { useState } from "react";
import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useAppTranslation from "app/hooks/useAppTranslation";

const Desktop = () => {
  const classes = useStyles();
  const { getLabel } = useAppTranslation();

  const [text] = useState("errors.406");
  const [status] = useState(406);

  document.title = getLabel(text);

  return (
    <Box className={classes.cont} id="desktop-page">
      <Box className={classes.wrapper}>
        <p className={classes.status}>{status}</p>
        <p className={classes.text}>{getLabel(text)}</p>
      </Box>
    </Box>
  );
};

export default Desktop;

const useStyles = makeStyles((theme: Theme) => ({
  cont: {
    backgroundColor: "#0d1834",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "100vh",
    width: "100vw",
    "& p": {
      margin: 0,
    },
  },

  wrapper: {
    textAlign: "center",
  },

  status: {
    color: "#bcbcbc",
    fontSize: 48,
    fontWeight: 400,
  },

  text: {
    color: "#909090",
  },
}));
