var _AceTM = (function (oa) {
	var _t = {
		advid: '1329750929',
		u: 'unknown',
		d: 'undefined',
		n: 'null',
		m: 'number',
		re: '!|~| |&|"|<|>|[&=":,./?~!<>@%#$^&*()";]',
		Lp: 'a.tagName=="SPAN"||a.tagName=="IMG"||a.tagName=="B" || a.tagName=="I" || a.tagName== "U" || a.tagName== "FONT" || a.tagName=="STRONG" || a.tagName=="I" || a.tagName=="A" || a.tagName=="AREA"',
		l: 'load',
		c: 'click',
		w: 'Windows ',
		j: 'javascript:',
		o: 'object',
		bk: 'bookmark',
		s: "string",
		f: 'function',
		pdl: ["xpay.lgdacom.net", "fcmobile.inicis.com", "drmobile.inicis.com", "stdpay.inicis.com", "mup.mobilians.co.kr", "ui.teledit.com", "web.nicepay.co.kr", "rsmpay.kcp.co.kr", "pg-web.kakao.com", "bill.payco.com", "m.pay.naver.com", "order.pay.naver.com", "pay-auth.syrup.co.kr", "tx.allatpay.com", "pg1.payletter.com", "pg.impay.co.kr", "cert.kcp.co.kr", "hpauthdream.godo.co.kr", "nice.checkplus.co.kr"]
	};
	var _s1 = {
		rl: function (n, s) {
			var t4 = (n << s) | (n >>> (32 - s));
			return t4;
		},
		ch: function (val) {
			var str = "";
			var i;
			var v;
			for (i = 7; i >= 0; i--) {
				v = (val >>> (i * 4)) & 0x0f;
				str += v.toString(16);
			}
			return str;
		},
		U8E: function (str1) {
			var str = String(str1.replace(/\r\n/g, "\n"));
			var ut = "";
			for (var n = 0; n < str.length; n++) {
				var c = str.charCodeAt(n);
				if (c < 128) {
					ut += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					ut += String.fromCharCode((c >> 6) | 192);
					ut += String.fromCharCode((c & 63) | 128);
				} else {
					ut += String.fromCharCode((c >> 12) | 224);
					ut += String.fromCharCode(((c >> 6) & 63) | 128);
					ut += String.fromCharCode((c & 63) | 128);
				}
			}
			return ut;
		},
		run: function (msg) {
			var blockstart;
			var i,
			j;
			var W = new Array(80);
			var H0 = 0x67452301;
			var H1 = 0xEFCDAB89;
			var H2 = 0x98BADCFE;
			var H3 = 0x10325476;
			var H4 = 0xC3D2E1F0;
			var A,
			B,
			C,
			D,
			E;
			var temp;
			msg = _s1.U8E(msg);
			var msg_len = msg.length;
			var word_array = new Array();
			for (i = 0; i < msg_len - 3; i += 4) {
				j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
				word_array.push(j);
			}
			switch (msg_len % 4) {
			case 0:
				i = 0x080000000;
				break;
			case 1:
				i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
				break;
			case 2:
				i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
				break;
			case 3:
				i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
				break;
			}
			word_array.push(i);
			while ((word_array.length % 16) != 14)
				word_array.push(0);
			word_array.push(msg_len >>> 29);
			word_array.push((msg_len << 3) & 0x0ffffffff);
			for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
				for (i = 0; i < 16; i++)
					W[i] = word_array[blockstart + i];
				for (i = 16; i <= 79; i++)
					W[i] = _s1.rl(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
				A = H0;
				B = H1;
				C = H2;
				D = H3;
				E = H4;
				for (i = 0; i <= 19; i++) {
					temp = (_s1.rl(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
					E = D;
					D = C;
					C = _s1.rl(B, 30);
					B = A;
					A = temp;
				}
				for (i = 20; i <= 39; i++) {
					temp = (_s1.rl(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
					E = D;
					D = C;
					C = _s1.rl(B, 30);
					B = A;
					A = temp;
				}
				for (i = 40; i <= 59; i++) {
					temp = (_s1.rl(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
					E = D;
					D = C;
					C = _s1.rl(B, 30);
					B = A;
					A = temp;
				}
				for (i = 60; i <= 79; i++) {
					temp = (_s1.rl(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
					E = D;
					D = C;
					C = _s1.rl(B, 30);
					B = A;
					A = temp;
				}
				H0 = (H0 + A) & 0x0ffffffff;
				H1 = (H1 + B) & 0x0ffffffff;
				H2 = (H2 + C) & 0x0ffffffff;
				H3 = (H3 + D) & 0x0ffffffff;
				H4 = (H4 + E) & 0x0ffffffff;
			}
			var temp = _s1.ch(H0) + _s1.ch(H1) + _s1.ch(H2) + _s1.ch(H3) + _s1.ch(H4);
			return temp.toLowerCase();
		}
	};
	var _f = {
		al: '',
		ap: String(typeof(oa.appid) != _t.d ? oa.appid() : (isNaN(window.name)) ? 0 : window.name),
		wt: function (millis) {
			var date = new Date();
			var curDate = null;
			do {
				curDate = new Date();
			} while (curDate - date < millis) {};
			return true;
		},
		s: function (o, st) {
			return String(o.match(st));
		},
		rnd: function () {
			return String(Math.random() * 1000000000).replace(".", "");
		},
		ua: navigator.userAgent,
		u: decodeURIComponent,
		e: encodeURIComponent,
		url: String(document.URL),
		ref: document.referrer != '' ? (document.referrer != _t.n ? document.referrer : _t.bk) : _t.bk,
		len: function (o) {
			return String(o).length;
		},
		smc: function (o, st) {
			var e = o.match(st);
			return String(e);
		},
		ix: function (s, t) {
			return String(s).indexOf(t);
		},
		rep: function (s, o, r) {
			return String(s).replace(o, r);
		},
		ptc: function (u) {
			var uc = String(u).replace(/^\s+|\s+$/gm, '');
			return _f.rep(uc, /http:\/\/|https:\/\//gi, '');
		},
		vInt: function (o, v) {
			var ol = _f.rep(o, /[^0-9.]/g, '');
			return (typeof(o) != _t.d) ? (ol != '' ? ol : v) : v;
		},
		vStr: function (o, l) {
			var r = '';
			var le = (l) ? l : 32;
			if (typeof(o) != _t.d && _f.len(o) <= le && _f.len(o) != 0) {
				r = _f.rep(o, /[#&^@]/g, '');
			}
			return r;
		},
		gp: function (ab, str) {
			var v = ab.match((new RegExp('(?:[\?\&]' + str + '=)([^&]+)')));
			return v ? v[1] : '';
		},
		gpr: function (ab, str, n) {
			var v = _f.gp(ab, str);
			return (v != '') ? v : n;
		},
		hr: function (u, t) {
			var r = _f.ptc(u);
			var jx = String(r).indexOf(';jsessionid=');
			if (t == 'h') {
				return r.split('/')[0];
			} else if (t == 'u' && jx >= 0) {
				r = String(r).substr(0, jx);
			};
			return r;
		},
		hn: function (a) {
			var cn = (typeof(a) == _t.d) ? location.hostname : a;
			cn = _f.ptc(cn);
			cn = this.hr(cn, 'h');
			var _d = _f.smc(cn, /[^.\s\/]+\.([a-z]{3,}|[a-z]{2}.[a-z]{2})$/);
			if (_d != _t.n) {
				return _d.split(',')[0];
			} else {
				return cn;
			}
		},
		sTo: function (a, t) {
			setTimeout(function () {
				location.href = a;
			}, t);
		},
		pdm: function (dr, bk) {
			var drs = String(dr);
			var dd = _t.pdl;
			for (var ax in dd) {
				if (String(dr).indexOf(dd[ax]) >= 0) {
					drs = bk;
				};
			}
			return drs;
		},
		rdm: function () {
			var dr = _f.ref;
			dr = _f.pdm(dr, _t.bk);
			return dr != _t.bk ? this.hr(dr, 'h') : 'Direct'
		},
		cid: function () {
			if (String(oa.tms).length == 19) {
				return oa.tms;
			};
			var _rnc = _f.rnd();
			var hexStr = String('25123').replace(/[^a-f0-9]/gi, '');
			return String(oa.em + '' + parseInt(hexStr, 16) + '' + _rnc).substr(0, 19);
		},
		uqi: function () {
			var n = _f.cid();
			var cc = n.substr(n.length - 6, 6);
			var a = "";
			var sr = "";
			var c = "0A1B2C3D4EFGH5IJ6K7L8M9N0OPQURSTUVWXYZ";
			for (var i = 0; i < 19; i++) {
				sr += c.substr(Math.floor(Math.random() * 39), 1);
			};
			a = cc + sr;
			return '' + a.substr(0, 19);
		},
		rel: function (s, v) {
			var r = _f.cg('ACR' + v, 1);
			if (_t.d == String(r)) {
				return 0;
			} else {
				if (String(r) == _s1.run(s)) {
					var pt = parseInt(_f.cg('S'));
					if (pt <= 0) {
						pt = 1;
					};
					return pt;
				}
				return 0;
			}
		},
		cs: function (n, v, e, p, d, c) {
			var cd = _f.hn();
			var ex = new Date();
			var ac = String(oa.acid);
			var es = '0';
			if (e != 0) {
				ex.setTime(ex.getTime() + eval(e));
				es = ex.toGMTString();
			}
			var co = (typeof(c) == _t.d) ? 'AC' + n + ac : n;
			var s = '_' + co + "=" + escape(v) + ((e != 0) ? ";expires=" + es : "") + ((p) ? ";path=" + p : "") + ";domain=" + ((d) ? d + ";" : cd + ";");
			document.cookie = s;
		},
		uci: function (a) {
			var cru = _f.gp(_f.url, 'U' + a);
			var crs = String(oa.crossCID).length > 10 ? oa.crossCID : String(cru).length > 10 ? cru : '';
			return crs;
		},
		cg: function (v, c) {
			var aq = '';
			var ac = String(oa.acid);
			var s = (typeof(c) == _t.d) ? '_AC' + v + ac : '_' + v;
			var ss = 0;
			var se = 0;
			var dc = document.cookie;
			if (v == 'U') {
				var uc = _f.uci(oa.acid);
				if (uc != '') {
					return uc;
				}
			}
			if (dc.length > 0) {
				ss = dc.lastIndexOf(s + "=");
				if (ss != -1) {
					ss = ss + s.length + 1;
					se = dc.indexOf(";", ss);
					if (se == -1) {
						se = dc.length;
					};
					aq = unescape(dc.substring(ss, se));
					return aq;
				};
			}
			return _t.d;
		},
		ea: function (c, f) {
			var wd;
			if (c == 'mousedown') {
				wd = window.document;
			} else {
				wd = window;
			}
			if (wd.addEventListener) {
				wd.addEventListener(c, f, false);
			} else if (wd.attachEvent) {
				wd.attachEvent("on" + c, f);
			}
		},
		xr: function (s) {
			var str = s + "";
			var ret = "";
			for (var i = 0; i < str.length; i++) {
				var at = str.charCodeAt(i);
				var ch = String.fromCharCode(at);
				if (at == 10 || at == 35) {
					ret += '' + ch.replace(ch, '');
				} else if (at == 34 || at == 39 || at == 9) {
					ret += '' + ch.replace(ch, ' ');
				} else {
					ret += '' + ch;
				}
			}
			return ret;
		}
	};
	var _s = {
		dmn: '',
		dtc: '',
		dav: '',
		dsc: '',
		sv: '',
		pcm: (typeof(window.orientation) != _t.d ? 1 : 0),
		dim: (typeof(screen) != _t.d) && (typeof(screen.width) == _t.m) ? screen.width + '*' + screen.height : '0*0',
		ul: (typeof(navigator.language) != _t.d) ? navigator.language.toLowerCase() : (typeof(navigator.userLanguage) != _t.d) ? navigator.userLanguage.toLowerCase() : '',
		os: function () {
			var o = _t.n;
			var v = '';
			var e = ['FreeBSD', 'Linux', 'SunO', 'OS/2', 'Maci', 'AIX', 'OSF1', 'WebTV', 'HP-U'];
			var nt = {
				"10.0": "10",
				"6.3": "8.1",
				"6.2": "8",
				"6.1": "7",
				"6.0": "Vista",
				"5.2": "2003",
				"5.1": "XP",
				"5.0": "2000"
			};
			if (_f.ix(_f.ua, _t.d) >= 0) {
				return _t.u;
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /iPhone OS \d+_\d/);
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /Android \d+.\d+/);
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /BlackBerry\d/);
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /SymbianOS\/\d/);
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /Windows CE/);
			};
			if (o != _t.n) {
				if (_f.ix(o, 'iPhone OS') >= 0) {
					o = o.replace('iPhone OS', 'iOS');
					o = o.replace('_', '.');
				}
				return o;
			};
			for (var i in nt) {
				if (_f.ix(_f.ua, 'NT ' + i) != -1) {
					if ((i == '5.1') && (_f.ix(_f.ua, 'SV1') != -1)) {
						v = ' SP2';
					};
					return _t.w + nt[i] + v;
				}
			}
			if ((_f.ix(_f.ua, "NT;") != -1) || (_f.ix(_f.ua, "NT4.0") != -1) || (_f.ix(_f.ua, "NT)") != -1)) {
				return 'NT';
			};
			for (var i = 0; i < 7; i++) {
				if (_f.ix(_f.ua, e[i]) != -1) {
					o = e[i];
					if (i == 4) {
						o = 'Mac';
					};
					if (i == 6) {
						o = 'Compaq Open VMS';
					};
					if (i == 9) {
						o = 'HP Unix';
					};
					return o;
				}
			};
			return '';
		},
		bz: function () {
			var o = _t.n;
			var bn = '';
			if (o == _t.n) {
				o = _f.smc(_f.ua, /MSIE \d+.\d+/);
				o = _f.rep(o, 'MSIE', 'Internet Explorer');
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /Trident\/\d+.\d+/);
				o = _f.rep(o, 'Trident/7.0', 'Internet Explorer 11.0');
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /Whale\/\d+.\d+/);
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /Chrome\/\d+.\d+/);
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /Opera\/\d+.\d/);
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /Firefox\/\d+.\d/);
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /Netscape\/\d+.\d/);
			};
			if (o == _t.n) {
				o = _f.smc(_f.ua, /Version\/\d+.\d+/);
				o = _f.rep(o, 'Version/', '');
				o = (o != _t.n) ? 'Safari ' + o : _t.n;
			};
			return (o != _t.n) ? _f.rep(o, '/', ' ') : '';
		},
		jserr: function (o, s, n) {
			var we = (typeof(window.event) == _t.o) ? window.event : o;
			var en = (typeof(we.message) != _t.d) ? we.message : (typeof(we.errorMessage) != _t.d) ? we.errorMessage : (typeof o == "string") ? o : "Unknown";
			var ern = (typeof(we.lineno) != _t.d) ? we.lineno : (typeof(we.errorLine) != _t.d) ? we.errorLine : (typeof n == _f.m) ? n : 0;
			en = _f.xr(en);
			_p.send("JSERR", {
				errn: en,
				errno: ern
			});
			return 0;
		},
		toStr: function () {
			var dms = (_s.pcm >= 2) ? "&dmn=" + _s.dmn + "&dtc=" + _s.dtc + "&dav=" + _s.dav + "&dsc=" + _s.dsc + "&sv=" + _s.sv : '';
			return "&os=" + _f.e(this.os()) + "&bv=" + _f.e(_s.bz()) + "&dim=" + _f.e(_s.dim) + "&ul=" + _f.e(_s.ul) + "&pcm=" + _s.pcm + dms;
		}
	};
	var _c = {
		Run: function () {
			if (_f.ix(navigator.userAgent, 'Chrome/1.') > -1) {
				return 0;
			};
			_f.ea('mousedown', this.ec);
			_f.ea('load', this.pl);
		},
		pl: function (e) {
			var _at = (new Date().getTime());
			var rt = (_at - oa.em);
			_f.cs('S', rt, 0, '/', '');
		},
		up: function (s) {
			var r = String(s);
			return r.toUpperCase();
		},
		cyc: function (o) {
			var a;
			a = o;
			if (_c.up(a.tagName) == 'A' || _c.up(a.tagName) == 'AREA') {
				return a;
			} else if (_c.up(a.tagName) == 'BODY') {
				return 0;
			} else {
				return _c.cyc(a.parentNode);
			}
		},
		cd: function (a) {
			var ar = String(a);
			if (_f.ix(ar, '#') != -1) {
				return -1;
			}
			var cdm = (oa.crossDomain) ? oa.crossDomain : "";
			return _f.ix(cdm, _f.hn(ar));
		},
		cv: function (ah) {
			var c = _f.cg('U');
			var ar = String(ah);
			var ac = 'U' + String(oa.acid).replace(/[^(A-Z0-9)]/g, "");
			var str = ar.substr(ar.length - 1, 1);
			var hs = (str == '/') ? '?' + ac : (str == '&') ? ac : (str == '?') ? ac : (_f.ix(ar, '?') > 0) ? '&' + ac : '?' + ac;
			return ar + hs + '=' + c;
		},
		ec: function (e) {
			try {
				var ok = '';
				var m = document.all ? event.srcElement : e.target;
				if (typeof(m) == _t.d) {
					return true;
				}
				var a = m;
				var ar = '';
				var obj;
				if (eval(_t.Lp)) {
					obj = _c.cyc(m);
					if (_c.up(String(obj.href).substr(0, 4)) == 'TEL:') {
						ar = _c.up(obj.href);
						if (ar != '') {
							_p.send('TEL', ar.replace('TEL:', ''));
							return '';
						};
					} else if (typeof obj != _t.m && _f.len(obj.href) != 0) {
						ar = obj.href;
						if (_f.ix(ar, _t.j) == -1) {
							_p.send('HREF', ar);
							if (_c.cd(ar) != -1) {
								obj.href = _c.cv(ar);
							}
						}
					};
				}
				return '';
			} catch (_e) {
				return '';
			};
		}
	};
	var _def = {
		pvn: '',
		pvg: '',
		inkw: '',
		mid: '',
		age: 0,
		gd: '',
		ud1: '',
		ud2: '',
		ud3: '',
		ud4: '',
		ud5: '',
		mt: 0,
		mv: 0,
		pno: '',
		pd: '',
		pr: 0,
		ct: '',
		piu: '',
		ep: false,
		com: function (oo) {
			var cv = oo;
			var rmv = {
				ce: 0,
				cv: 0,
				cn: ''
			};
			if (typeof(cv) == _t.o) {
				rmv.ce = _f.vInt(cv.cType, 0);
				if ((rmv.ce > 0 && rmv.ce < 20)) {
					rmv.cv = _f.vInt(cv.cWorth, 0);
					rmv.cn = _f.vStr(cv.cName, 64);
				}
			}
			return rmv;
		},
		oBV: function (oo) {
			var ob = oo.BV;
			var oxbv = {};
			var ox = [];
			for (var ii = 0; ii < ob.length; ii++) {
				var sk = 'b' + ob[ii].bn + 'v' + ob[ii].pn;
				if (typeof(oxbv[sk]) == "undefined") {
					ox.push({
						pn: ob[ii].pn,
						bn: ob[ii].bn
					});
					oxbv[sk] = 1;
				}
			}
			return ox;
		},
		atmp: function (oo, act) {
			var op = oo.Product;
			var ob = oo.Buy;
			var toS = '';
			if (act == 'view' || act == 'cart' || act == 'buy') {
				if (typeof(op) == _t.o && (act == 'view' || act == 'cart')) {
					var pid = _f.vStr(op.pCode, 32);
					var price = _f.vInt(op.pPrice, 0);
					var category = _f.vStr(op.pCategory, 64);
					var imgurl = _f.vStr(op.pImageURl, 128);
					var name = _f.vStr(op.pName, 128);
					var link = _f.vStr(op.pLink, 128);
					var item = '{"item":{"id":"' + pid + '","price":' + price + ',"count":1,"cat":"' + category + '","img":"' + imgurl + '","iname":"' + name + '","idesc":"","link":"' + link + '"}}';
					var items = '{"oid":"","items":[' + item + ']}';
					toS = _f.e(items);
				}
				if (typeof(ob) == _t.o && act == 'buy') {
					var arr = new Array();
					var str = "";
					var obitem = ob.bItem;
					if (obitem.length > 1) {
						for (var _ix in obitem) {
							arr[_ix] = '{"item":{"id":"' + _f.vStr(obitem[_ix].pCode, 32) + '","price":' + _f.vInt(obitem[_ix].pPrice, 0) + ',"count":' + _f.vInt(obitem[_ix].pQuantity, 0) + ',"cat":"","img":"","iname":"' + _f.vStr(obitem[_ix].pName, 128) + '","idesc":"","link":""}}';
						}
						str = arr.join(",");
					} else {
						str = '{"item":{"id":"' + _f.vStr(obitem[0].pCode, 32) + '","price":' + _f.vStr(obitem[0].pPrice, 0) + ',"count":' + _f.vStr(obitem[0].pQuantity, 0) + ',"cat":"","img":"","iname":"' + _f.vStr(obitem[0].pName, 128) + '","idesc":"","link":""}}';
					}
					var str2 = '{"oid":"' + ob.bOrderNo + '","items":[' + str + ']}';
					toS = _f.e(str2);
				};
			} else {
				var e = '{"oid":"","items":[]}';
				toS = _f.e(e);
			}
			var u = _f.e(document.URL);
			var r = _f.e(document.referrer);
			var code = 'utf-8';
			var action = act;
			var retStr = 'u=' + u + '&advid=' + _t.advid + '&r=' + r + '&code=' + code + '&target=' + toS + '&action=' + action;
			var goal = '//adlc-exchange.toast.com/log';
			var gi = new Image(0, 0);
			gi.src = goal + '?' + retStr;
		},
		atSendBuy:function(convName){
			var str = '{"item":{"id":"1","price":1,"count":1,"cat":"","img":"","iname":"' + convName + '","idesc":"","link":""}}';
			var str2 = '{"oid":"","items":[' + str + ']}';
			var toS = _f.e(str2);
			var u = _f.e(document.URL);
			var r = _f.e(document.referrer);
			var code = 'utf-8';
			var action = 'buy';
			var retStr = 'u=' + u + '&advid=' + _t.advid + '&r=' + r + '&code=' + code + '&target=' + toS + '&action=' + action;
			var goal = '//adlc-exchange.toast.com/log';
			var gi = new Image(0, 0);
			gi.src = goal + '?' + retStr;
		},
		atget: function () {
			var goal = '//adlc-exchange.toast.com/getid';
			var ai = new Image(0, 0);
			ai.src = goal + '?rnd=' + Math.random();
		},
		ud: function (oo) {
			var ou = oo.Login;
			var oe = oo.pSearch;
			var on = oo.pName;
			var og = oo.pGroup;
			var oer = oo.pError;
			var oj = oo.uJoin;
			var ojv = oo.uWorth;
			var ow = oo.uWithdraw;
			var op = oo.Product;
			var toS = '';
			var rmv = _def;
			if (typeof(ou) == _t.o) {
				if (_f.vStr(ou.uID) != '') {
					rmv.mid = _f.vStr(ou.uID);
					rmv.mt = 1;
					rmv.ud1 = _f.vStr(ou.uGroup1);
					rmv.ud2 = _f.vStr(ou.uGroup2);
					rmv.ud3 = _f.vStr(ou.uGroup3);
					rmv.ud4 = _f.vStr(ou.uGroup4);
					rmv.ud5 = _f.vStr(ou.uGroup5);
				};
				rmv.age = _f.vInt(ou.uAge, 0);
				if (rmv.age < 0 || rmv.age > 150) {
					rmv.age = 0;
				}
				rmv.gd = _f.vStr(ou.uGender, 5);
				if (rmv.gd != 'man' && rmv.gd != 'woman') {
					rmv.gd = "";
				};
				_sse.reMem(rmv);
			}
			if (typeof(op) == _t.o) {
				rmv.pno = _f.vStr(op.pCode, 32);
				rmv.pd = _f.vStr(op.pName, 128);
				rmv.ct = _f.vStr(op.pCategory, 64);
				rmv.piu = _f.ptc(_f.vStr(op.pImageURl, 128));
				rmv.pr = _f.vInt(op.pPrice, 0);
			};
			rmv.inkw = _f.vStr(oe);
			rmv.pvn = _f.vStr(on);
			rmv.pvg = _f.vStr(og);
			if (_f.vStr(oj) != '') {
				rmv.mid = _f.vStr(oj);
				rmv.mt = 2;
				rmv.mv = _f.vInt(ojv, 0);
			};
			if (_f.vStr(ow) != '') {
				rmv.mid = _f.vStr(ow);
				rmv.mt = 3;
			};
			if (typeof(oer) != _t.d && oer == true) {
				rmv.ep = oer;
			};
			for (var _ix in rmv) {
				if (_ix != 'toStr' && _ix != 'ep' && typeof(rmv[_ix]) != 'function') {
					toS += '&' + _ix + '=' + _f.e(rmv[_ix]);
				}
			};
			rmv.toStr = toS;
			return rmv;
		},
		buy: function (oo) {
			var op = oo.Buy;
			var toS = '';
			var its1 = [];
			var rmv = {
				orn: '',
				orp: 0,
				opa: '',
				oll: [],
				bs: 0
			};
			if (typeof(op) == _t.o) {
				rmv.orn = _f.vStr(op.bOrderNo, 32);
				rmv.opa = _f.vStr(op.bPay, 32);
				rmv.orp = _f.vInt(op.bTotalPrice, 0);
				rmv.bs = _f.vInt(op.bDeliveryPrice, 0);
				for (var ic in op.bItem) {
					var it = op.bItem[ic];
					var str = _f.vStr(it.pCode, 32) + '@' + _f.vStr(it.pName, 128) + '@' + _f.vInt(it.pPrice, 0) + '@' + _f.vInt(it.pQuantity, 0) + '@' + _f.vStr(it.oCode) + '@' + _f.vStr(it.oName, 128);
					if (_f.len(its1.join('^')) <= 1024) {
						its1.push(str);
						if (ic == (op.bItem.length - 1)) {
							rmv.oll.push(its1.join('^'));
						}
					} else {
						its1.push(str);
						rmv.oll.push(its1.join('^'));
						its1 = [];
					}
				}
				for (var _ix in rmv) {
					if (_ix != 'oll') {
						toS += '&' + _ix + '=' + _f.e(rmv[_ix]);
					}
				};
			};
			rmv.toStr = toS;
			return rmv;
		},
		prd: function (b, c) {
			var _its = [];
			var _itss = [];
			var ol = _def.ud(b);
			var pla = ol.pno + '@' + ol.pd + '@' + ol.pr;
			if (ol.pno == '') {
				return '';
			} else {
				var op = b.Product;
			};
			if (typeof(op.oItem) == _t.o && op.oItem.length != 0) {
				for (var ic in op.oItem) {
					var ll = op.oItem;
					var oL = ll[ic];
					if (typeof(oL) != _t.o) {
						continue;
					}
					if (oL.oCode == '' || typeof(oL.oName) == _t.d || typeof(oL.oQuantity) == _t.d) {
						return '';
					}
					_itss['nac' + oL.oCode] = pla + '@' + _f.vInt(oL.oQuantity, 0) + '@' + _f.vStr(oL.oCode, 32) + '@' + _f.vStr(oL.oName, 128);
				}
				for (var icc in _itss) {
					if (typeof(_itss[icc]) == _t.s) {
						_its.push(_itss[icc]);
					}
				};
			} else if (typeof(c) != _t.d) {
				if (parseInt(c) != 0) {
					_its.push(pla + '@' + c + '@' + '@');
				}
			};
			return _its.join('^');
		},
		prdLst: function (b) {
			var _its = [];
			var op = b.ProductList;
			if (typeof(op) == _t.o) {
				for (var _ill in op) {
					var _it = op[_ill];
					var pla = _f.vStr(_it.pCode, 32) + '@' + _f.vStr(_it.pName, 128) + '@' + _f.vInt(_it.pPrice, 0);
					if (_it.oCode != '') {
						pla += '@' + _f.vInt(_it.pQuantity, 0) + '@' + _f.vStr(_it.oCode, 32) + '@' + _f.vStr(_it.oName, 128);
						_its.push(pla);
					} else {
						var pla = _f.vStr(_it.pCode, 32) + '@' + _f.vStr(_it.pName, 128) + '@' + _f.vInt(_it.pPrice, 0) + '@' + _f.vInt(_it.pQuantity, 0);
						_its.push(pla + '@' + '@');
					};
				}
				return _its;
			};
		},
		prdModify: function (a, b, c, d, e, f) {
			var op = f.ProductList;
			var code = '';
			var oCode = '';
			if (typeof(op) == _t.o) {
				for (var k in op) {
					code = ((op[k].pCode == '') ? '' : op[k].pCode);
					oCode = ((op[k].oCode == '') ? '' : op[k].oCode);
					switch (a) {
					case "i":
						if (code == b) {
							op.push({
								pCode: code,
								pPrice: op[k].pPrice,
								pName: op[k].pName,
								oCode: c,
								oName: d,
								pQuantity: e
							});
						} else {
							continue;
						}
						break;
					case "m":
						if (code == b) {
							if (oCode != '' && oCode == c) {
								op[k].pQuantity = e;
								op[k].oCode = c;
								op[k].oName = d;
							} else if (oCode == '') {
								op[k].pQuantity = e;
							};
						}
						break;
					case "o":
						if (code == b) {
							if (oCode != '' && oCode == c) {
								op.splice(k, 1);
							} else if (oCode == '') {
								op.splice(k, 1);
							};
						}
						break;
					default:
						return '';
						break;
					};
				};
			};
		}
	}
	var _sse = {
		reMem: function (a) {
			var c = _f.cg('U');
			var ct = c.split(".");
			if (a.mt == 1) {
				if (a.gd == 'man') {
					ct[7] = 5;
				} else if (a.gd == 'woman') {
					ct[7] = 6;
				} else {
					ct[7] = 0;
				};
				ct[6] = parseInt(a.age) + 4;
				ct[8] = a.ud1;
				ct[9] = a.ud2;
				ct[10] = a.ud3;
				ct[11] = a.ud4;
				ct[12] = a.ud5;
				_f.cs('U', ct.join('.'), (1000 * 86400 * 365) * 10, '/', '');
			} else if (a.mt == 0) {
				a.mt = 4;
				a.age = _f.vInt(ct[6], 0);
				a.gd = _f.vStr(ct[7], 2);
				a.ud1 = _f.vStr(ct[8], 12);
				a.ud2 = _f.vStr(ct[9], 12);
				a.ud3 = _f.vStr(ct[10], 12);
				a.ud4 = _f.vStr(ct[11], 12);
				a.ud5 = _f.vStr(ct[12], 12);
				return a;
			}
		},
		reNew: function (v, n, e) {
			var c = _f.cg('U');
			var ct = c.split(".");
			var rs = ct[n];
			if (_f.len(v) != 0 && _f.len(ct[n]) != e) {
				ct[n] = v;
				_f.cs('U', ct.join('.'), (1000 * 86400 * 365) * 10, '/', '');
			}
			return ct[n];
		},
		ast: function () {
			var cuc = _f.cg('U');
			var ct = cuc.split(".");
			var ssc = _f.cg('S');
			var sci = _f.cid();
			var svt = String(sci).substr(0, 13);
			var svs = sci + '.' + svt + '.' + 1 + '.0.0.0.0.0.....';
			var svc = '';
			var c_aet = ((window._AceTM_CAET == '' || typeof(window._AceTM_CAET) == _t.d) ? '' : window._AceTM_CAET);
			var ret = {
				avt: 0,
				avn: 0,
				avc: 1,
				aet: ((c_aet == '') ? svt : c_aet),
				cid: 0,
				uid: '',
				did: '',
				ck: 0,
				ovt: 0
			};
			var toS = '';
			if (ssc == _t.d) {
				_f.cs('S', 0, 0, '/', '');
				ret.avn = 1;
				if (cuc != _t.d) {
					var cn = parseInt(ct[2]) + 1;
					if (cn >= 10) {
						cn = 10;
					} else if (isNaN(cn)) {
						cn = 2;
					}
					var svc = ct[0] + '.' + svt + '.' + cn + '.' + ct[3] + '.' + ct[4] + '.' + ct[5] + '.0.0.....';
					ret.cid = ct[0];
					ret.avt = String(ct[1]).substr(0, 10);
					ret.avc = cn;
					ret.ovt = String(ct[5]).substr(0, 10);
				} else {
					var svc = svs;
					ret.cid = sci;
				}
				_f.cs('U', svc, (1000 * 86400 * 365) * 10, '/', '');
			} else {
				ret.avn = 0;
				if (ct[0] == _t.d) {
					ret.avn = 1;
					ct = svs.split(".");
					_f.cs('U', svs, (1000 * 86400 * 365) * 10, '/', '');
				}
				ret.cid = ct[0];
				ret.avt = String(ct[1]).substr(0, 10);
				ret.avc = ct[2];
				ret.uid = (_f.len(ct[3]) == 40) ? ct[3] : '';
				ret.did = (_f.len(ct[4]) == 19) ? ct[4] : '';
				ret.ovt = String(ct[5]).substr(0, 10);
			}
			ret.ck = (_f.cg('S') != _t.d) ? 0 : 1;
			return ret;
		}
	};
	var _k = {
		r: function (s, t) {
			if (_f.ix(s, t) > 0) {
				return s.substring(0, _f.ix(s, t));
			}
			return s;
		},
		up: function (u) {
			var r = '',
			c = 0,
			a = '' + u;
			c = _f.ix(a, '?');
			if (c != -1) {
				r = a.substr(c, a.length);
				return r;
			};
			return '';
		},
		e: function (s, t) {
			var rs = eval("try{" + s + ".document." + t + ";}catch(_e){'';};");
			return rs;
		},
		f: function () {
			var r = '';
			var flen = 0;
			try {
				flen = top.frames.length;
			} catch (_e) {
				flen = 0;
			};
			if ((flen != 0) && (typeof(top) == 'object')) {
				r = _k.e('top', 'URL');
				if (r != document.URL) {
					return 1;
				};
			};
			return 0;
		},
		get: function () {
			var _rf = '',
			_ul = '',
			_prl = '',
			_ad = '';
			var frm = _k.f();
			if (frm != 0) {
				_prl = _k.e('top', 'URL');
				if (_prl == '') {
					_prl = _k.e('parent', 'URL');
				};
				_prl = _f.hr(_k.r(_prl, '#'), 'u');
				_rf = _f.ref;
				if (_rf == _t.bk) {
					_rf = _k.e('parent', 'URL');
				};
				_rf = _f.hr(_k.r(_rf, '#'), 'r');
				if (_rf == _prl) {
					_rf = _k.e('top', 'referrer');
					if (_rf == '') {
						_rf = _t.bk;
					};
					_ad = _k.up(_f.url);
					if (typeof(top._AceTM.em) != _t.d) {
						_rf = _prl;
					} else {
						if (_f.ix(_f.cg('ACF0', 1), _s1.run(_rf)) > -1) {
							_rf = _prl;
						} else {
							_ad = _k.up(_prl);
							_f.cs('ACF0', _s1.run(_rf), 0, '/', '', 1);
						}
					}
				}
				_rf = _f.pdm(_rf, _t.bk);
				_ul = _k.r(_f.url, '?');
				return {
					url: _f.hr(_ul, 'u'),
					pam: _ad,
					ref: _rf
				};
			} else {
				_rf = _f.ref;
				_ul = _k.r(_f.url, '?');
				_rf = _f.pdm(_rf, '');
				_rf = (_rf != '') ? _rf : _t.bk;
				_ad = _k.up(_f.url);
				return {
					url: _f.hr(_ul, 'u'),
					pam: _ad,
					ref: _f.hr(_rf, 'r')
				};
			}
		}
	};
	var _p = {
		UTA: function (url) {
			var request = "";
			var pairs = url.substring(url.indexOf('?') + 1).split('&');
			for (var i = 0; i < pairs.length; i++) {
				if (!pairs[i]) {
					continue;
				}
				var pair = pairs[i].split('=');
				request += pair[0] + "=" + _f.u(pair[1]) + "\n";
			}
			return request;
		},
		p: location.protocol + '//dnt.acecounter.com',
		all: function (ret, ex) {
			var toS = '';
			for (var _ix in ret) {
				if (typeof(ex) != _t.d && _f.ix(_ix, ex) >= 0) {
					continue;
				}
				toS += '&' + _ix + '=' + ret[_ix];
			};
			return toS;
		},
		Img: function (b) {
			var _at = ((new Date().getTime()) - oa.em) + "." + _f.rnd();
			var srm = _p.p + '/?' + b + '&rnd=' + _at;
			var ism = oa.wBeacon,
			ismX = (ism.length > 0) ? ism.length : 0;
			ism.push(new Image(0, 0));
			ism[ismX].src = srm.replace('?&aci=', '?aci=');
			oa.sendLog.push(ism[ismX].src);
		},
		appr: function (a, b) {
			return _f.rep(a, location.host + '/', b + '/');
		},
		send: function (w, s, x) {
			var an = _sse.ast();
			var buy = _def.buy(oa);
			var sm = {
				aci: oa.acid,
				acm: w,
				aem: 'PV'
			};
			var em = {
				rel: 0,
				url: '',
				prmt: '',
				eref: '',
				rdm: 'Direct'
			};
			var ob = oa.BV;
			var slog = '';
			var _L = _f.al;
			if (_f.ap.length == 6 && _f.al != '') {
				_f.ref = _f.gpr(_L, 'eref', _f.ref);
				_f.ref = _f.u(_f.ref);
				_f.url = _f.gpr(_L, 'url', _f.url);
				_f.url = _f.u(_f.url);
				an.avt = _f.gpr(_L, 'avt', an.avt);
				an.avn = _f.gpr(_L, 'avn', an.avn);
				an.avc = _f.gpr(_L, 'avc', an.avc);
				an.cid = _f.gpr(_L, 'cid', an.cid);
				an.uid = _f.gpr(_L, 'uid', an.uid);
				an.did = _f.gpr(_L, 'did', an.did);
				_s.pcm = _f.gpr(_L, 'pcm', _s.pcm);
				_s.ul = _f.gpr(_L, 'ul', _s.ul);
				_s.dmn = _f.gpr(_L, 'dmn', '');
				_s.dtc = _f.gpr(_L, 'dtc', '');
				_s.dav = _f.gpr(_L, 'dav', '');
				_s.dsc = _f.gpr(_L, 'dsc', '');
				_s.sv = _f.gpr(_L, 'sv', '');
			}
			var stm = _s.toStr();
			var up = _k.get();
			em.url = _f.e(_f.hr(up.url, 'u'));
			em.prmt = _f.e(up.pam);
			em.eref = _f.e(_f.hr(up.ref, 'r'));
			if (typeof(w) != _t.d) {
				switch (w) {
				case "SITE":
					var udef = _def.ud(oa);
					if (udef.mt == 1) {
						an.uid = _sse.reNew(_s1.run(udef.mid), 3, 41);
					} else if (_f.len(an.did) == 0) {
						an.did = _sse.reNew(_f.uqi(), 4, 19);
					} else if (udef.mt == 0 && _f.len(an.uid) != 0) {
						_sse.reMem(udef);
						udef = _def.ud(oa);
					}
					_sse.reNew(an.aet, 1, 0);
					_f.ea("error", _s.jserr);
					sm.aem = (udef.ep == true) ? "PGERR" : "PV";
					em.eref = _f.e(_f.hr(up.ref, 'r'));
					em.rdm = _f.rdm();
					if (typeof(s) != _t.d) {
						em.eref = em.url;
						em.rdm = _f.hr(_f.url, 'h');
						em.url = _f.e(_k.r(s, '?'));
						em.prmt = _f.e(_k.up(s));
					}
					if (_f.ap.length == 6 && _f.al != '') {
						em.rdm = _f.gpr(_L, 'rdm', _f.rdm());
						if (_f.gpr(_L, 'mt', 0) == '4') {
							_def.age = _f.gpr(_L, 'age', 0);
							_def.gd = _f.gpr(_L, 'gd', '');
							_def.ud1 = _f.gpr(_L, 'ud1', '');
							_def.ud2 = _f.gpr(_L, 'ud2', '');
							_def.ud3 = _f.gpr(_L, 'ud3', '');
							_def.ud4 = _f.gpr(_L, 'ud4', '');
							_def.ud5 = _f.gpr(_L, 'ud5', '');
							udef = _def.ud(oa);
						}
					}
					slog = udef.toStr;
					var aceAction = ((typeof(oa.aceAction) != _t.d) ? oa.aceAction : 'visit');
					_def.atmp(oa, aceAction);
					if (typeof(oa.Product) == _t.o) {
						aceAction = 'view';
					}
					_def.atmp(oa, aceAction);	
					var _uArray = [
					{"info":
							{
								"path":"/sms/bottom",
								"name":"푸터하단완료"
							
					}},
					{"info":
							{
								"path":"/sms/best5",
								"name":"베스트5완료"
							
					}},
					{"info":
							{
								"path":"/sms/success",
								"name":"성공창업추천점포 상세완료"
							
					}},
					{"info":
							{
								"path":"/sms/change",
								"name":"업종전환창업지원 하단완료	"
							
					}},
					{"info":
							{
								"path":"/sms/quick",
								"name":"퀵완료"
							
					}},
					{"info":
							{
								"path":"/board/complete/establish_change",
								"name":"업종전환문의완료"
							
					}},
					{"info":
							{
								"path":"/board/complete/establish_app",
								"name":"창업설명회신청완료"
							
					}},
					{"info":
							{
								"path":"/board/complete/establish",
								"name":"창업질문완료"
							
					}},
					{"info":
							{
								"path":"/board/complete/establish_online",
								"name":"온라인 창업문의 완료"
							
					}}
						
					];
					
					for(var ts in _uArray){
						//console.log((_f.u(em.url).indexOf(_uArray[ts].info.path))+'@@'+_uArray[ts].info.path);
						if(location.pathname==String(_uArray[ts].info.path)){
							_def.atSendBuy(String(_uArray[ts].info.name));
						}
					}
					
					
					
					var nr = em.url + em.prmt + em.eref;
					em.rel = _f.rel(nr, _k.f());
					_f.cs('ACR' + _k.f(), _s1.run(nr), 0, '/', '', 1);
					break;
				case "NOW":
				case "WISH":
				case "CART":
					_def.atmp(oa, 'cart');
					break;
				case "PAY":
					sm.acm = 'PRODUCT';
					sm.aem = w;
					em.eref = _f.e(s);
					slog = (w == 'PAY' ? '&pyn=' + _f.e(x) : '&pyn=');
					break;
				case "REVIEW":
					sm.acm = 'PRODUCT';
					sm.aem = w;
					slog = _p.all({
							pno: _f.e(s.co),
							prn: _f.e(s.rn),
							prt: s.rat
						});
					break;
				case "JSERR":
					sm.acm = 'EVENT';
					sm.aem = w;
					em.eref = _f.e(s.errn);
					slog = _p.all({
							ern: s.errno
						});
					break;
				case "BC":
				case "BV":
					sm.acm = 'EVENT';
					sm.aem = w;
					em.eref = _f.e(_f.ptc(s));
					em.sm = _f.e(x);
					break;
				case "SNS":
					sm.acm = 'EVENT';
					sm.aem = w;
					em.eref = _f.e(_f.ptc(s));
					slog = _p.all({
							pno: _def.pno
						});
					break;
				case "CLICK":
				case "TEL":
				case "HREF":
					sm.acm = 'EVENT';
					sm.aem = w;
					em.eref = _f.e(_f.ptc(s));
					break;
				}
				_p.Img(_p.all(sm) + _p.all(an) + _p.all(em) + stm + slog);
				if (w == 'SITE' && _f.len(buy.orn) != 0 && em.rel == 0) {
					var oll = buy.oll;
					sm.acm = 'PRODUCT';
					sm.aem = 'BUY';
					_def.atmp(oa, 'buy');
					em.eref = _t.u;
					_sse.reNew(an.aet, 5, 0);
					var rn = _p.all(sm) + _p.all(an, 'ovt') + _p.all(em) + stm + '&ovt=' + an.ovt + buy.toStr;
					for (var ii = 0; ii < oll.length; ii++) {
						_p.Img(_f.rep(rn, '&eref=' + _t.u, '&eref=' + _f.e(oll[ii])));
					}
				} else if ((w == 'SITE') && (typeof(ob) == _t.o)) {
					var _ret = _def.oBV(oa);
					sm.acm = 'EVENT';
					sm.aem = 'BV';
					em.eref = _t.u;
					var ee = _p.all(sm) + _p.all(an) + _p.all(em) + stm;
					for (var _ix in _ret) {
						var er = _ret[_ix];
						_p.Img(_f.rep(ee, '&eref=' + _t.u, '&eref=' + er.pn + '&sm=' + er.bn));
					}
				}
			};
		}
	};
	oa.sendLog = [];
	oa.wBeacon = [];
	oa.tms = (typeof(_AceTM_CID) != _t.d) ? _AceTM_CID : '';
	oa.Sharing = function (a) {
		if (a != '') {
			var ng = a;
			if (_c.cd(ng) != -1) {
				ng = _c.cv(a);
			}
			_f.sTo(ng, 500);
		}
	};
	oa.Location = function (a) {
		if (a != '') {
			_f.sTo(a, 500);
		}
	};
	oa.WishList = function (a) {
		var dp = _def.prd(oa, a);
		if (dp.length != 0) {
			_p.send("WISH", dp);
		};
		return 0;
	};
	oa.AddWishList = function () {
		var dp = _def.prdLst(oa);
		if (dp.length != 0) {
			for (var _cx in dp) {
				_p.send("WISH", dp[_cx]);
			};
		};
	};
	oa.ModPrdList = function (a, b, c, d, e) {
		var dp = _def.prdModify(a, b, c, d, e, oa);
	};
	oa.AddCart = function (a) {
		var dp = _def.prd(oa, a);
		if (dp.length != 0) {
			_p.send("CART", dp);
		};
	};
	oa.AddCartList = function () {
		var dp = _def.prdLst(oa);
		if (dp.length != 0) {
			for (var _cx in dp) {
				_p.send("CART", dp[_cx]);
			};
		};
	};
	oa.BuyNow = function (a) {
		var dp = _def.prd(oa, a);
		if (dp.length != 0) {
			_p.send("NOW", dp);
		};
	};
	oa.AddBuyNowList = function () {
		var dp = _def.prdLst(oa);
		if (dp.length != 0) {
			for (var _cx in dp) {
				_p.send("NOW", dp[_cx]);
			};
		};
	};
	oa.SNS = function (a) {
		if (a != '' && typeof(a) != _t.d) {
			_p.send("SNS", a);
		}
	};
	oa.OtherBuy = function (a, b) {
		if (a != '' && typeof(a) != _t.d) {
			_p.send("PAY", _def.prd(oa, a), b);
		}
	}
	oa.PAY = function (a, b) {
		var dp = _def.prd(oa, a);
		if (dp.length != 0) {
			_p.send("PAY", dp, b);
		};
	}
	oa.ReView = function (a, b, c) {
		if (typeof(a) != _t.d && _f.len(a) > 0 && typeof(b) != _t.d && _f.len(b) > 0 && c != 0 && c <= 5) {
			_p.send("REVIEW", {
				co: a,
				rn: b,
				rat: c
			});
		}
	};
	oa.PV = function (q) {
		var cu = '';
		if ((q != "") && (q.substr(0, 1) == "/")) {
			cu = (_f.hr(_f.url, 'h') + '' + q);
			cu = cu.replace(/\/\//gi, "/");
			_p.send('SITE', cu);
		}
	};
	oa.CustomerClick = function (a) {
		if (a != '' && typeof(a) != _t.d && _f.len(a) <= 32) {
			_p.send('CLICK', a);
		}
	};
	oa.oBannerClick = function (a, b) {
		if (a != '' && typeof(a) != _t.d && _f.len(a) <= 10) {
			_p.send('BC', a, b);
		}
	};
	oa.oBannerView = function (a, b) {
		if (a != '' && typeof(a) != _t.d && _f.len(a) <= 10) {
			_p.send('BV', a, b);
		}
	};
	oa.applog = function (a) {
		_f.al = a;
		_p.send("SITE");
		_c.Run();
	}
	if (typeof(oa.acid) != _t.d) {
		if (_f.ap.length != 6) {
			_p.send("SITE");
			_c.Run();
		}
	}
	return oa;
})(window._AceTM || []);
