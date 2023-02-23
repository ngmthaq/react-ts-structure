import React, { useMemo, useEffect, useState } from "react";
import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import APP_CONST from "app/const/app.const";
import Swiper from "app/swiper";
import { getRandomInRange } from "app/utils";
import MainLayout from "app/layouts/MainLayout";
import { Card } from "spec/swiper";
import ToggleUISwitcher from "./components/ToggleUISwitcher";

const Homepage: React.FC<Props> = () => {
  const classes = useStyles();
  const swiper = useMemo(() => new Swiper(), []);
  const defaultMode = useMemo(() => APP_CONST.viewModes.swipe, []);

  const [mode, setMode] = useState(defaultMode);

  const onChangeMode = (id: number) => {
    let newMode = Object.values(APP_CONST.viewModes).find(m => m.id === id);
    if (newMode) {
      setMode(newMode);
    }
  };

  useEffect(() => {
    let cont = document.getElementById("swiper");
    if (cont && swiper) {
      if (mode.id === APP_CONST.viewModes.swipe.id) {
        swiper.init("swiper");
        swiper.createCards(mockCards());

        swiper.onUpdated((nextCard, totalCardList) => {
          if (totalCardList.length <= 5) {
            swiper.appendCards(mockCards(5));
          }
        });
      } else if (mode.id === APP_CONST.viewModes.scroll.id) {
        swiper.unmount();
      }
    }
  }, [swiper, mode]);

  return (
    <MainLayout>
      <Box className={classes.nav}>
        <Typography className={classes.navTitle}>Select view mode</Typography>
        <ToggleUISwitcher mode={mode} onChangeMode={onChangeMode} />
      </Box>
      <Box id="swiper" className={mode.id === APP_CONST.viewModes.swipe.id ? classes.swiper : "hide"}></Box>
      <Box className={mode.id === APP_CONST.viewModes.scroll.id ? "show" : "hide"}></Box>
    </MainLayout>
  );
};

export default Homepage;

const useStyles = makeStyles((theme: Theme) => ({
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    height: APP_CONST.nav.height,
  },

  navTitle: {
    fontWeight: 600,
  },

  swiper: {
    height: `calc(100% - ${APP_CONST.nav.height}px) !important`,
    overflow: "hidden",
  },
}));

interface Props {}

const mockCards = (max: number = 10): Card[] => {
  let output: Card[] = [];
  let types: string[] = [
    "sky",
    "beach",
    "sea",
    "mountain",
    "home",
    "city",
    "dog",
    "house",
    "train",
    "cat",
    "thor",
    "spiderman",
    "forest",
  ];

  for (let index = 0; index < max; index++) {
    output.push({
      img: "https://source.unsplash.com/random/1000x1000/?" + types[Math.floor(Math.random() * types.length)],
      id: getRandomInRange(1, 100000).toString() + "___" + index,
      className: "card",
      additionalData: { foo: "bar" },
      onLike: (card, id, additionalData) => {
        console.log("LIKE", { card, id, additionalData });
      },
      onDislike: (card, id, additionalData) => {
        console.log("DISLIKE", { card, id, additionalData });
      },
      onSkip: (card, id, additionalData) => {
        console.log("SKIP", { card, id, additionalData });
      },
      onClick: (card, id, additionalData) => {
        console.log("CLICK", { card, id, additionalData });
      },
    });
  }

  return output;
};
