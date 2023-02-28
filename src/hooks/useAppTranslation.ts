import { useTranslation } from "react-i18next";

const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  return { getLabel: t, i18n: i18n };
};

export default useAppTranslation;
