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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/default.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ua-parser-js/src/ua-parser.js":
/*!****************************************************!*\
  !*** ./node_modules/ua-parser-js/src/ua-parser.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * UAParser.js v0.7.19
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 or MIT
 */
(function (window, undefined) {
  'use strict'; //////////////
  // Constants
  /////////////

  var LIBVERSION = '0.7.19',
      EMPTY = '',
      UNKNOWN = '?',
      FUNC_TYPE = 'function',
      UNDEF_TYPE = 'undefined',
      OBJ_TYPE = 'object',
      STR_TYPE = 'string',
      MAJOR = 'major',
      // deprecated
  MODEL = 'model',
      NAME = 'name',
      TYPE = 'type',
      VENDOR = 'vendor',
      VERSION = 'version',
      ARCHITECTURE = 'architecture',
      CONSOLE = 'console',
      MOBILE = 'mobile',
      TABLET = 'tablet',
      SMARTTV = 'smarttv',
      WEARABLE = 'wearable',
      EMBEDDED = 'embedded'; ///////////
  // Helper
  //////////

  var util = {
    extend: function (regexes, extensions) {
      var margedRegexes = {};

      for (var i in regexes) {
        if (extensions[i] && extensions[i].length % 2 === 0) {
          margedRegexes[i] = extensions[i].concat(regexes[i]);
        } else {
          margedRegexes[i] = regexes[i];
        }
      }

      return margedRegexes;
    },
    has: function (str1, str2) {
      if (typeof str1 === "string") {
        return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
      } else {
        return false;
      }
    },
    lowerize: function (str) {
      return str.toLowerCase();
    },
    major: function (version) {
      return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, '').split(".")[0] : undefined;
    },
    trim: function (str) {
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
  }; ///////////////
  // Map helper
  //////////////

  var mapper = {
    rgx: function (ua, arrays) {
      //var result = {},
      var i = 0,
          j,
          k,
          p,
          q,
          matches,
          match; //, args = arguments;

      /*// construct object barebones
      for (p = 0; p < args[1].length; p++) {
          q = args[1][p];
          result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
      }*/
      // loop through all regexes maps

      while (i < arrays.length && !matches) {
        var regex = arrays[i],
            // even sequence (0,2,4,..)
        props = arrays[i + 1]; // odd sequence (1,3,5,..)

        j = k = 0; // try matching uastring with regexes

        while (j < regex.length && !matches) {
          matches = regex[j++].exec(ua);

          if (!!matches) {
            for (p = 0; p < props.length; p++) {
              match = matches[++k];
              q = props[p]; // check if given property is actually array

              if (typeof q === OBJ_TYPE && q.length > 0) {
                if (q.length == 2) {
                  if (typeof q[1] == FUNC_TYPE) {
                    // assign modified match
                    this[q[0]] = q[1].call(this, match);
                  } else {
                    // assign given value, ignore regex match
                    this[q[0]] = q[1];
                  }
                } else if (q.length == 3) {
                  // check whether function or regex
                  if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                    // call function (usually string mapper)
                    this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                  } else {
                    // sanitize match using given regex
                    this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                  }
                } else if (q.length == 4) {
                  this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                }
              } else {
                this[q] = match ? match : undefined;
              }
            }
          }
        }

        i += 2;
      } // console.log(this);
      //return this;

    },
    str: function (str, map) {
      for (var i in map) {
        // check if array
        if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
          for (var j = 0; j < map[i].length; j++) {
            if (util.has(map[i][j], str)) {
              return i === UNKNOWN ? undefined : i;
            }
          }
        } else if (util.has(map[i], str)) {
          return i === UNKNOWN ? undefined : i;
        }
      }

      return str;
    }
  }; ///////////////
  // String map
  //////////////

  var maps = {
    browser: {
      oldsafari: {
        version: {
          '1.0': '/8',
          '1.2': '/1',
          '1.3': '/3',
          '2.0': '/412',
          '2.0.2': '/416',
          '2.0.3': '/417',
          '2.0.4': '/419',
          '?': '/'
        }
      }
    },
    device: {
      amazon: {
        model: {
          'Fire Phone': ['SD', 'KF']
        }
      },
      sprint: {
        model: {
          'Evo Shift 4G': '7373KT'
        },
        vendor: {
          'HTC': 'APA',
          'Sprint': 'Sprint'
        }
      }
    },
    os: {
      windows: {
        version: {
          'ME': '4.90',
          'NT 3.11': 'NT3.51',
          'NT 4.0': 'NT4.0',
          '2000': 'NT 5.0',
          'XP': ['NT 5.1', 'NT 5.2'],
          'Vista': 'NT 6.0',
          '7': 'NT 6.1',
          '8': 'NT 6.2',
          '8.1': 'NT 6.3',
          '10': ['NT 6.4', 'NT 10.0'],
          'RT': 'ARM'
        }
      }
    }
  }; //////////////
  // Regex map
  /////////////

  var regexes = {
    browser: [[// Presto based
    /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
    /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
    /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
    /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80
    ], [NAME, VERSION], [/(opios)[\/\s]+([\w\.]+)/i // Opera mini on iphone >= 8.0
    ], [[NAME, 'Opera Mini'], VERSION], [/\s(opr)\/([\w\.]+)/i // Opera Webkit
    ], [[NAME, 'Opera'], VERSION], [// Mixed
    /(kindle)\/([\w\.]+)/i, // Kindle
    /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, // Lunascape/Maxthon/Netfront/Jasmine/Blazer
    // Trident based
    /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, // Avant/IEMobile/SlimBrowser/Baidu
    /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer
    // Webkit/KHTML based
    /(rekonq)\/([\w\.]*)/i, // Rekonq
    /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
    ], [NAME, VERSION], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
    ], [[NAME, 'IE'], VERSION], [/(edge|edgios|edga)\/((\d+)?[\w\.]+)/i // Microsoft Edge
    ], [[NAME, 'Edge'], VERSION], [/(yabrowser)\/([\w\.]+)/i // Yandex
    ], [[NAME, 'Yandex'], VERSION], [/(puffin)\/([\w\.]+)/i // Puffin
    ], [[NAME, 'Puffin'], VERSION], [/(focus)\/([\w\.]+)/i // Firefox Focus
    ], [[NAME, 'Firefox Focus'], VERSION], [/(opt)\/([\w\.]+)/i // Opera Touch
    ], [[NAME, 'Opera Touch'], VERSION], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i // UCBrowser
    ], [[NAME, 'UCBrowser'], VERSION], [/(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
    ], [[NAME, /_/g, ' '], VERSION], [/(micromessenger)\/([\w\.]+)/i // WeChat
    ], [[NAME, 'WeChat'], VERSION], [/(brave)\/([\w\.]+)/i // Brave browser
    ], [[NAME, 'Brave'], VERSION], [/(qqbrowserlite)\/([\w\.]+)/i // QQBrowserLite
    ], [NAME, VERSION], [/(QQ)\/([\d\.]+)/i // QQ, aka ShouQ
    ], [NAME, VERSION], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i // QQBrowser
    ], [NAME, VERSION], [/(BIDUBrowser)[\/\s]?([\w\.]+)/i // Baidu Browser
    ], [NAME, VERSION], [/(2345Explorer)[\/\s]?([\w\.]+)/i // 2345 Browser
    ], [NAME, VERSION], [/(MetaSr)[\/\s]?([\w\.]+)/i // SouGouBrowser
    ], [NAME], [/(LBBROWSER)/i // LieBao Browser
    ], [NAME], [/xiaomi\/miuibrowser\/([\w\.]+)/i // MIUI Browser
    ], [VERSION, [NAME, 'MIUI Browser']], [/;fbav\/([\w\.]+);/i // Facebook App for iOS & Android
    ], [VERSION, [NAME, 'Facebook']], [/safari\s(line)\/([\w\.]+)/i, // Line App for iOS
    /android.+(line)\/([\w\.]+)\/iab/i // Line App for Android
    ], [NAME, VERSION], [/headlesschrome(?:\/([\w\.]+)|\s)/i // Chrome Headless
    ], [VERSION, [NAME, 'Chrome Headless']], [/\swv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
    ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [// Oculus / Samsung Browser
    /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i // Android Browser
    ], [VERSION, [NAME, 'Android Browser']], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i // Chrome/OmniWeb/Arora/Tizen/Nokia
    ], [NAME, VERSION], [/(dolfin)\/([\w\.]+)/i // Dolphin
    ], [[NAME, 'Dolphin'], VERSION], [/((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
    ], [[NAME, 'Chrome'], VERSION], [/(coast)\/([\w\.]+)/i // Opera Coast
    ], [[NAME, 'Opera Coast'], VERSION], [/fxios\/([\w\.-]+)/i // Firefox for iOS
    ], [VERSION, [NAME, 'Firefox']], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
    ], [VERSION, [NAME, 'Mobile Safari']], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
    ], [VERSION, NAME], [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Google Search Appliance on iOS
    ], [[NAME, 'GSA'], VERSION], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
    ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, // Konqueror
    /(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [// Gecko based
    /(navigator|netscape)\/([\w\.-]+)/i // Netscape
    ], [[NAME, 'Netscape'], VERSION], [/(swiftfox)/i, // Swiftfox
    /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
    /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
    /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla
    // Other
    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
    /(links)\s\(([\w\.]+)/i, // Links
    /(gobrowser)\/?([\w\.]*)/i, // GoBrowser
    /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
    /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
    ], [NAME, VERSION]
    /* /////////////////////
    // Media players BEGIN
    ////////////////////////
     , [
     /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
    /(coremedia) v((\d+)[\w\._]+)/i
    ], [NAME, VERSION], [
     /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
    ], [NAME, VERSION], [
     /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
    ], [NAME, VERSION], [
     /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
                                                                        // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                        // NSPlayer/PSP-InternetRadioPlayer/Videos
    /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
    /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
    /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
    ], [NAME, VERSION], [
    /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
    ], [NAME, VERSION], [
     /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
    ], [[NAME, 'Flip Player'], VERSION], [
     /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                        // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
    ], [NAME], [
     /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
                                                                        // Gstreamer
    ], [NAME, VERSION], [
     /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
    /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
                                                                        // Java/urllib/requests/wget/cURL
    /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
    ], [NAME, VERSION], [
     /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
    ], [[NAME, /_/g, ' '], VERSION], [
     /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
                                                                        // MPlayer SVN
    ], [NAME, VERSION], [
     /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
    ], [NAME, VERSION], [
     /(mplayer)/i,                                                       // MPlayer (no other info)
    /(yourmuze)/i,                                                      // YourMuze
    /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
    ], [NAME], [
     /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
    ], [NAME, VERSION], [
     /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
    ], [NAME, VERSION], [
     /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
    ], [NAME, VERSION], [
     /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
    /(winamp)\s((\d+)[\w\.-]+)/i,
    /(winamp)mpeg\/((\d+)[\w\.-]+)/i
    ], [NAME, VERSION], [
     /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                        // inlight radio
    ], [NAME], [
     /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
                                                                        // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                        // SoundTap/Totem/Stagefright/Streamium
    ], [NAME, VERSION], [
     /(smp)((\d+)[\d\.]+)/i                                              // SMP
    ], [NAME, VERSION], [
     /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
    /(vlc)\/((\d+)[\w\.-]+)/i,
    /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
    /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
    /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
    ], [NAME, VERSION], [
     /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
    /(windows-media-player)\/((\d+)[\w\.-]+)/i
    ], [[NAME, /-/g, ' '], VERSION], [
     /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
                                                                        // Windows Media Server
    ], [VERSION, [NAME, 'Windows']], [
     /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
    ], [NAME, VERSION], [
     /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
    /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
    ], [[NAME, 'rad.io'], VERSION]
     //////////////////////
    // Media players END
    ////////////////////*/
    ],
    cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i // AMD64
    ], [[ARCHITECTURE, 'amd64']], [/(ia32(?=;))/i // IA32 (quicktime)
    ], [[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i // IA32
    ], [[ARCHITECTURE, 'ia32']], [// PocketPC mistakenly identified as PowerPC
    /windows\s(ce|mobile);\sppc;/i], [[ARCHITECTURE, 'arm']], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i // PowerPC
    ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [/(sun4\w)[;\)]/i // SPARC
    ], [[ARCHITECTURE, 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
    ], [[ARCHITECTURE, util.lowerize]]],
    device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i // iPad/PlayBook
    ], [MODEL, VENDOR, [TYPE, TABLET]], [/applecoremedia\/[\w\.]+ \((ipad)/ // iPad
    ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i // Apple TV
    ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [/(archos)\s(gamepad2?)/i, // Archos
    /(hp).+(touchpad)/i, // HP TouchPad
    /(hp).+(tablet)/i, // HP Tablet
    /(kindle)\/([\w\.]+)/i, // Kindle
    /\s(nook)[\w\s]+build\/(\w+)/i, // Nook
    /(dell)\s(strea[kpr\s\d]*[\dko])/i // Dell Streak
    ], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)\sbuild\/.+silk\//i // Kindle Fire HD
    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i // Fire Phone
    ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [/android.+aft([bms])\sbuild/i // Fire TV
    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [/\((ip[honed|\s\w*]+);.+(apple)/i // iPod/iPhone
    ], [MODEL, VENDOR, [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);/i // iPod/iPhone
    ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i, // BlackBerry
    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
    /(hp)\s([\w\s]+\w)/i, // HP iPAQ
    /(asus)-?(\w+)/i // Asus
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/\(bb10;\s(\w+)/i // BlackBerry 10
    ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [// Asus Tablets
    /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])\sbuild\//i, // Sony
    /(sony)?(?:sgp.+)\sbuild\//i], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [/\s(ouya)\s/i, // Ouya
    /(nintendo)\s([wids3u]+)/i // Nintendo
    ], [VENDOR, MODEL, [TYPE, CONSOLE]], [/android.+;\s(shield)\sbuild/i // Nvidia
    ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [/(playstation\s[34portablevi]+)/i // Playstation
    ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [/(sprint\s(\w+))/i // Sprint Phones
    ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i // Lenovo tablets
    ], [VENDOR, MODEL, [TYPE, TABLET]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, // HTC
    /(zte)-(\w*)/i, // ZTE
    /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
    ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [/(nexus\s9)/i // HTC Nexus 9
    ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i // Huawei
    ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [/(microsoft);\s(lumia[\s\w]+)/i // Microsoft Lumia
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i // Microsoft Xbox
    ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [/(kin\.[onetw]{3})/i // Microsoft Kin
    ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [// Motorola
    /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i // HbbTV devices
    ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [/hbbtv.+maple;(\d+)/i], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i // Sharp
    ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [// Samsung
    /smart-tv.+(samsung)/i], [VENDOR, [TYPE, SMARTTV], MODEL], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [/sie-(\w*)/i // Siemens
    ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, // Nokia
    /(nokia)[\s_-]?([\w-]*)/i], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i // Acer
    ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [/android.+([vl]k\-?\d{3})\s+build/i // LG Tablet
    ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i // LG Tablet
    ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [/(lg) netcast\.tv/i // LG SmartTV
    ], [VENDOR, MODEL, [TYPE, SMARTTV]], [/(nexus\s[45])/i, // LG
    /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [/android.+(ideatab[a-z0-9\-\s]+)/i // Lenovo
    ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [/linux;.+((jolla));/i // Jolla
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/((pebble))app\/[\d\.]+\s/i // Pebble
    ], [VENDOR, MODEL, [TYPE, WEARABLE]], [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i // OPPO
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [/crkey/i // Google Chromecast
    ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [/android.+;\s(glass)\s\d/i // Google Glass
    ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [/android.+;\s(pixel c)[\s)]/i // Google Pixel C
    ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [/android.+;\s(pixel( [23])?( xl)?)\s/i // Google Pixel
    ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [/android.+;\s(\w+)\s+build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
    /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Hongmi
    /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, // Xiaomi Mi
    /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i // Redmi Phones
    ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i // Mi Pad tablets
    ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [/android.+;\s(m[1-5]\snote)\sbuild/i // Meizu Tablet
    ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [/(mz)-([\w-]{2,})/i // Meizu Phone
    ], [[VENDOR, 'Meizu'], MODEL, [TYPE, MOBILE]], [/android.+a000(1)\s+build/i, // OnePlus
    /android.+oneplus\s(a\d{4})\s+build/i], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i // RCA Tablets
    ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i // Dell Venue Tablets
    ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i // Verizon Tablet
    ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i // Barnes & Noble Tablet
    ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i // Barnes & Noble Tablet
    ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [/android.+;\s(k88)\sbuild/i // ZTE K Series Tablet
    ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i // Swiss GEN Mobile
    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [/android.+[;\/]\s*(zur\d{3})\s+build/i // Swiss ZUR Tablet
    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i // Zeki Tablets
    ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i // Dragon Touch Tablet
    ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i // Insignia Tablets
    ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i // NextBook Tablets
    ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [// Voice Xtreme Phones
    /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i // LvTel Phones
    ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [/android.+;\s(PH-1)\s/i], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [// Essential PH-1
    /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i // Envizen Tablets
    ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i // Le Pan Tablets
    ], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i // MachSpeed Tablets
    ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i // Trinity Tablets
    ], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*TU_(1491)\s+build/i // Rotor Tablets
    ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [/android.+(KS(.+))\s+build/i // Amazon Kindle Tablets
    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i // Gigaset Tablets
    ], [VENDOR, MODEL, [TYPE, TABLET]], [/\s(tablet|tab)[;\/]/i, // Unidentifiable Tablet
    /\s(mobile)(?:[;\/]|\ssafari)/i // Unidentifiable Mobile
    ], [[TYPE, util.lowerize], VENDOR, MODEL], [/(android[\w\.\s\-]{0,9});.+build/i // Generic Android Device
    ], [MODEL, [VENDOR, 'Generic']]
    /*//////////////////////////
        // TODO: move to string map
        ////////////////////////////
         /(C6603)/i                                                          // Sony Xperia Z C6603
        ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
        /(C6903)/i                                                          // Sony Xperia Z 1
        ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
         /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
        ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
        /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
        ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
        /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
        ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
        /(SM-G313HZ)/i                                                      // Samsung Galaxy V
        ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
        /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
        ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
        /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
        ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
        /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
        ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
         /(T3C)/i                                                            // Advan Vandroid T3C
        ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
        /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
        ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
        /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
        ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [
         /(V972M)/i                                                          // ZTE V972M
        ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
         /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
        /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
        ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
        /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
        /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
        ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
         /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
        ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [
         /////////////
        // END TODO
        ///////////*/
    ],
    engine: [[/windows.+\sedge\/([\w\.]+)/i // EdgeHTML
    ], [VERSION, [NAME, 'EdgeHTML']], [/(presto)\/([\w\.]+)/i, // Presto
    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
    /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
    /(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
    ], [NAME, VERSION], [/rv\:([\w\.]{1,9}).+(gecko)/i // Gecko
    ], [VERSION, NAME]],
    os: [[// Windows based
    /microsoft\s(windows)\s(vista|xp)/i // Windows (iTunes)
    ], [NAME, VERSION], [/(windows)\snt\s6\.2;\s(arm)/i, // Windows RT
    /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, // Windows Phone
    /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [// Mobile/Embedded OS
    /\((bb)(10);/i // BlackBerry 10
    ], [[NAME, 'BlackBerry'], VERSION], [/(blackberry)\w*\/?([\w\.]*)/i, // Blackberry
    /(tizen)[\/\s]([\w\.]+)/i, // Tizen
    /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i, // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
    /linux;.+(sailfish);/i // Sailfish OS
    ], [NAME, VERSION], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i // Symbian
    ], [[NAME, 'Symbian'], VERSION], [/\((series40);/i // Series 40
    ], [NAME], [/mozilla.+\(mobile;.+gecko.+firefox/i // Firefox OS
    ], [[NAME, 'Firefox OS'], VERSION], [// Console
    /(nintendo|playstation)\s([wids34portablevu]+)/i, // Nintendo/Playstation
    // GNU/Linux based
    /(mint)[\/\s\(]?(\w*)/i, // Mint
    /(mageia|vectorlinux)[;\s]/i, // Mageia/VectorLinux
    /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
    // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
    /(hurd|linux)\s?([\w\.]*)/i, // Hurd/Linux
    /(gnu)\s?([\w\.]*)/i // GNU
    ], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i // Chromium OS
    ], [[NAME, 'Chromium OS'], VERSION], [// Solaris
    /(sunos)\s?([\w\.\d]*)/i // Solaris
    ], [[NAME, 'Solaris'], VERSION], [// BSD based
    /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
    ], [NAME, VERSION], [/(haiku)\s(\w+)/i // Haiku
    ], [NAME, VERSION], [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i // iOS
    ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i // Mac OS
    ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [// Other
    /((?:open)?solaris)[\/\s-]?([\w\.]*)/i, // Solaris
    /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, // AIX
    /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i, // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
    /(unix)\s?([\w\.]*)/i // UNIX
    ], [NAME, VERSION]]
  }; /////////////////
  // Constructor
  ////////////////

  /*
  var Browser = function (name, version) {
      this[NAME] = name;
      this[VERSION] = version;
  };
  var CPU = function (arch) {
      this[ARCHITECTURE] = arch;
  };
  var Device = function (vendor, model, type) {
      this[VENDOR] = vendor;
      this[MODEL] = model;
      this[TYPE] = type;
  };
  var Engine = Browser;
  var OS = Browser;
  */

  var UAParser = function (uastring, extensions) {
    if (typeof uastring === 'object') {
      extensions = uastring;
      uastring = undefined;
    }

    if (!(this instanceof UAParser)) {
      return new UAParser(uastring, extensions).getResult();
    }

    var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
    var rgxmap = extensions ? util.extend(regexes, extensions) : regexes; //var browser = new Browser();
    //var cpu = new CPU();
    //var device = new Device();
    //var engine = new Engine();
    //var os = new OS();

    this.getBrowser = function () {
      var browser = {
        name: undefined,
        version: undefined
      };
      mapper.rgx.call(browser, ua, rgxmap.browser);
      browser.major = util.major(browser.version); // deprecated

      return browser;
    };

    this.getCPU = function () {
      var cpu = {
        architecture: undefined
      };
      mapper.rgx.call(cpu, ua, rgxmap.cpu);
      return cpu;
    };

    this.getDevice = function () {
      var device = {
        vendor: undefined,
        model: undefined,
        type: undefined
      };
      mapper.rgx.call(device, ua, rgxmap.device);
      return device;
    };

    this.getEngine = function () {
      var engine = {
        name: undefined,
        version: undefined
      };
      mapper.rgx.call(engine, ua, rgxmap.engine);
      return engine;
    };

    this.getOS = function () {
      var os = {
        name: undefined,
        version: undefined
      };
      mapper.rgx.call(os, ua, rgxmap.os);
      return os;
    };

    this.getResult = function () {
      return {
        ua: this.getUA(),
        browser: this.getBrowser(),
        engine: this.getEngine(),
        os: this.getOS(),
        device: this.getDevice(),
        cpu: this.getCPU()
      };
    };

    this.getUA = function () {
      return ua;
    };

    this.setUA = function (uastring) {
      ua = uastring; //browser = new Browser();
      //cpu = new CPU();
      //device = new Device();
      //engine = new Engine();
      //os = new OS();

      return this;
    };

    return this;
  };

  UAParser.VERSION = LIBVERSION;
  UAParser.BROWSER = {
    NAME: NAME,
    MAJOR: MAJOR,
    // deprecated
    VERSION: VERSION
  };
  UAParser.CPU = {
    ARCHITECTURE: ARCHITECTURE
  };
  UAParser.DEVICE = {
    MODEL: MODEL,
    VENDOR: VENDOR,
    TYPE: TYPE,
    CONSOLE: CONSOLE,
    MOBILE: MOBILE,
    SMARTTV: SMARTTV,
    TABLET: TABLET,
    WEARABLE: WEARABLE,
    EMBEDDED: EMBEDDED
  };
  UAParser.ENGINE = {
    NAME: NAME,
    VERSION: VERSION
  };
  UAParser.OS = {
    NAME: NAME,
    VERSION: VERSION
  }; //UAParser.Utils = util;
  ///////////
  // Export
  //////////
  // check js environment

  if (typeof exports !== UNDEF_TYPE) {
    // nodejs env
    if (typeof module !== UNDEF_TYPE && module.exports) {
      exports = module.exports = UAParser;
    } // TODO: test!!!!!!!!

    /*
    if (require && require.main === module && process) {
        // cli
        var jsonize = function (arr) {
            var res = [];
            for (var i in arr) {
                res.push(new UAParser(arr[i]).getResult());
            }
            process.stdout.write(JSON.stringify(res, null, 2) + '\n');
        };
        if (process.stdin.isTTY) {
            // via args
            jsonize(process.argv.slice(2));
        } else {
            // via pipe
            var str = '';
            process.stdin.on('readable', function() {
                var read = process.stdin.read();
                if (read !== null) {
                    str += read;
                }
            });
            process.stdin.on('end', function () {
                jsonize(str.replace(/\n$/, '').split('\n'));
            });
        }
    }
    */


    exports.UAParser = UAParser;
  } else {
    // requirejs env (optional)
    if ("function" === FUNC_TYPE && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return UAParser;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (window) {
      // browser env
      window.UAParser = UAParser;
    }
  } // jQuery/Zepto specific (optional)
  // Note:
  //   In AMD env the global scope should be kept clean, but jQuery is an exception.
  //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
  //   and we should catch that.


  var $ = window && (window.jQuery || window.Zepto);

  if (typeof $ !== UNDEF_TYPE && !$.ua) {
    var parser = new UAParser();
    $.ua = parser.getResult();

    $.ua.get = function () {
      return parser.getUA();
    };

    $.ua.set = function (uastring) {
      parser.setUA(uastring);
      var result = parser.getResult();

      for (var prop in result) {
        $.ua[prop] = result[prop];
      }
    };
  }
})(typeof window === 'object' ? window : this);

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./src/default.js":
/*!************************!*\
  !*** ./src/default.js ***!
  \************************/
/*! exports provided: default */
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
      return _get(_getPrototypeOf(AceTM.prototype), "whoAmI", this).call(this) + ", 100341's AceTM 입니다.";
    }
  }]);

  return AceTM;
}(_js_AceScript__WEBPACK_IMPORTED_MODULE_0__["default"].AceScript);

function makeAceObjectPromise() {
  return new Promise(function (resolve, reject) {
    console.log("in makeAceObjectPromise::Promise");
    resolve(new AceTM());
  });
}

makeAceObjectPromise("100341").then(function (aceObject) {
  window._AceTM = aceObject;
  console.log("ace core version: " + _AceTM.getCoreVersion());
  console.log("ace script version: " + _AceTM.getScriptVersion());
  _AceTM.sid = "100341";
  console.log("ace sid: " + _AceTM.sid);
  console.log("ace object 소개: " + _AceTM.whoAmI());
  console.log("_AceTM.getCID(): " + _AceTM.getCID());
  console.log("_AceTM.whatIsWebview(): " + _AceTM.whatIsWebview());
  document.body.innerHTML = _AceTM.whatIsWebview();
}).catch(function (e) {
  console.log("in catch: " + e);
});
/* harmony default export */ __webpack_exports__["default"] = ({
  AceTM: AceTM,
  makeAceObjectPromise: makeAceObjectPromise
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
    key: "whatIsWebview",
    value: function whatIsWebview() {
      return _util_aceUtils__WEBPACK_IMPORTED_MODULE_1__["default"].whatIsWebview();
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
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ua-parser-js */ "./node_modules/ua-parser-js/src/ua-parser.js");
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ua_parser_js__WEBPACK_IMPORTED_MODULE_0__);


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
  var parser = new ua_parser_js__WEBPACK_IMPORTED_MODULE_0__["UAParser"]();
  return parser.getResult();
}

function whatIsWebview() {
  var userAgent = parserUserAgentUseUaParserJS();

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

/* harmony default export */ __webpack_exports__["default"] = ({
  removeAOSFilesDirectoryPath: removeAOSFilesDirectoryPath,
  removeiOSLibraryDirectoryPath: removeiOSLibraryDirectoryPath,
  whatIsWebview: whatIsWebview
});

/***/ })

/******/ });
//# sourceMappingURL=slimer.js.map