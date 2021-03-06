/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-getusermedia-setclasses !*/
!function ( e, n, s ) {
  function a( e ) {
    var n = r.className, s = Modernizr._config.classPrefix || "";
    if (c && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var a = new RegExp("(^|\\s)" + s + "no-js(\\s|$)");
      n = n.replace(a, "$1" + s + "js$2");
    }
    Modernizr._config.enableClasses && (n += " " + s + e.join(" " + s), c ? r.className.baseVal = n : r.className = n);
  }

  function o( e, n ) {return typeof e === n;}

  function i() {
    var e, n, s, a, i, l, r;
    for (var c in f) if (f.hasOwnProperty(c)) {
      if (e = [], n = f[c], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (s = 0; s < n.options.aliases.length; s++) e.push(n.options.aliases[s].toLowerCase());
      for (a = o(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) l = e[i], r = l.split("."), 1 === r.length ? Modernizr[r[0]] = a : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = a), t.push((a ? "" : "no-") + r.join("-"));
    }
  }

  var t        = [], f = [], l = {
    _version:     "3.6.0",
    _config:      { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
    _q:           [],
    on:           function ( e, n ) {
      var s = this;
      setTimeout(function () {n(s[e]);}, 0);
    },
    addTest:      function ( e, n, s ) {f.push({ name: e, fn: n, options: s });},
    addAsyncTest: function ( e ) {f.push({ name: null, fn: e });},
  }, Modernizr = function () {};
  Modernizr.prototype = l, Modernizr = new Modernizr;
  var r = n.documentElement, c = "svg" === r.nodeName.toLowerCase();
  Modernizr.addTest("getUserMedia", "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices), i(), a(t), delete l.addTest, delete l.addAsyncTest;
  for (var d = 0; d < Modernizr._q.length; d++) Modernizr._q[d]();
  e.Modernizr = Modernizr;
}(window, document);
