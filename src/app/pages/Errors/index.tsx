/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";
import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PATH_CONST from "app/const/path.const";
import useAppTranslation from "app/hooks/useAppTranslation";

const Error: React.FC<Props> = () => {
  const classes = useStyles();
  const error: any = useRouteError();
  const { getLabel } = useAppTranslation();

  const [text, setText]: [string, Function] = useState("");
  const [status, setStatus]: [number, Function] = useState(0);

  useEffect(() => {
    console.error(error);
    if (error.status === 404) {
      setStatus(404);
      setText("errors.404");
      document.title = getLabel("errors.404");
    } else {
      setStatus(500);
      setText("errors.500");
      document.title = getLabel("errors.500");
    }
  }, [error]);

  return (
    <Box className={classes.cont} id="error-page">
      <Box className={classes.wrapper}>
        <p className={classes.status}>{status}</p>
        <p className={classes.text}>{getLabel(text)}</p>
        <a className={classes.anchor} href={PATH_CONST.homepage.path}>
          {getLabel("button.backToHomepage")}
        </a>
      </Box>
    </Box>
  );
};

export default Error;

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

  anchor: {
    color: theme.palette.primary.dark,
    display: "inline-block",
    marginTop: 8,
  },
}));

interface Props {}
