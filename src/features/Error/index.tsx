import React from "react";
import { useRouteError } from "react-router-dom";
import st from "./Error.module.scss";

const Error: React.FC<{}> = () => {
  const error: any = useRouteError();

  console.error(error);

  return (
    <div className={st.cont}>
      <h1 className={st.title}>{error.status}</h1>
      <p className={st.paragraph}>{error.statusText}</p>
    </div>
  );
};

export default Error;
