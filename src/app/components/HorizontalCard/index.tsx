import React from "react";
import { Avatar, Box, IconButton, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LocationOn } from "@mui/icons-material";
import clsx from "clsx";

const HorizontalCard: React.FC<Props> = ({ avatar, name, location, description, onClick }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container} onClick={onClick}>
      <Box className={classes.header}>
        <Avatar alt={name} src={avatar} className={classes.avatar}>
          {name.charAt(0)}
        </Avatar>
        <Box>
          <Typography className={clsx("ellipsis", classes.name)}>{name}</Typography>
          <Box className={classes.locationContainer}>
            <LocationOn fontSize="small" color="primary" />
            <Typography className={clsx("ellipsis", classes.locationName)}>{location}</Typography>
          </Box>
        </Box>
      </Box>
      <Typography className={clsx("ellipsis", classes.description)}>{description}</Typography>
    </Box>
  );
};

export default HorizontalCard;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "72vw",
    padding: 16,
    backgroundColor: theme.palette.grey[50],
    borderRadius: 8,
    flexShrink: 0,
    marginLeft: 8,

    "&:last-child": {
      marginRight: 8,
    },
  },

  header: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 8,
  },

  avatar: {
    marginRight: 8,
  },

  locationContainer: {
    display: "flex",
    alignItems: "center",
  },

  name: {
    fontWeight: 500,
  },

  locationName: {
    fontSize: 12,
  },

  description: {
    WebkitLineClamp: 3,
    fontSize: 14,
  },
}));

interface Props {
  avatar: string;
  name: string;
  location: string;
  description: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
