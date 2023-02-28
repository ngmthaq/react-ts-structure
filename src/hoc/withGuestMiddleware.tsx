import React from "react";
import KEY_CONST from "const/key.const";
import { getLocalStorage } from "utils";
import ROUTER_CONST from "const/path.const";

const Component: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const accessToken = getLocalStorage(KEY_CONST.LOCAL_STORAGE.auth);
  if (accessToken) window.location.replace(ROUTER_CONST.homepage.path);

  return <>{children}</>;
};

const withGuestMiddleware = (node: React.ReactNode) => {
  return <Component>{node}</Component>;
};

export default withGuestMiddleware;
