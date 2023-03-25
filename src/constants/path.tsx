import Home from "features/Home";
import { RouteObjectDefinition } from "types/core/constants";

export const PATH_HOME: RouteObjectDefinition = {
  path: "/",
  title: "Home",
  element: <Home />,
};
