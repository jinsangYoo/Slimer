import aceDefines from '../common/aceDefines';
import aceUtils from '../util/aceUtils';

class AceCore {
  constructor() {}

  get sid() {
    return this._sid;
  }

  set sid(sid) {
    console.log("inject sid: " + sid);
    this._sid = sid;
  }

  setAsyncSidAtIONIC() {
      return new Promise(function (resolve, reject) {
          function succeed(result) {
              resolve(result);
          }

          function failed(result) {
              reject(result);
          }

          AceSDK.getServiceId(succeed, failed);
      });
  }

  getCoreVersion() {
    return aceDefines.getCoreVersion();
  }

  getCID() {
    return "에혀";
  }

  whatIsWebview() {
      return aceUtils.whatIsWebview();
  }
}

export default {
  AceCore,
  aceDefines,
  aceUtils
};
