import { ReactNode } from "react";

const withTitle = ({ children, title }: { children: ReactNode; title: string }) => {
  document.title = title;
  return children;
};

export default withTitle;
