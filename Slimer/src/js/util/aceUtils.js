import * as uaParserJS from 'ua-parser-js';

function spliceString(url, startIndex, replaceStringlength, willReplaceString) {
  return !url || startIndex < 0 || replaceStringlength < 0 ? url : url.substr(0, startIndex) + willReplaceString + url.substr(replaceStringlength);
}

function spliceRegex(url, regexStart, regexEnd, endStringlength, willReplaceString) {
  var startIndex = url.search(regexStart);
  var endIndex = url.search(regexEnd);
  return regexStart.test(url) && regexEnd.test(url) ? spliceString(url, startIndex, endIndex + endStringlength, willReplaceString) : url;
}

function removeiOSLibraryDirectoryPath(url) {
  return spliceRegex(url, /\/var\/mobile\/Containers\/Data\/Application/, /\/Library\/NoCloud\//, "/Library/NoCloud".length, "");
}

function removeAOSFilesDirectoryPath(url) {
  return spliceRegex(url, /\/data\/user\/0\//, /\/files\//, "/files".length, "");
}

function parserUserAgentUseUaParserJS() {
  var parser = new uaParserJS.UAParser();
  return parser.getResult();
}

function whatIsWebview() {
  let userAgent = parserUserAgentUseUaParserJS();
  if (userAgent.os.name === "iOS") {
    if (window.webkit && window.webkit.messageHandlers) {
      if (userAgent.ua.toLowerCase().indexOf("crios") == -1) {
        return "wk";
      } else {
        // chrome 가능성 있음
        return "un";
      }
    } else {
      if (userAgent.browser.name.toLowerCase().indexOf("webkit") != -1) {
        return "ui";
      } else {
        // safari 가능성 있음
        return "un";
      }
    }
  } else {
    if (userAgent.ua.toLowerCase().indexOf("wv") != -1) {
      // chrome webview
      return "wv";
    } else {
      return "un";
    }
  }
}

export default {
  removeAOSFilesDirectoryPath,
  removeiOSLibraryDirectoryPath,
  whatIsWebview
};
