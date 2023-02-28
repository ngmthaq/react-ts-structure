import React from "react";
import { Box, CircularProgress, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { convertHex2Rgba } from "utils";
import useAppSelector from "hooks/useAppSelector";

const DefaultLoading: React.FC<Props> = () => {
  const classes = useStyles();
  const isLoading = useAppSelector(state => state.common.isLoading);

  return isLoading ? (
    <Box className={classes.defaultLoadingContainer} id="default_loading_component">
      <CircularProgress />
    </Box>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default DefaultLoading;

const useStyles = makeStyles((theme: Theme) => ({
  defaultLoadingContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: convertHex2Rgba(theme.palette.common.black, 0.1),
    zIndex: theme.zIndex.modal,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface Props {}
