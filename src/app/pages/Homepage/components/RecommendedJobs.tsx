import React from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const RecommendedJobs: React.FC<Props> = () => {
  const classes = useStyles();

  return <p>Recommended jobs</p>;
};

export default RecommendedJobs;

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {}
