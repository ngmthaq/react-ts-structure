import { FC, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Notification } from "types/reducer/common";
import { usePWA } from "plugins/pwa";
import { useAppSelector } from "plugins/hooks";
import { deepClone } from "helpers/common.helper";
import styles from "./Notifications.module.scss";

const Notifications: FC<{ autoClose: number }> = ({ autoClose }) => {
  const { pwa } = usePWA();

  console.info(pwa);

  const notification = useAppSelector(state => state.common.notification);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const onClick = (notification: Notification, index: number) => {};

  const onClose = (notification: Notification, index: number) => {
    let n = Object.assign({}, notification, { isOpen: false });
    setNotifications(state => {
      let newState = deepClone(state);
      newState[index] = n;
      return newState;
    });
  };

  useEffect(() => {
    if (notification) {
      setNotifications(state => [...state, notification]);
    }
  }, [notification]);

  useEffect(() => {
    notifications.forEach((n, i) => {
      setTimeout(() => {
        if (n.isOpen) {
          n = Object.assign({}, n, { isOpen: false });
          setNotifications(state => {
            let newState = deepClone(state);
            newState[i] = n;
            return newState;
          });
        }
      }, autoClose);
    });
  }, [notifications, autoClose]);

  return (
    <div className={styles.cont}>
      {notifications.map((n, i) => (
        <Alert
          key={i}
          dismissible={true}
          show={n.isOpen}
          variant={n.variant}
          onClick={() => onClick(n, i)}
          onClose={() => onClose(n, i)}
          className={styles.alert}
        >
          {n.message}
        </Alert>
      ))}
    </div>
  );
};

export default Notifications;
