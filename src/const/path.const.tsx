import Home from "features/Home";
import { RouteObjectDefinition } from "types/const/path";

export const PATH_HOME: RouteObjectDefinition = {
  path: "/",
  title: "title.Home",
  element: <Home />,
};
