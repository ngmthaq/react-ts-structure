import React, { useMemo, useEffect } from "react";
import Swiper from "app/swiper";
import { Card } from "spec/swiper";

const Homepage: React.FC<HomepageProps> = () => {
  const swiper = useMemo(() => new Swiper(), []);

  useEffect(() => {
    let cont = document.getElementById("swiper");
    if (cont) {
      swiper.init("swiper");
      CARDS.forEach(card => {
        swiper.createCard(card);
      });

      swiper.renderCards();
    }
  }, [swiper]);

  return <div id="swiper"></div>;
};

export default Homepage;

interface HomepageProps {}

const CARDS: Card[] = [
  {
    img: "https://source.unsplash.com/random/1000x1000/?sky",
    id: "1",
    className: "card",
    onLike: () => {
      console.log("LIKE");
    },
    onDislike: () => {
      console.log("DISLIKE");
    },
    onSkip: () => {
      console.log("SKIP");
    },
    onClick: () => {
      console.log("CLICK");
    },
  },
  {
    img: "https://source.unsplash.com/random/1000x1000/?landscape",
    id: "2",
    className: "card",
    onLike: () => {
      console.log("LIKE");
    },
    onDislike: () => {
      console.log("DISLIKE");
    },
    onSkip: () => {
      console.log("SKIP");
    },
    onClick: () => {
      console.log("CLICK");
    },
  },
  {
    img: "https://source.unsplash.com/random/1000x1000/?ocean",
    id: "3",
    className: "card",
    onLike: () => {
      console.log("LIKE");
    },
    onDislike: () => {
      console.log("DISLIKE");
    },
    onSkip: () => {
      console.log("SKIP");
    },
    onClick: () => {
      console.log("CLICK");
    },
  },
  {
    img: "https://source.unsplash.com/random/1000x1000/?moutain",
    id: "4",
    className: "card",
    onLike: () => {
      console.log("LIKE");
    },
    onDislike: () => {
      console.log("DISLIKE");
    },
    onSkip: () => {
      console.log("SKIP");
    },
    onClick: () => {
      console.log("CLICK");
    },
  },
  {
    img: "https://source.unsplash.com/random/1000x1000/?forest",
    id: "5",
    className: "card",
    onLike: () => {
      console.log("LIKE");
    },
    onDislike: () => {
      console.log("DISLIKE");
    },
    onSkip: () => {
      console.log("SKIP");
    },
    onClick: () => {
      console.log("CLICK");
    },
  },
  {
    img: "https://source.unsplash.com/random/1000x1000/?sky",
    id: "6",
    className: "card",
    onLike: () => {
      console.log("LIKE");
    },
    onDislike: () => {
      console.log("DISLIKE");
    },
    onSkip: () => {
      console.log("SKIP");
    },
    onClick: () => {
      console.log("CLICK");
    },
  },
  {
    img: "https://source.unsplash.com/random/1000x1000/?landscape",
    id: "7",
    className: "card",
    onLike: () => {
      console.log("LIKE");
    },
    onDislike: () => {
      console.log("DISLIKE");
    },
    onSkip: () => {
      console.log("SKIP");
    },
    onClick: () => {
      console.log("CLICK");
    },
  },
  {
    img: "https://source.unsplash.com/random/1000x1000/?ocean",
    id: "8",
    className: "card",
    onLike: () => {
      console.log("LIKE");
    },
    onDislike: () => {
      console.log("DISLIKE");
    },
    onSkip: () => {
      console.log("SKIP");
    },
    onClick: () => {
      console.log("CLICK");
    },
  },
  {
    img: "https://source.unsplash.com/random/1000x1000/?moutain",
    id: "9",
    className: "card",
    onLike: () => {
      console.log("LIKE");
    },
    onDislike: () => {
      console.log("DISLIKE");
    },
    onSkip: () => {
      console.log("SKIP");
    },
    onClick: () => {
      console.log("CLICK");
    },
  },
  {
    img: "https://source.unsplash.com/random/1000x1000/?forest",
    id: "10",
    className: "card",
    onLike: () => {
      console.log("LIKE");
    },
    onDislike: () => {
      console.log("DISLIKE");
    },
    onSkip: () => {
      console.log("SKIP");
    },
    onClick: () => {
      console.log("CLICK");
    },
  },
];
