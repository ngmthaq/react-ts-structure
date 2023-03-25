/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN } from "constants/key";
import { getCookies } from "helpers/storage";

const withGuest = ({ children, redirect }: { children: ReactNode; redirect: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookies(KEY_ACCESS_TOKEN);
    if (token) {
      navigate(redirect);
    }
  }, []);

  return children;
};

export default withGuest;
