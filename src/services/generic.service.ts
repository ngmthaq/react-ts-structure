import { GenericOutput } from "spec/service";

export abstract class GenericService {
  protected input: any;

  constructor(params: any = null) {
    this.input = params ? this.handleInput(params) : {};
  }

  protected abstract handleInput(params: any): any;

  protected abstract handleOutput(params: any): GenericOutput;

  public abstract fetch(): Promise<GenericOutput>;
}
