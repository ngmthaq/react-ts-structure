import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Box } from "@mui/material";
import APP_CONST from "const/app.const";
import Header from "./components/Header";
import Footer from "./components/Footer";

const MainLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.mainLayout}>
      <Header />
      <Box className={classes.childrent}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;

const useStyles = makeStyles((theme: Theme) => ({
  mainLayout: {
    height: "100%",
    backgroundColor: theme.palette.grey[300],
  },

  childrent: {
    height: `calc(100% - ${APP_CONST.header.height}px - ${APP_CONST.footer.height}px)`,
    overflowX: "hidden",
    overflowY: "scroll",
  },
}));

interface Props {
  children: React.ReactNode;
}
