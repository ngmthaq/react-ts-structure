import { RouteObjectConfig } from "spec/router";
import Homepage from "app/pages/Homepage";
import Login from "app/pages/Login";
import withAuthMiddleware from "app/hoc/withAuthMiddleware";
import withGuestMiddleware from "app/hoc/withGuestMiddleware";

const ROUTER_CONST: RouteObjectConfig = {
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
};

export default ROUTER_CONST;
