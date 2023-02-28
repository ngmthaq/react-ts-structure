import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Theme, Box } from "@mui/material";
import PATH_CONST from "const/path.const";
import APP_CONST from "const/app.const";

const Header: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.mainLayoutHeader}>
      <Link className={classes.link} to={PATH_CONST.homepage.path}>
        HAJ
      </Link>
    </Box>
  );
};

export default Header;

const useStyles = makeStyles((theme: Theme) => ({
  mainLayoutHeader: {
    height: APP_CONST.header.height,
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8,
  },

  link: {
    textDecoration: "none",
    padding: 8,
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.grey[50],
    minWidth: 96,
    display: "inline-block",
    textAlign: "center",
    borderRadius: 8,
  },
}));

interface Props {}
