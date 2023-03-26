import React, { FC, useState, useEffect } from "react";
import { useAppSelector } from "plugins/hooks";
import { ProgressBar } from "react-bootstrap";
import style from "./Loading.module.scss";

const Loading: FC<{}> = () => {
  const isLoading = useAppSelector(state => state.common.isLoading);

  const [number, setNumber] = useState<number>(0);

  const onLoading = (number: number) => {
    number += 1;
    setNumber(number);
    if (number < 99) {
      setTimeout(() => {
        onLoading(number);
      }, 50);
    }
  };

  useEffect(() => {
    onLoading(number);
  }, []);

  return (
    <div className={style.cont} style={{ display: isLoading ? "flex" : "none" }}>
      <ProgressBar animated now={number} className={style.loading} />
    </div>
  );
};

export default Loading;
