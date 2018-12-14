let configurationContant = {
    coreVersion: "0.0.1",
    scriptVersion: "0.0.2"
};

function getCoreVersion() {
  return configurationContant.coreVersion;
}

function getScriptVersion() {
  return configurationContant.scriptVersion;
}

export default {
  getCoreVersion,
  getScriptVersion
};
