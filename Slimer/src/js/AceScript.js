import aceCore from './core/aceCore';

class AceScript extends aceCore.AceCore {
    constructor() {
        super();
    }

    getScriptVersion() {
        return aceCore.aceDefines.getScriptVersion();
    }

    whoAmI() {
        return "난 AceScript";
    }
}

export default {
  AceScript
};
