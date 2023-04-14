import { FC, useState, useEffect, Fragment } from "react";
import { Toast } from "react-bootstrap";
import clsx from "clsx";
import { EVENT_REQUEST_NOTI_PERMISSION, EVENT_UPDATE_FOUND } from "const/events.const";
import { KEY_NOTIFICATION_PERMISSION } from "const/key.const";
import { Notification } from "types/reducer/common";
import { useAppSelector, useAppTranslation, usePWA } from "plugins/hooks";
import EventBus from "plugins/bus";
import { deepClone } from "helpers/common.helper";
import { getLocalForage, setLocalForage } from "helpers/storage.helper";
import classes from "./Notifications.module.scss";

const Notifications: FC<{ autoClose: number }> = ({ autoClose }) => {
  const { dispatchPWAEvent } = usePWA();
  const { getLabel } = useAppTranslation();

  const notification = useAppSelector(state => state.common.notification);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpenUpdateNotification, setIsOpenUpdateNotification] = useState<boolean>(false);
  const [isOpenRequestNotification, setIsOpenRequestNotification] = useState<boolean>(false);

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

  const onDenyNotificationPermission = () => {
    setLocalForage<string>(KEY_NOTIFICATION_PERMISSION, "denied");
    setIsOpenRequestNotification(false);
  };

  const onAcceptNotificationPermission = () => {
    dispatchPWAEvent(EVENT_REQUEST_NOTI_PERMISSION);
    setIsOpenRequestNotification(false);
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
    getLocalForage<string>(KEY_NOTIFICATION_PERMISSION).then(permission => {
      if (permission === null || permission === "default") {
        setIsOpenRequestNotification(true);
      }
    });
  }, []);

  useEffect(() => {
    const onUpdateFound = () => setIsOpenUpdateNotification(true);
    EventBus.on(EVENT_UPDATE_FOUND, onUpdateFound);
    return () => EventBus.off(EVENT_UPDATE_FOUND, onUpdateFound);
  });

  return (
    <Fragment>
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
            <span className={classes.alertMessage}>{getLabel("text.updateNewVersion")}</span>
          </Toast.Header>
        </Toast>
      </div>
      <Toast
        className={clsx("d-inline-block m-1", classes.requestNotification, {
          [classes.active]: isOpenRequestNotification,
        })}
        bg="light"
        show={true}
      >
        <Toast.Header className="d-flex justify-content-between" closeButton={false}>
          <div className="d-flex align-items-center">
            <i className="bi bi-bell"></i>
            <div className="mx-2">
              <strong className="me-auto">{getLabel("text.notification")}</strong>
            </div>
          </div>
        </Toast.Header>
        <Toast.Body>
          <p>{getLabel("text.requestNotificationPermission")}</p>
          <div className="d-flex align-items-center justify-content-between">
            <button className={clsx("w-100", classes.requestButton)} onClick={onAcceptNotificationPermission}>
              {getLabel("button.yes")}
            </button>
            <button className={clsx("w-100", classes.requestButton)} onClick={onDenyNotificationPermission}>
              {getLabel("button.no")}
            </button>
          </div>
        </Toast.Body>
      </Toast>
    </Fragment>
  );
};

export default Notifications;
