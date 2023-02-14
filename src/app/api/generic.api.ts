import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";

abstract class GenericApi {
  protected tz: string;
  protected api: AxiosInstance;

  constructor() {
    // Get timezone of browser
    this.tz =
      Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Saigon"
        ? "Asia/Ho_Chi_Minh"
        : Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Make an instant of axios
    this.api = axios.create();

    // Config axios default headers
    this.api.defaults.baseURL = process.env.VUE_APP_API_URL;
    this.api.defaults.headers.common["Timezone"] = this.tz;
    this.api.defaults.headers.common["Cache-Control"] = "no-cache";
    this.api.defaults.headers.common["Cache-control"] = "no-store";
    this.api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    this.api.defaults.headers.common["Pragma"] = "no-cache";
    this.api.defaults.headers.common["X-Request-With"] = "XMLHttpRequest";

    // Config axios request interceptor
    this.api.interceptors.request.use(
      this.onRequestSuccess, // Do something before request sent
      this.onRequestError // Do something with request error
    );

    // Config axios response interceptor
    this.api.interceptors.response.use(
      this.onResponseSuccess, // Do something when response in 2xx status
      this.onResponseError // Do something when response got error
    );
  }

  // Request success interceptor
  protected onRequestSuccess(config: InternalAxiosRequestConfig) {
    return config;
  }

  // Request error interceptor
  protected onRequestError(err: any) {
    return Promise.reject(err);
  }

  // Response success interceptor
  protected onResponseSuccess(resp: AxiosResponse) {
    return resp;
  }

  // Response error interceptor
  protected onResponseError(err: any) {
    return Promise.reject(err);
  }

  // Config general api request
  protected async _request(
    method: string,
    url: string,
    params: any,
    data: any,
    headers: AxiosHeaders | RawAxiosRequestHeaders = {},
    config: AxiosRequestConfig | any = {}
  ) {
    return await this.api.request({
      ...config,
      url,
      params,
      data,
      method: method.toLowerCase(),
      headers,
    });
  }

  // Config get request
  protected async _get(
    url: string,
    params: any = {},
    headers: AxiosHeaders | RawAxiosRequestHeaders = {},
    config: AxiosRequestConfig | any = {}
  ) {
    return await this._request("get", url, params, {}, headers, config);
  }

  // Config post request
  protected async _post(
    url: string,
    data: any = {},
    headers: AxiosHeaders | RawAxiosRequestHeaders = {},
    config: AxiosRequestConfig | any = {}
  ) {
    return await this._request("post", url, {}, data, headers, config);
  }

  // Config put request
  protected async _put(
    url: string,
    data: any,
    headers: AxiosHeaders | RawAxiosRequestHeaders = {},
    config: AxiosRequestConfig | any = {}
  ) {
    return await this._request("put", url, {}, data, headers, config);
  }

  // Config delete request
  protected async _delete(
    url: string,
    data: any = {},
    headers: AxiosHeaders | RawAxiosRequestHeaders = {},
    config: AxiosRequestConfig | any = {}
  ) {
    return await this._request("delete", url, {}, data, headers, config);
  }

  public async get(
    url: string,
    params: any = {},
    headers: AxiosHeaders | RawAxiosRequestHeaders = {},
    config: AxiosRequestConfig | any = {}
  ) {
    try {
      let result = await this._get(url, params, headers, config);

      return result;
    } catch (e) {
      return e;
    }
  }

  public async post(
    url: string,
    data: any = {},
    headers: AxiosHeaders | RawAxiosRequestHeaders = {},
    config: AxiosRequestConfig | any = {}
  ) {
    try {
      let result = await this._post(url, data, headers, config);

      return result;
    } catch (e) {
      return e;
    }
  }

  public async put(
    url: string,
    data: any = {},
    headers: AxiosHeaders | RawAxiosRequestHeaders = {},
    config: AxiosRequestConfig | any = {}
  ) {
    try {
      let result = await this._put(url, data, headers, config);

      return result;
    } catch (e) {
      return e;
    }
  }

  public async delete(
    url: string,
    data: any = {},
    headers: AxiosHeaders | RawAxiosRequestHeaders = {},
    config: AxiosRequestConfig | any = {}
  ) {
    try {
      let result = await this._delete(url, data, headers, config);

      return result;
    } catch (e) {
      return e;
    }
  }
}

export default GenericApi;
