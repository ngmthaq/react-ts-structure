import withAuthMiddleware from "hoc/withAuthMiddleware";
import withGuestMiddleware from "hoc/withGuestMiddleware";
import { RouteObjectConfig } from "spec/router";
import Login from "pages/Login";
import Homepage from "pages/Homepage";
import Jobs from "pages/Jobs";
import Setting from "pages/Setting";
import History from "pages/History";

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
