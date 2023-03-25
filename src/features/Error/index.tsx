import React from "react";
import { useRouteError } from "react-router-dom";
import styles from "./Error.module.scss";

const Error: React.FC<{}> = () => {
  const error: any = useRouteError();

  console.error(error);

  return (
    <div className={styles.cont}>
      <h1 className={styles.title}>{error.status}</h1>
      <p className={styles.paragraph}>{error.statusText}</p>
    </div>
  );
};

export default Error;
