import { createBrowserRouter } from "react-router-dom";
import * as routes from "constants/path.const";
import Error from "features/Error";
import withTitle from "plugins/hoc/withTitle";

const router = createBrowserRouter(
  Object.values(routes).map(route => ({
    ...route,
    element: withTitle({ children: route.element, title: route.title }),
    ErrorBoundary: Error,
  })),
);

export default router;
