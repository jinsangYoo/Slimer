import * as uaParserJS from 'ua-parser-js';

function spliceString(source, startIndex, endIndex, swapStr) {
  if (!source || startIndex < 0 || endIndex < 0) {
    return source;
  }
  return source.substr(0, startIndex) + swapStr + source.substr(endIndex);
}

function spliceRegex(source, regStartIndex, regEndIndex, endStringLength, swapStr) {
  const startIndex = source.search(regStartIndex);
  const endIndex = source.search(regEndIndex);

  if (regStartIndex.test(source) && regEndIndex.test(source)) {
    return spliceString(source, startIndex, endIndex + endStringLength, swapStr);
  } else {
    return source;
  }
}

function removeiOSLibraryDirectoryPath(source) {
  const regStartIndex = /\/var\/mobile\/Containers\/Data\/Application/;
  const endStr = "/Library/NoCloud";
  const regEndIndex = /\/Library\/NoCloud\//;
  return spliceRegex(source, regStartIndex, regEndIndex, endStr.length, "");
}

function removeAOSFilesDirectoryPath(source) {
  const regStartIndex = /\/data\/user\/0\//;
  const endStr = "/files";
  const regEndIndex = /\/files\//;
  return spliceRegex(source, regStartIndex, regEndIndex, endStr.length, "");
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
