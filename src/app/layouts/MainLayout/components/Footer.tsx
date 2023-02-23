import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Theme, Box, IconButton } from "@mui/material";
import { Home, History, TuneRounded } from "@mui/icons-material";
import PATH_CONST from "app/const/path.const";
import APP_CONST from "app/const/app.const";

const Footer: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.mainLayoutFooter}>
      <Link to={PATH_CONST.homepage.path}>
        <IconButton>
          <Home />
        </IconButton>
      </Link>
      <Link to={PATH_CONST.homepage.path}>
        <IconButton>
          <TuneRounded />
        </IconButton>
      </Link>
      <Link to={PATH_CONST.homepage.path}>
        <IconButton>
          <History />
        </IconButton>
      </Link>
    </Box>
  );
};

export default Footer;

const useStyles = makeStyles((theme: Theme) => ({
  mainLayoutFooter: {
    height: APP_CONST.footer.height,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    backgroundColor: theme.palette.grey[50],
  },
}));

interface Props {}
