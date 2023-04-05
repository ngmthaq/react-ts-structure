import React from "react";
import { useAppTranslation, useAppSearchParams } from "plugins/hooks";
import styles from "./Home.module.scss";
import Header from "./Header.component";
import { PATH_HOME } from "const/path.const";

const Home: React.FC<{}> = () => {
  const { getLabel } = useAppTranslation();
  const { appSearchParams, changeAppSearchParams, redirect } = useAppSearchParams();

  return (
    <div>
      <Header />
      <p className={styles.paragraph}>{getLabel("title.Home")}</p>
      <button onClick={() => changeAppSearchParams({ a: "2" })}>Change</button>
      <button onClick={() => redirect("/a", appSearchParams)}>Redirect to another page</button>
      <button onClick={() => redirect(PATH_HOME.path, appSearchParams)}>Redirect to this page</button>
    </div>
  );
};

export default Home;
