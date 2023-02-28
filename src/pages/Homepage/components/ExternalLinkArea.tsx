import React from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const ExternalLinkArea: React.FC<Props> = () => {
  const classes = useStyles();

  return <p>External link area</p>;
};

export default ExternalLinkArea;

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {}
