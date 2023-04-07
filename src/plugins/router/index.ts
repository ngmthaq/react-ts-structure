import { createBrowserRouter } from "react-router-dom";
import * as routes from "const/path.const";
import { withTitle } from "plugins/hoc";
import Error from "pages/Error";

const router = createBrowserRouter(
  Object.values(routes).map(route => ({
    ...route,
    element: withTitle({ children: route.element, title: route.title }),
    ErrorBoundary: Error,
  })),
);

export default router;
