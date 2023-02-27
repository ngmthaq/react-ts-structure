import React from "react";
import { Avatar, Box, IconButton, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LocationOn } from "@mui/icons-material";
import clsx from "clsx";

const ScrollContainer: React.FC<Props> = ({ children, className, onScrollToEnd }) => {
  const classes = useStyles();

  const onScroll = (e: any) => {
    const element: HTMLElement = e.target;
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const screenWidth = window.screen.width;

    if (scrollWidth - screenWidth - scrollLeft <= 0) {
      onScrollToEnd();
    }
  };

  return (
    <Box className={clsx(classes.container, className ? className : "")} onScroll={onScroll}>
      {children}
    </Box>
  );
};

export default ScrollContainer;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    width: "100%",
    overflowX: "scroll",
  },
}));

interface Props {
  children: React.ReactNode;
  className?: string;
  onScrollToEnd: LoadMoreFunction;
}

type LoadMoreFunction = () => void;
