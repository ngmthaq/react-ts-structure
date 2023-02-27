import React from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const PickupJobs: React.FC<Props> = () => {
  const classes = useStyles();

  return <p>Pickup jobs</p>;
};

export default PickupJobs;

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {}
