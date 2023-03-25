import Home from "features/Home";
import { RouteObjectDefinition } from "types/core/constants";

export const home: RouteObjectDefinition = {
  path: "/",
  title: "Home",
  element: <Home />,
};
