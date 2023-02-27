import React, { useState } from "react";
import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import APP_CONST from "app/const/app.const";
import { ViewMode } from "spec/app.const";

const ToggleUISwitcher: React.FC<Props> = ({ mode, onChangeMode }) => {
  const classes = useStyles();

  const [currentIndex, setCurrentIndex] = useState(mode.id);

  const onChangeIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
    onChangeMode(newIndex);
  };

  return (
    <Box className={classes.switcherContainer}>
      {Object.values(APP_CONST.viewModes).map(({ id, alt, Icon }) => (
        <Button
          key={id}
          title={alt}
          onClick={() => onChangeIndex(id)}
          className={id === currentIndex ? classes.switcherButtonActive : classes.switcherButton}
        >
          <Icon className={id === currentIndex ? classes.switcherIconActive : classes.switcherIcon} />
        </Button>
      ))}
    </Box>
  );
};

export default ToggleUISwitcher;

const useStyles = makeStyles((theme: Theme) => ({
  switcherContainer: {
    display: "inline-block",
    backgroundColor: theme.palette.common.white,
    borderRadius: 8,
    overflow: "hidden",
  },

  switcherButton: {
    borderRadius: 0,
    backgroundColor: "transparent !important",
  },

  switcherButtonActive: {
    borderRadius: 0,
    backgroundColor: theme.palette.grey[900] + " !important",
  },

  switcherIcon: {
    color: theme.palette.grey[900],
  },

  switcherIconActive: {
    color: theme.palette.common.white,
  },
}));

interface Props {
  mode: ViewMode;
  onChangeMode: CallableFunction;
}
