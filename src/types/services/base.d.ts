export interface BaseServiceInterface {
  public handlePayload(input: any): any;
  public handleResponse<Model>(response: Response): ResponseFormat<Model>;
  public fetch<Model>(payload: any): Promise<ResponseFormat<Model>>;
}

export type ResponseFormat<Model> = {
  message: string;
  status: number;
  data: Model;
};
