import React, { useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import Swiper from "app/swiper";
import { getRandomInRange } from "app/utils";
import MainLayout from "app/layouts/MainLayout";
import { Card } from "spec/swiper";

const Homepage: React.FC<HomepageProps> = () => {
  const swiper = useMemo(() => new Swiper(), []);

  useEffect(() => {
    let cont = document.getElementById("swiper");
    if (cont && swiper) {
      swiper.init("swiper");
      swiper.createCards(mockCards());

      swiper.onUpdated((nextCard, totalCardList) => {
        if (totalCardList.length <= 5) {
          swiper.appendCards(mockCards(5));
        }
      });
    }
  }, [swiper]);

  return (
    <MainLayout>
      <Box id="swiper"></Box>
    </MainLayout>
  );
};

export default Homepage;

interface HomepageProps {}

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
