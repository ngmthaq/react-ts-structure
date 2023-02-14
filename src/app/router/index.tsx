import { createBrowserRouter } from "react-router-dom";
import { CustomRouteObject } from "spec/router";
import ROUTER_CONST from "app/const/router.const";
import withHeadConfig from "app/hoc/withHeadConfig";
import Error from "app/pages/Errors";

const router = createBrowserRouter(
  Object.values(ROUTER_CONST).map((route: CustomRouteObject) => ({
    ...route,
    element: withHeadConfig(route.element),
    errorElement: <Error />,
  })),
);

export default router;
