import React, { FC, Fragment } from "react";
import { RouterProvider } from "react-router-dom";
import router from "plugins/router";
import Loading from "components/Loading";
import Notifications from "components/Notifications";

const App: FC<{}> = () => {
  return (
    <Fragment>
      <RouterProvider router={router} />
      <Loading />
      <Notifications autoClose={AUTO_CLOSE_NOTIFICATION_TIME} />
    </Fragment>
  );
};

export default App;

export const AUTO_CLOSE_NOTIFICATION_TIME = 6000;
