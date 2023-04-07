import { FC, useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import clsx from "clsx";
import { EVENT_REQUEST_NOTI_PERMISSION, EVENT_UPDATE_FOUND } from "const/events.const";
import { Notification } from "types/reducer/common";
import { useAppSelector, usePWA } from "plugins/hooks";
import EventBus from "plugins/bus";
import { deepClone } from "helpers/common.helper";
import classes from "./Notifications.module.scss";

const Notifications: FC<{ autoClose: number }> = ({ autoClose }) => {
  const { dispatchPWAEvent } = usePWA();

  const notification = useAppSelector(state => state.common.notification);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpenUpdateNotification, setIsOpenUpdateNotification] = useState<boolean>(false);

  const onClose = (notification: Notification, index: number) => {
    let n = Object.assign({}, notification, { isOpen: false });
    setNotifications(state => {
      let newState = deepClone(state);
      newState[index] = n;
      return newState;
    });
  };

  const onClickNotification = () => {
    window.location.reload();
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

  useEffect(() => {
    dispatchPWAEvent(EVENT_REQUEST_NOTI_PERMISSION);
  }, []);

  useEffect(() => {
    const onUpdateFound = () => setIsOpenUpdateNotification(true);
    EventBus.on(EVENT_UPDATE_FOUND, onUpdateFound);
    return () => EventBus.off(EVENT_UPDATE_FOUND, onUpdateFound);
  });

  return (
    <div className={classes.cont}>
      {notifications.map((n, i) => (
        <Toast
          key={i}
          bg={n.variant}
          show={n.isOpen}
          onClose={() => onClose(n, i)}
          className={clsx(classes.alert, "p-0")}
        >
          <Toast.Header
            closeButton={true}
            closeVariant={n.variant === "dark" ? "white" : undefined}
            className={clsx(`bg-${n.variant}`, `text-${n.textVariant}`, classes.alertHeader)}
          >
            <span className={classes.alertMessage}>{n.message}</span>
          </Toast.Header>
        </Toast>
      ))}
      <Toast
        bg="dark"
        className={clsx(classes.alert, "p-0", "cursor-pointer")}
        show={isOpenUpdateNotification}
        onClick={onClickNotification}
      >
        <Toast.Header closeButton={false} className={clsx("text-light bg-dark", classes.alertHeader)}>
          <span className={classes.alertMessage}>Detected new update version, click here to refresh</span>
        </Toast.Header>
      </Toast>
    </div>
  );
};

export default Notifications;
