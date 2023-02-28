import React, { useEffect, useState } from "react";
import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import APP_CONST from "app/const/app.const";

const OptionButton: React.FC<Props> = ({ name, classes, type, checked, id, title, onChange, value }) => {
  const defaultClasses = useStyles();

  const [isChecked, setIsChecked] = useState(Boolean(checked));

  const onInputChange = (e: any) => {
    setIsChecked(e.target.checked);
    if (onChange) {
      onChange(e);
    }
    if (type === "radio") {
      window.dispatchEvent(
        new CustomEvent<CustomEventData>(APP_CONST.customEvents.optionButtonChanged, { detail: { id: id } }),
      );
    }
  };

  const onOptionButtonChanged = (e: any) => {
    if (e.detail.id !== id) {
      setIsChecked(false);
    }
  };

  useEffect(() => {
    window.addEventListener(APP_CONST.customEvents.optionButtonChanged, onOptionButtonChanged);

    return () => window.removeEventListener(APP_CONST.customEvents.optionButtonChanged, onOptionButtonChanged);
  });

  return (
    <Box
      className={clsx(defaultClasses.root, classes && classes.root ? classes.root : "", {
        [defaultClasses.checked]: isChecked,
        [classes && classes.checked ? classes.checked : ""]: isChecked,
      })}
    >
      <input
        id={id}
        type={type}
        value={value}
        checked={isChecked}
        className={clsx(defaultClasses.input, classes && classes.input ? classes.input : "")}
        name={name}
        onChange={onInputChange}
      />
      <label
        htmlFor={id}
        className={clsx("ellipsis", defaultClasses.label, classes && classes.label ? classes.label : "", {
          [defaultClasses.checked]: isChecked,
          [classes && classes.checked ? classes.checked : ""]: isChecked,
        })}
      >
        {title}
      </label>
    </Box>
  );
};

export default OptionButton;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.grey[100],
    borderRadius: 24,
    padding: "0 8px",
    width: "30vw",
    maxWidth: 120,
  },

  input: {
    display: "none",
  },

  label: {
    color: theme.palette.grey[900],
    width: "100%",
    margin: "6px 0",
    textAlign: "center",
    backgroundColor: "transparent !important",
  },

  checked: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey[50],
  },
}));

interface Props {
  id: string;
  name: string;
  title: string;
  type: "radio" | "checkbox";
  value: string;
  checked?: boolean;
  classes?: Classes;
  onChange?: CallableFunction;
}

interface Classes {
  root?: string;
  input?: string;
  label?: string;
  checked?: string;
}

interface CustomEventData {
  id: string;
}
