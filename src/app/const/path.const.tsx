import withAuthMiddleware from "app/hoc/withAuthMiddleware";
import withGuestMiddleware from "app/hoc/withGuestMiddleware";
import { RouteObjectConfig } from "spec/router";
import Login from "app/pages/Login";
import Homepage from "app/pages/Homepage";
import Jobs from "app/pages/Jobs";
import Setting from "app/pages/Setting";
import History from "app/pages/History";

const PATH_CONST: RouteObjectConfig = {
  login: {
    path: "/login",
    title: "title.login",
    element: withGuestMiddleware(<Login />),
  },
  homepage: {
    path: "/",
    title: "title.homepage",
    element: withAuthMiddleware(<Homepage />),
  },
  jobs: {
    path: "/jobs",
    title: "title.jobs",
    element: withAuthMiddleware(<Jobs />),
  },
  setting: {
    path: "/setting",
    title: "title.setting",
    element: withAuthMiddleware(<Setting />),
  },
  history: {
    path: "/history",
    title: "title.history",
    element: withAuthMiddleware(<History />),
  },
};

export default PATH_CONST;
