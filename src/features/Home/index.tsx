import React from "react";
import { useAppTranslation } from "plugins/hooks";
import st from "./Home.module.scss";

const Home: React.FC<{}> = () => {
  const { getLabel } = useAppTranslation();
  return <p className={st.paragraph}>{getLabel("title.Home")}</p>;
};

export default Home;
