import { LOCALE_DEFAULT_NS } from "const/locale.const";
import { useTranslation } from "react-i18next";

const useAppTranslation = () => {
  const trans = useTranslation();

  const getLabel = (key: string, ns: string = LOCALE_DEFAULT_NS) => {
    return trans.t(key, { ns: ns });
  };

  return { ...trans, getLabel };
};

export default useAppTranslation;
