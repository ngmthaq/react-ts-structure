import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { AlertColor } from "@mui/lab";
import APP_CONST from "app/const/app.const";
import { commonActions } from "app/store/reducers/common.reducer";
import useAppSelector from "app/hooks/useAppSelector";
import useAppDispatch from "app/hooks/useAppDispatch";

const DefaultNotification: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(state => state.common.notification);

  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

  const onClose = () => {
    dispatch(commonActions.removeNotification());
  };

  const onExited = () => {
    setMessageInfo(undefined);
  };

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack(prev => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  useEffect(() => {
    if (notification) {
      setSnackPack(prev => [
        ...prev,
        { message: notification.message, type: notification.type, key: new Date().getTime() },
      ]);
    }
  }, [notification]);

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      id="default_notification_component"
      TransitionProps={{ onExited: onExited }}
      key={messageInfo ? messageInfo.key : undefined}
      autoHideDuration={APP_CONST.notification.timeout}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={messageInfo ? messageInfo.type : "info"} sx={{ width: "100%" }}>
        {messageInfo ? messageInfo.message : ""}
      </Alert>
    </Snackbar>
  );
};

export default DefaultNotification;

interface Props {}

interface SnackbarMessage {
  message: string;
  type: AlertColor;
  key: number;
}
