import { RouteObject } from "react-router-dom";

export type RouteObjectDefinition = RouteObject & {
  title: string;
  path: string;
};
