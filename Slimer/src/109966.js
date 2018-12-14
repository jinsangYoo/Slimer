// import '@babel/polyfill';
import aceScript from './js/AceScript';

class AceTM extends aceScript.AceScript {
  constructor() {
    super();
  }

  whoAmI() {
    return super.whoAmI().replace("AceScript", "109966") + ", 109966's AceTM 입니다.";
  }
}

function makeAceObjectPromise() {
  return new Promise(function(resolve, reject) {
    resolve(new AceTM());
  });
}

makeAceObjectPromise("109966").then(function(aceObject) {
    window._AceTM = aceObject;
    console.log("ace core version: " + _AceTM.getCoreVersion());
    console.log("ace script version: " + _AceTM.getScriptVersion());
    _AceTM.sid = "100341";
    console.log("ace sid: " + _AceTM.sid);
    console.log("ace object 소개: " + _AceTM.whoAmI());
  })
  .catch(function(e) {
    console.log("in catch: " + e);
  })
