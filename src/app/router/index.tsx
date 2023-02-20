import { createBrowserRouter } from "react-router-dom";
import { CustomRouteObject } from "spec/router";
import PATH_CONST from "app/const/path.const";
import withHeadConfig from "app/hoc/withHeadConfig";
import Error from "app/pages/Errors";

const router = createBrowserRouter(
  Object.values(PATH_CONST).map((route: CustomRouteObject) => ({
    ...route,
    element: withHeadConfig(route.element),
    errorElement: <Error />,
  })),
);

export default router;
