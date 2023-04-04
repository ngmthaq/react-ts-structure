import { ReactNode } from "react";
import { trans } from "helpers/common.helper";

const withTitle = ({ children, title }: { children: ReactNode; title: string }) => {
  document.title = trans(title);
  return children;
};

export default withTitle;
