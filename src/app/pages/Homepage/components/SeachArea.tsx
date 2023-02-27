import React from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const SearchArea: React.FC<Props> = () => {
  const classes = useStyles();

  return <p>Search area</p>;
};

export default SearchArea;

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {}
