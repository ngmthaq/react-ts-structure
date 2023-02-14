import React from "react";
import { useLocation } from "react-router-dom";
import useAppTranslation from "app/hooks/useAppTranslation";
import ROUTER_CONST from "app/const/router.const";

const Component: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { getLabel } = useAppTranslation();
  const routes = React.useMemo(() => Object.values(ROUTER_CONST), []);

  React.useEffect(() => {
    const route = routes.find(r => r.path === location.pathname);
    if (route) {
      document.title = getLabel(route.title);
    }
  }, [getLabel, location, routes]);

  return <>{children}</>;
};

const withHeadConfig = (node: React.ReactNode) => {
  return <Component>{node}</Component>;
};

export default withHeadConfig;
