export type ResponseStatus = "error" | "success";

export interface GenericOutput {
  status: ResponseStatus;
  message: string;
  data: any;
}
