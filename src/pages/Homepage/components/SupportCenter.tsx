import React from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const SupportCenter: React.FC<Props> = () => {
  const classes = useStyles();

  return <p>Fixed link area</p>;
};

export default SupportCenter;

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {}
