import { BaseServiceInterface, ResponseFormat } from "types/services/base";

export default abstract class BaseService implements BaseServiceInterface {
  public abstract handlePayload(input: any): any;
  public abstract handleResponse<Model>(response: Response): ResponseFormat<Model>;
  public abstract fetch<Model>(payload: any): Promise<ResponseFormat<Model>>;
}
