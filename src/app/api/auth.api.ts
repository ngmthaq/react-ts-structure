import { InternalAxiosRequestConfig } from "axios";
import KEY_CONST from "../const/key.const";
import { getLocalStorage } from "../utils";
import GenericApi from "./generic.api";

class AuthApi extends GenericApi {
  protected accessToken: string;

  constructor() {
    super();
    this.accessToken = getLocalStorage(KEY_CONST.LOCAL_STORAGE.auth) || "";
  }

  // Config access token
  protected onRequestSuccess(config: InternalAxiosRequestConfig | any) {
    if (config.headers && this.accessToken) {
      config.headers.Authorization = `Bearer ${this.accessToken}`;
    }

    return config;
  }
}

export default AuthApi;
