import React from "react";
import { Snackbar, Alert } from "@mui/material";
import APP_CONST from "app/const/app.const";
import { commonActions } from "app/store/reducers/common.reducer";
import useAppSelector from "app/hooks/useAppSelector";
import useAppDispatch from "app/hooks/useAppDispatch";

const DefaultNotification: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const notification = useAppSelector(state => state.common.notification);

  const onClose = () => {
    dispatch(commonActions.removeNotification());
  };

  return (
    <Snackbar
      onClose={onClose}
      open={Boolean(notification)}
      id="default_notification_component"
      autoHideDuration={APP_CONST.notification.timeout}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={notification ? notification.type : "info"} sx={{ width: "100%" }}>
        {notification ? notification.message : ""}
      </Alert>
    </Snackbar>
  );
};

export default DefaultNotification;

interface Props {}
