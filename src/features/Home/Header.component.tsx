import React, { useEffect } from "react";
import { useAppSearchParams } from "plugins/hooks";
import styles from "./Home.module.scss";

const Header: React.FC<{}> = () => {
  const { appSearchParams } = useAppSearchParams();

  useEffect(() => {
    console.info(appSearchParams);
  }, [appSearchParams]);

  return <p className={styles.paragraph}>Header</p>;
};

export default Header;
