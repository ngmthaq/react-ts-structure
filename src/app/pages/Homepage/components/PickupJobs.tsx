import React from "react";
import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HorizontalCard from "app/components/HorizontalCard";
import ScrollContainer from "app/components/ScrollContainer";

const PickupJobs: React.FC<Props> = () => {
  const classes = useStyles();

  const onClickCard = (id: number) => {
    console.warn(id);
  };

  const onScrollContainer = () => {
    console.warn("Scroll to end of container");
  };

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>Title of pickup jobs</Typography>
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
    </Box>
  );
};

export default PickupJobs;

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
}));

interface Props {}
