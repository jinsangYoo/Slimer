/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/109966.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/109966.js":
/*!***********************!*\
  !*** ./src/109966.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_AceScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/AceScript */ "./src/js/AceScript.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import '@babel/polyfill';


var AceTM =
/*#__PURE__*/
function (_aceScript$AceScript) {
  _inherits(AceTM, _aceScript$AceScript);

  function AceTM() {
    _classCallCheck(this, AceTM);

    return _possibleConstructorReturn(this, _getPrototypeOf(AceTM).call(this));
  }

  _createClass(AceTM, [{
    key: "whoAmI",
    value: function whoAmI() {
      return _get(_getPrototypeOf(AceTM.prototype), "whoAmI", this).call(this).replace("AceScript", "109966") + ", 109966's AceTM 입니다.";
    }
  }]);

  return AceTM;
}(_js_AceScript__WEBPACK_IMPORTED_MODULE_0__["default"].AceScript);

function makeAceObjectPromise() {
  return new Promise(function (resolve, reject) {
    resolve(new AceTM());
  });
}

makeAceObjectPromise("109966").then(function (aceObject) {
  window._AceTM = aceObject;
  console.log("ace core version: " + _AceTM.getCoreVersion());
  console.log("ace script version: " + _AceTM.getScriptVersion());
  _AceTM.sid = "100341";
  console.log("ace sid: " + _AceTM.sid);
  console.log("ace object 소개: " + _AceTM.whoAmI());
}).catch(function (e) {
  console.log("in catch: " + e);
});

/***/ }),

/***/ "./src/js/AceScript.js":
/*!*****************************!*\
  !*** ./src/js/AceScript.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_aceCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/aceCore */ "./src/js/core/aceCore.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var AceScript =
/*#__PURE__*/
function (_aceCore$AceCore) {
  _inherits(AceScript, _aceCore$AceCore);

  function AceScript() {
    _classCallCheck(this, AceScript);

    return _possibleConstructorReturn(this, _getPrototypeOf(AceScript).call(this));
  }

  _createClass(AceScript, [{
    key: "getScriptVersion",
    value: function getScriptVersion() {
      return _core_aceCore__WEBPACK_IMPORTED_MODULE_0__["default"].aceDefines.getScriptVersion();
    }
  }, {
    key: "whoAmI",
    value: function whoAmI() {
      return "난 AceScript";
    }
  }]);

  return AceScript;
}(_core_aceCore__WEBPACK_IMPORTED_MODULE_0__["default"].AceCore);

/* harmony default export */ __webpack_exports__["default"] = ({
  AceScript: AceScript
});

/***/ }),

/***/ "./src/js/common/aceDefines.js":
/*!*************************************!*\
  !*** ./src/js/common/aceDefines.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var configurationContant = {
  coreVersion: "0.0.1",
  scriptVersion: "0.0.2"
};

function getCoreVersion() {
  return configurationContant.coreVersion;
}

function getScriptVersion() {
  return configurationContant.scriptVersion;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  getCoreVersion: getCoreVersion,
  getScriptVersion: getScriptVersion
});

/***/ }),

/***/ "./src/js/core/aceCore.js":
/*!********************************!*\
  !*** ./src/js/core/aceCore.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_aceDefines__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/aceDefines */ "./src/js/common/aceDefines.js");
/* harmony import */ var _util_aceUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/aceUtils */ "./src/js/util/aceUtils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var AceCore =
/*#__PURE__*/
function () {
  function AceCore() {
    _classCallCheck(this, AceCore);
  }

  _createClass(AceCore, [{
    key: "setAsyncSidAtIONIC",
    value: function setAsyncSidAtIONIC() {
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
  }, {
    key: "getCoreVersion",
    value: function getCoreVersion() {
      return _common_aceDefines__WEBPACK_IMPORTED_MODULE_0__["default"].getCoreVersion();
    }
  }, {
    key: "getCID",
    value: function getCID() {
      return "에혀";
    }
  }, {
    key: "sid",
    get: function get() {
      return this._sid;
    },
    set: function set(sid) {
      console.log("inject sid: " + sid);
      this._sid = sid;
    }
  }]);

  return AceCore;
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  AceCore: AceCore,
  aceDefines: _common_aceDefines__WEBPACK_IMPORTED_MODULE_0__["default"],
  aceUtils: _util_aceUtils__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ "./src/js/util/aceUtils.js":
/*!*********************************!*\
  !*** ./src/js/util/aceUtils.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = ({
  removeAOSFilesDirectoryPath: removeAOSFilesDirectoryPath,
  removeiOSLibraryDirectoryPath: removeiOSLibraryDirectoryPath
});

/***/ })

/******/ });
//# sourceMappingURL=109966.js.map