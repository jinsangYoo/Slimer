import { ACParams } from "./ACParams";
import axios from "axios";
import { AxiosRequestConfig } from "axios";

export class ACS {
  private static instance: ACS;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  send(value: ACParams): void {
    // return ACS.getInstance().;
    console.log("ACS.send: " + JSON.stringify(value));
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    let config: AxiosRequestConfig = {
      url: "policy",
      method: "get",
      baseURL: "https://policy.acecounter.com",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        "Content-Type": "application/json",
        crossdomain: true,

        "CP-Request-Version": "00.00.01",
        "CP-Request-Cid": "1543932249276699286",
        "CP-Request-Time": "1543933205978",
        "CP-Request-Platform": "ts",
        "CP-Request-ID": "AK2A79936"
      },
      timeout: 1000
    };

    let localConfig: AxiosRequestConfig = {
      url: "policy",
      method: "get",
      baseURL: "http://127.0.0.1:52274",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        "Content-Type": "application/json",

        "CP-Request-Version": "00.00.01",
        "CP-Request-Cid": "1543932249276699286",
        "CP-Request-Time": "1543933205978",
        "CP-Request-Platform": "ts",
        "CP-Request-ID": "AK2A79936"
      },
      timeout: 1000
    };
    // axios
    //   .create()
    //   // .request(localConfig)
    //   .request(config)
    //   .then(response => {
    //     console.log("success");
    //     console.log(response);
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log("error!!");
    //     console.log(error);
    //   });
    axios
      .create()
      // .get("policy", localConfig)
      .get("policy", config)
      .then(response => {
        console.log("success");
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.log("error!!");
        console.log(error);
      });
  }
}
