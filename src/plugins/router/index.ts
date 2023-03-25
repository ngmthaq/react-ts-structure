import { createBrowserRouter } from "react-router-dom";
import * as routes from "constants/path.const";
import Error from "features/Error";

const router = createBrowserRouter(
  Object.values(routes).map(route => ({
    ...route,
    ErrorBoundary: Error,
  })),
);

export default router;
