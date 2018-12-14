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

export default {
  removeAOSFilesDirectoryPath,
  removeiOSLibraryDirectoryPath
};
