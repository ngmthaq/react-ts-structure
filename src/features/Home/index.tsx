import React from "react";
import { useAppTranslation } from "plugins/hooks";
import styles from "./Home.module.scss";

const Home: React.FC<{}> = () => {
  const { getLabel } = useAppTranslation();

  return <p className={styles.paragraph}>{getLabel("title.Home")}</p>;
};

export default Home;
