import React, { useEffect } from "react";
import { useAppSearchParams } from "plugins/hooks";
import styles from "./Home.module.scss";
import EventBus from "plugins/bus";
import { EventBusType } from ".";

const Header: React.FC<{}> = () => {
  const { appSearchParams } = useAppSearchParams();

  useEffect(() => {
    console.info(appSearchParams);
  }, [appSearchParams]);

  useEffect(() => {
    EventBus.on<EventBusType>("testEventBus", data => {
      console.info(data);
    });

    return () => {
      EventBus.off<EventBusType>("testEventBus", data => {
        console.info(data);
      });
    };
  });

  return <p className={styles.paragraph}>Header</p>;
};

export default Header;
