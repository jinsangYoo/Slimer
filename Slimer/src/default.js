// import '@babel/polyfill';
import aceScript from './js/AceScript';

class AceTM extends aceScript.AceScript {
  constructor() {
    super();
  }

  whoAmI() {
    return super.whoAmI() + ", 100341's AceTM 입니다.";
  }
}

function makeAceObjectPromise() {
  return new Promise(function(resolve, reject) {
    console.log("in makeAceObjectPromise::Promise");
    resolve(new AceTM());
  });
}

makeAceObjectPromise("100341").then(function(aceObject) {
    window._AceTM = aceObject;
    console.log("ace core version: " + _AceTM.getCoreVersion());
    console.log("ace script version: " + _AceTM.getScriptVersion());
    _AceTM.sid = "100341";
    console.log("ace sid: " + _AceTM.sid);
    console.log("ace object 소개: " + _AceTM.whoAmI());
    console.log("_AceTM.getCID(): " + _AceTM.getCID());
    console.log("_AceTM.whatIsWebview(): " + _AceTM.whatIsWebview());
    document.body.innerHTML = _AceTM.whatIsWebview();
  })
  .catch(function(e) {
    console.log("in catch: " + e);
  });

export default {
  AceTM,
  makeAceObjectPromise
};
