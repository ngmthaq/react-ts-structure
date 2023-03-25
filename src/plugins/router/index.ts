import { createBrowserRouter } from "react-router-dom";
import * as routes from "constants/path";
import withTitle from "plugins/hoc/withTitle";
import Error from "features/Error";

const router = createBrowserRouter(
  Object.values(routes).map(route => ({
    ...route,
    element: withTitle({ children: route.element, title: route.title }),
    ErrorBoundary: Error,
  })),
);

export default router;
