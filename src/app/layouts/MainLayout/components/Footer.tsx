import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Theme, Box, IconButton } from "@mui/material";
import { Home, History, TuneRounded } from "@mui/icons-material";
import PATH_CONST from "app/const/path.const";
import APP_CONST from "app/const/app.const";

const Footer: React.FC<Props> = () => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <Box className={classes.mainLayoutFooter}>
      <Link to={PATH_CONST.homepage.path}>
        <IconButton color={location.pathname === PATH_CONST.homepage.path ? "primary" : "default"}>
          <Home />
        </IconButton>
      </Link>
      <Link to={PATH_CONST.setting.path}>
        <IconButton color={location.pathname === PATH_CONST.setting.path ? "primary" : "default"}>
          <TuneRounded />
        </IconButton>
      </Link>
      <Link to={PATH_CONST.history.path}>
        <IconButton color={location.pathname === PATH_CONST.history.path ? "primary" : "default"}>
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
