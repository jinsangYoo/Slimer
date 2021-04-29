import { ACParams } from "./ACParams";

export class ACS {
  private static instance: ACS;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  send(value: ACParams): void {
    // return ACS.getInstance().;
    console.log("ACS.send: " + JSON.stringify(value));
  }
}
