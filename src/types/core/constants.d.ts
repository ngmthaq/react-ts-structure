import { RouteObject } from "react-router-dom";

export type RouteObjectDefinition = RouteObject & {
  title: string;
};

export type AvailableLng = {
  alias: string;
};
