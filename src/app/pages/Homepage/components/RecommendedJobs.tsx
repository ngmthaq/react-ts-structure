import React from "react";
import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HorizontalCard from "app/components/HorizontalCard";
import ScrollContainer from "app/components/ScrollContainer";
import { Link } from "react-router-dom";
import PATH_CONST from "app/const/path.const";
import FORMAT_CONST from "app/const/format.const";
import APP_CONST from "app/const/app.const";

const RecommendedJobs: React.FC<Props> = () => {
  const classes = useStyles();

  const onClickCard = (id: number) => {
    console.warn(id);
  };

  const onScrollContainer = () => {
    console.warn("Scroll to end of container");
  };

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>Title of recommended jobs</Typography>
      <ScrollContainer onScrollToEnd={onScrollContainer}>
        {MOCK_DATA.map((card: any, index: number) => (
          <HorizontalCard
            key={index}
            avatar={card.avatar}
            name={card.name}
            location={card.location}
            description={card.description}
            onClick={() => onClickCard(index)}
          />
        ))}
      </ScrollContainer>
      <Box display="flex" justifyContent="center">
        <Link
          className={classes.button}
          to={FORMAT_CONST.jobPath
            .replace(":path", PATH_CONST.jobs.path)
            .replace(":mode", APP_CONST.jobModes.recommended)}
        >
          Open jobs
        </Link>
      </Box>
    </Box>
  );
};

export default RecommendedJobs;

const MOCK_DATA: any = [
  {
    avatar: "",
    name: "Thang",
    location: "Vietnam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur nulla quisquam quo, facere unde recusandae sit explicabo? Id culpa molestiae sit quae! Soluta deleniti ratione incidunt maiores reiciendis? Odio.",
  },
  {
    avatar: "",
    name: "Thang",
    location: "Vietnam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur nulla quisquam quo, facere unde recusandae sit explicabo? Id culpa molestiae sit quae! Soluta deleniti ratione incidunt maiores reiciendis? Odio.",
  },
  {
    avatar: "",
    name: "Thang",
    location: "Vietnam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur nulla quisquam quo, facere unde recusandae sit explicabo? Id culpa molestiae sit quae! Soluta deleniti ratione incidunt maiores reiciendis? Odio.",
  },
  {
    avatar: "",
    name: "Thang",
    location: "Vietnam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur nulla quisquam quo, facere unde recusandae sit explicabo? Id culpa molestiae sit quae! Soluta deleniti ratione incidunt maiores reiciendis? Odio.",
  },
  {
    avatar: "",
    name: "Thang",
    location: "Vietnam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur nulla quisquam quo, facere unde recusandae sit explicabo? Id culpa molestiae sit quae! Soluta deleniti ratione incidunt maiores reiciendis? Odio.",
  },
  {
    avatar: "",
    name: "Thang",
    location: "Vietnam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur nulla quisquam quo, facere unde recusandae sit explicabo? Id culpa molestiae sit quae! Soluta deleniti ratione incidunt maiores reiciendis? Odio.",
  },
  {
    avatar: "",
    name: "Thang",
    location: "Vietnam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur nulla quisquam quo, facere unde recusandae sit explicabo? Id culpa molestiae sit quae! Soluta deleniti ratione incidunt maiores reiciendis? Odio.",
  },
  {
    avatar: "",
    name: "Thang",
    location: "Vietnam",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur pariatur nulla quisquam quo, facere unde recusandae sit explicabo? Id culpa molestiae sit quae! Soluta deleniti ratione incidunt maiores reiciendis? Odio.",
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingBottom: 8,
  },

  title: {
    fontWeight: 600,
    padding: 8,
  },

  button: {
    display: "inline-block",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey[50],
    textDecoration: "none",
    textAlign: "center",
    borderRadius: 8,
    minWidth: 120,
    marginTop: 8,
    padding: 8,
  },
}));

interface Props {}
