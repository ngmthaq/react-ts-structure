import { HttpBody, HttpHeaders, HttpMethods, HttpParams, HttpRequestInit } from "types/core/api";

abstract class ApiConfigs {
  private configs: HttpRequestInit;
  private baseUrl: string | null;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || null;
    this.configs = this.onBeforeSend({
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: new Headers(),
      redirect: "follow",
      referrerPolicy: "no-referrer-when-downgrade",
    });
  }

  /**
   * Initial common configs request
   * @param configs HttpRequestInit
   * @returns HttpRequestInit
   */
  private onBeforeSend(configs: HttpRequestInit): HttpRequestInit {
    return configs;
  }

  /**
   * Run after server response status 2xx
   * @param response Response
   * @return response;
   */
  private async onSuccess(response: Response): Promise<Response> {
    return response;
  }

  /**
   * Run after server response status 4xx or 5xx
   * @param response Response
   * @return response;
   */
  private async onFailure(response: Response): Promise<Response> {
    return response;
  }

  /**
   * Run if catch an error during fetching api
   * @param error any
   */
  private async onError(error: any) {}

  /**
   * Convert object to query parameters string
   * @param params HttpParams | null
   * @returns string
   */
  private getParameters(params: HttpParams | null): string {
    if (params === null) params = {};
    if (Object.keys(params).length === 0) return "";
    return "?" + new URLSearchParams(params).toString();
  }

  /**
   * Fetching API via fetch()
   * @param method HttpMethods
   * @param params HttpParams
   * @param body HttpBody
   * @param headers HttpHeaders
   * @param configs HttpRequestInit
   * @return Promise<Response>
   */
  private async fetch(
    uri: string,
    method: HttpMethods,
    params: HttpParams | null,
    body: HttpBody | null,
    headers: HttpHeaders,
    configs: HttpRequestInit,
  ): Promise<Response> {
    try {
      const baseUrl = this.baseUrl ? (this.baseUrl.endsWith("/") ? this.baseUrl : this.baseUrl + "/") : "";
      const path = uri.startsWith("/") ? uri.substring(1) : uri;
      const fullPath = uri.indexOf("http://") === 0 || uri.indexOf("https://") === 0 ? uri : baseUrl + path;
      const response: Response = await fetch(fullPath + this.getParameters(params), {
        ...this.configs,
        ...configs,
        method,
        headers,
        body,
      });
      if (response.status >= 200 && response.status <= 299) {
        return this.onSuccess(response);
      } else if (response.status >= 400 && response.status <= 599) {
        return this.onFailure(response);
      } else {
        return response;
      }
    } catch (error: any) {
      this.onError(error);
      throw error;
    }
  }

  public async get(
    uri: string,
    params: HttpParams | null = null,
    headers: HttpHeaders = new Headers(),
    configs: HttpRequestInit = {},
  ): Promise<Response> {
    return this.fetch(uri, "GET", params, null, headers, configs);
  }

  public async post(
    uri: string,
    body: HttpBody | null = null,
    headers: HttpHeaders = new Headers(),
    configs: HttpRequestInit = {},
  ): Promise<Response> {
    return this.fetch(uri, "POST", null, body, headers, configs);
  }

  public async put(
    uri: string,
    body: HttpBody | null = null,
    headers: HttpHeaders = new Headers(),
    configs: HttpRequestInit = {},
  ): Promise<Response> {
    return this.fetch(uri, "PUT", null, body, headers, configs);
  }

  public async patch(
    uri: string,
    body: HttpBody | null = null,
    headers: HttpHeaders = new Headers(),
    configs: HttpRequestInit = {},
  ): Promise<Response> {
    return this.fetch(uri, "PATCH", null, body, headers, configs);
  }

  public async delete(
    uri: string,
    body: HttpBody | null = null,
    headers: HttpHeaders = new Headers(),
    configs: HttpRequestInit = {},
  ): Promise<Response> {
    return this.fetch(uri, "DELETE", null, body, headers, configs);
  }
}

export default ApiConfigs;
