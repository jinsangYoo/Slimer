import ACParams from './ACParams'
import axios, { AxiosRequestConfig } from 'axios'

/**
 * @class ACS ACS API
 */
class ACS {
  private static instance: ACS

  public static getInstance(): ACS {
    return this.instance || (this.instance = new this())
  }

  send(value: ACParams): void {
    // return ACS.getInstance().;
    console.log('ACS.send: ' + JSON.stringify(value))
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

    // let policyConfig: AxiosRequestConfig = {
    //   url: "policy",
    //   method: "get",
    //   baseURL: "https://policy.acecounter.com",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //     "Access-Control-Allow-Headers":
    //       "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    //     "Content-Type": "application/json",
    //     crossdomain: true,

    //     "CP-Request-Version": "00.00.01",
    //     "CP-Request-Cid": "1543932249276699286",
    //     "CP-Request-Time": "1543933205978",
    //     "CP-Request-Platform": "ts",
    //     "CP-Request-ID": "AK2A79936",
    //   },
    //   timeout: 1000,
    // };

    const localConfig: AxiosRequestConfig = {
      url: 'policy',
      method: 'get',
      baseURL: 'http://127.0.0.1:52274',
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": false,
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // "Access-Control-Max-Age": 3600,
        // "Access-Control-Allow-Headers":
        //   "Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Request-Methods, Access-Control-Request-Headers, access-control-allow-headers, access-control-allow-methods, access-control-allow-origin, access-control-max-age",
        'Content-Type': 'text/plain',
      },
      timeout: 1000,
    }

    // let collectorConfig: AxiosRequestConfig = {
    //   url: "mac",
    //   method: "get",
    //   baseURL: "https://gmb.acecounter.com",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   params: {
    //     tp: "site",
    //     re: 0,
    //     adeld: 1,
    //     st: "1620722629634435895%7C1620722629634435895%7C0%7C0",
    //     dm: "375*812",
    //     url: "com.acecounter.aceappplus/LoginAceCounterViewController",
    //     logsource: 100,
    //     ri: 1,
    //     sv: "ACA02.02.030",
    //     sts: "1620722629634435895",
    //     ag: 0,
    //     vt:
    //       "1620722508087038827%7C4%7C1619540480760523362%7C1%7C1619540480427865497",
    //     ce: 1,
    //     patch: "rev01",
    //     adid: "00000000-0000-0000-0000-000000000000",
    //     lg: "en",
    //     tz: 20,
    //     ref: "bookmark",
    //     mid: "AK3A79964",
    //     vk: 1,
    //     udf1: 0,
    //     udf2: 0,
    //     udf3: 0,
    //   },
    //   timeout: 1000,
    // };

    // let collectorConfig2: AxiosRequestConfig = {
    //   url:
    //     "mac/?tp=site&re=0&udf1=0&adeld=1&st=1620722629634435895%7C1620722629634435895%7C0%7C0&dm=375*812&url=com.acecounter.aceappplus/LoginAceCounterViewController&logsource=100&ri=1&sv=ACA02.02.030&udf2=0&sts=1620722629634435895&ag=0&vt=1620722508087038827%7C4%7C1619540480760523362%7C1%7C1619540480427865497&ce=1&patch=rev01&adid=00000000-0000-0000-0000-000000000000&lg=en&udf3=0&tz=20&ref=bookmark&mid=AK3A79964&vk=1",
    //   method: "get",
    //   // baseURL: "https://gmb.acecounter.com",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   timeout: 1000,
    // };

    axios
      .create()
      .request(localConfig)
      // .request(collectorConfig)
      .then((response) => {
        console.log('success')
        console.log(response)
        console.log(response.data)
      })
      .catch((error) => {
        console.log('error!!')
        console.log(error)
      })

    // .create()
    // .get("policy", localConfig)
    // // .get("policy", policyConfig
    // // .get("mac", collectorConfig)
    // .then((response) => {
    //   console.log("success");
    //   console.log(response);
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.log("error!!");
    //   console.log(error);
    // });
  }
}

export function send(): void {
  ACS.getInstance().send(ACParams.init(ACParams.TYPE.DEFAULT, '젭알'))
}

export function sayHello(): void {
  console.log('hi')
}
export function sayGoodbye(): void {
  console.log('goodbye')
}
