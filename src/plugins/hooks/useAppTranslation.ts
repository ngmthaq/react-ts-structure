import { DEFAULT_NS } from "constants/locales";
import { useTranslation } from "react-i18next";

const useAppTranslation = () => {
  const trans = useTranslation();

  const getLabel = (key: string, ns: string = DEFAULT_NS) => {
    return trans.t(key, { ns: ns });
  };

  return { ...trans, getLabel };
};

export default useAppTranslation;
