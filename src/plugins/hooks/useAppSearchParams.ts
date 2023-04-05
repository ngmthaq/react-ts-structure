import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertSearchParamsToSearchString, convertSearchStringToSearchParams } from "helpers/common.helper";

const useAppSearchParams = () => {
  const navigate = useNavigate();

  const redirect = (path: string, searchParams: SearchParams = {}, replace: boolean = false) => {
    const searchString = convertSearchParamsToSearchString(searchParams);
    if (window.location.pathname !== path || JSON.stringify(searchParams) !== JSON.stringify(appSearchParams)) {
      const event = new CustomEvent(changeQueryParameterCustomEvent, { detail: { searchParams } });
      window.dispatchEvent(event);
      navigate(path + searchString, { replace: replace });
    }
  };

  const changeAppSearchParams = (searchParams: SearchParams) => {
    let filterSearchParams: any = {};
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined) filterSearchParams[key] = value;
    });
    const event = new CustomEvent(changeQueryParameterCustomEvent, { detail: { searchParams: filterSearchParams } });
    window.dispatchEvent(event);
  };

  const onChangeAppSearchParams = (e: any) => {
    let searchParams = e.detail.searchParams;
    if (JSON.stringify(searchParams) !== JSON.stringify(appSearchParams)) {
      let searchString = convertSearchParamsToSearchString({ ...searchParams });
      let protocol = window.location.protocol;
      let host = window.location.host;
      let pathname = window.location.pathname;
      let path = protocol + "//" + host + pathname + searchString;
      window.history.replaceState({ path: path }, "", path);
      setAppSearchParams({ ...searchParams });
    }
  };

  const [appSearchParams, setAppSearchParams] = useState<SearchParams>(convertSearchStringToSearchParams());

  useEffect(() => {
    window.addEventListener(changeQueryParameterCustomEvent, onChangeAppSearchParams);
    return () => window.removeEventListener(changeQueryParameterCustomEvent, onChangeAppSearchParams);
  });

  return {
    appSearchParams,
    redirect,
    changeAppSearchParams,
  };
};

export default useAppSearchParams;

const changeQueryParameterCustomEvent = "changeQueryParameterCustomEventUseAppSearchParams";

export type SearchParams = { [k: string]: string | null | undefined };
