import {
  config,
  printIonError,
  printIonWarning
} from "./chunk-ZMADNXEU.js";
import {
  __spreadArray
} from "./chunk-N25OJVE5.js";

// node_modules/@ionic/core/dist/esm-es5/index-a5d50daf.js
var win = typeof window !== "undefined" ? window : void 0;
var doc = typeof document !== "undefined" ? document : void 0;

// node_modules/@ionic/core/dist/esm-es5/animation-8b25e105.js
var animationPrefix;
var getAnimationPrefix = function(r) {
  if (animationPrefix === void 0) {
    var n = r.style.animationName !== void 0;
    var e = r.style.webkitAnimationName !== void 0;
    animationPrefix = !n && e ? "-webkit-" : "";
  }
  return animationPrefix;
};
var setStyleProperty = function(r, n, e) {
  var i = n.startsWith("animation") ? getAnimationPrefix(r) : "";
  r.style.setProperty(i + n, e);
};
var addClassToArray = function(r, n) {
  if (r === void 0) {
    r = [];
  }
  if (n !== void 0) {
    var e = Array.isArray(n) ? n : [n];
    return __spreadArray(__spreadArray([], r, true), e, true);
  }
  return r;
};
var createAnimation = function(r) {
  var n;
  var e;
  var i;
  var t;
  var a;
  var f;
  var u = [];
  var o = [];
  var v = [];
  var d = false;
  var c;
  var s = {};
  var l = [];
  var m = [];
  var y = {};
  var p = 0;
  var A = false;
  var g = false;
  var C;
  var b;
  var _;
  var P = true;
  var E = false;
  var S = true;
  var x;
  var T = false;
  var w = r;
  var h = [];
  var k = [];
  var R = [];
  var I = [];
  var D = [];
  var F = [];
  var W = [];
  var j = [];
  var K = [];
  var M = [];
  var q = [];
  var z = typeof AnimationEffect === "function" || win !== void 0 && typeof win.AnimationEffect === "function";
  var B = typeof Element === "function" && typeof Element.prototype.animate === "function" && z;
  var G = function() {
    return q;
  };
  var H = function(r2) {
    D.forEach(function(n2) {
      n2.destroy(r2);
    });
    J(r2);
    I.length = 0;
    D.length = 0;
    u.length = 0;
    V();
    d = false;
    S = true;
    return x;
  };
  var J = function(r2) {
    X();
    if (r2) {
      Y();
    }
  };
  var L = function() {
    A = false;
    g = false;
    S = true;
    C = void 0;
    b = void 0;
    _ = void 0;
    p = 0;
    E = false;
    P = true;
    T = false;
  };
  var N = function() {
    return p !== 0 && !T;
  };
  var O = function(r2, n2) {
    var e2 = n2.findIndex(function(n3) {
      return n3.c === r2;
    });
    if (e2 > -1) {
      n2.splice(e2, 1);
    }
  };
  var Q = function(r2, n2) {
    R.push({
      c: r2,
      o: n2
    });
    return x;
  };
  var U = function(r2, n2) {
    var e2 = (n2 === null || n2 === void 0 ? void 0 : n2.oneTimeCallback) ? k : h;
    e2.push({
      c: r2,
      o: n2
    });
    return x;
  };
  var V = function() {
    h.length = 0;
    k.length = 0;
    return x;
  };
  var X = function() {
    if (B) {
      q.forEach(function(r2) {
        r2.cancel();
      });
      q.length = 0;
    }
  };
  var Y = function() {
    F.forEach(function(r2) {
      if (r2 === null || r2 === void 0 ? void 0 : r2.parentNode) {
        r2.parentNode.removeChild(r2);
      }
    });
    F.length = 0;
  };
  var Z = function(r2) {
    W.push(r2);
    return x;
  };
  var $ = function(r2) {
    j.push(r2);
    return x;
  };
  var rr = function(r2) {
    K.push(r2);
    return x;
  };
  var nr = function(r2) {
    M.push(r2);
    return x;
  };
  var er = function(r2) {
    o = addClassToArray(o, r2);
    return x;
  };
  var ir = function(r2) {
    v = addClassToArray(v, r2);
    return x;
  };
  var tr = function(r2) {
    if (r2 === void 0) {
      r2 = {};
    }
    s = r2;
    return x;
  };
  var ar = function(r2) {
    if (r2 === void 0) {
      r2 = [];
    }
    for (var n2 = 0, e2 = r2; n2 < e2.length; n2++) {
      var i2 = e2[n2];
      s[i2] = "";
    }
    return x;
  };
  var fr = function(r2) {
    l = addClassToArray(l, r2);
    return x;
  };
  var ur = function(r2) {
    m = addClassToArray(m, r2);
    return x;
  };
  var or = function(r2) {
    if (r2 === void 0) {
      r2 = {};
    }
    y = r2;
    return x;
  };
  var vr = function(r2) {
    if (r2 === void 0) {
      r2 = [];
    }
    for (var n2 = 0, e2 = r2; n2 < e2.length; n2++) {
      var i2 = e2[n2];
      y[i2] = "";
    }
    return x;
  };
  var dr = function() {
    if (a !== void 0) {
      return a;
    }
    if (c) {
      return c.getFill();
    }
    return "both";
  };
  var cr = function() {
    if (C !== void 0) {
      return C;
    }
    if (f !== void 0) {
      return f;
    }
    if (c) {
      return c.getDirection();
    }
    return "normal";
  };
  var sr = function() {
    if (A) {
      return "linear";
    }
    if (i !== void 0) {
      return i;
    }
    if (c) {
      return c.getEasing();
    }
    return "linear";
  };
  var lr = function() {
    if (g) {
      return 0;
    }
    if (b !== void 0) {
      return b;
    }
    if (e !== void 0) {
      return e;
    }
    if (c) {
      return c.getDuration();
    }
    return 0;
  };
  var mr = function() {
    if (t !== void 0) {
      return t;
    }
    if (c) {
      return c.getIterations();
    }
    return 1;
  };
  var yr = function() {
    if (_ !== void 0) {
      return _;
    }
    if (n !== void 0) {
      return n;
    }
    if (c) {
      return c.getDelay();
    }
    return 0;
  };
  var pr = function() {
    return u;
  };
  var Ar = function(r2) {
    f = r2;
    jr(true);
    return x;
  };
  var gr = function(r2) {
    a = r2;
    jr(true);
    return x;
  };
  var Cr = function(r2) {
    n = r2;
    jr(true);
    return x;
  };
  var br = function(r2) {
    i = r2;
    jr(true);
    return x;
  };
  var _r = function(r2) {
    if (!B && r2 === 0) {
      r2 = 1;
    }
    e = r2;
    jr(true);
    return x;
  };
  var Pr = function(r2) {
    t = r2;
    jr(true);
    return x;
  };
  var Er = function(r2) {
    c = r2;
    return x;
  };
  var Sr = function(r2) {
    if (r2 != null) {
      if (r2.nodeType === 1) {
        I.push(r2);
      } else if (r2.length >= 0) {
        for (var n2 = 0; n2 < r2.length; n2++) {
          I.push(r2[n2]);
        }
      } else {
        printIonError("createAnimation - Invalid addElement value.");
      }
    }
    return x;
  };
  var xr = function(r2) {
    if (r2 != null) {
      if (Array.isArray(r2)) {
        for (var n2 = 0, e2 = r2; n2 < e2.length; n2++) {
          var i2 = e2[n2];
          i2.parent(x);
          D.push(i2);
        }
      } else {
        r2.parent(x);
        D.push(r2);
      }
    }
    return x;
  };
  var Tr = function(r2) {
    var n2 = u !== r2;
    u = r2;
    if (n2) {
      wr(u);
    }
    return x;
  };
  var wr = function(r2) {
    if (B) {
      G().forEach(function(n2) {
        var e2 = n2.effect;
        if (e2.setKeyframes) {
          e2.setKeyframes(r2);
        } else {
          var i2 = new KeyframeEffect(e2.target, r2, e2.getTiming());
          n2.effect = i2;
        }
      });
    }
  };
  var hr = function() {
    W.forEach(function(r3) {
      return r3();
    });
    j.forEach(function(r3) {
      return r3();
    });
    var r2 = o;
    var n2 = v;
    var e2 = s;
    I.forEach(function(i2) {
      var t2 = i2.classList;
      r2.forEach(function(r3) {
        return t2.add(r3);
      });
      n2.forEach(function(r3) {
        return t2.remove(r3);
      });
      for (var a2 in e2) {
        if (e2.hasOwnProperty(a2)) {
          setStyleProperty(i2, a2, e2[a2]);
        }
      }
    });
  };
  var kr = function() {
    K.forEach(function(r3) {
      return r3();
    });
    M.forEach(function(r3) {
      return r3();
    });
    var r2 = P ? 1 : 0;
    var n2 = l;
    var e2 = m;
    var i2 = y;
    I.forEach(function(r3) {
      var t2 = r3.classList;
      n2.forEach(function(r4) {
        return t2.add(r4);
      });
      e2.forEach(function(r4) {
        return t2.remove(r4);
      });
      for (var a2 in i2) {
        if (i2.hasOwnProperty(a2)) {
          setStyleProperty(r3, a2, i2[a2]);
        }
      }
    });
    b = void 0;
    C = void 0;
    _ = void 0;
    h.forEach(function(n3) {
      return n3.c(r2, x);
    });
    k.forEach(function(n3) {
      return n3.c(r2, x);
    });
    k.length = 0;
    S = true;
    if (P) {
      E = true;
    }
    P = true;
  };
  var Rr = function() {
    if (p === 0) {
      return;
    }
    p--;
    if (p === 0) {
      kr();
      if (c) {
        c.animationFinish();
      }
    }
  };
  var Ir = function() {
    I.forEach(function(r2) {
      var n2 = r2.animate(u, {
        id: w,
        delay: yr(),
        duration: lr(),
        easing: sr(),
        iterations: mr(),
        fill: dr(),
        direction: cr()
      });
      n2.pause();
      q.push(n2);
    });
    if (q.length > 0) {
      q[0].onfinish = function() {
        Rr();
      };
    }
  };
  var Dr = function() {
    hr();
    if (u.length > 0) {
      if (B) {
        Ir();
      }
    }
    d = true;
  };
  var Fr = function(r2) {
    r2 = Math.min(Math.max(r2, 0), 0.9999);
    if (B) {
      q.forEach(function(n2) {
        n2.currentTime = n2.effect.getComputedTiming().delay + lr() * r2;
        n2.pause();
      });
    }
  };
  var Wr = function(r2) {
    q.forEach(function(r3) {
      r3.effect.updateTiming({
        delay: yr(),
        duration: lr(),
        easing: sr(),
        iterations: mr(),
        fill: dr(),
        direction: cr()
      });
    });
    if (r2 !== void 0) {
      Fr(r2);
    }
  };
  var jr = function(r2, n2, e2) {
    if (r2 === void 0) {
      r2 = false;
    }
    if (n2 === void 0) {
      n2 = true;
    }
    if (r2) {
      D.forEach(function(i2) {
        i2.update(r2, n2, e2);
      });
    }
    if (B) {
      Wr(e2);
    }
    return x;
  };
  var Kr = function(r2, n2) {
    if (r2 === void 0) {
      r2 = false;
    }
    D.forEach(function(e2) {
      e2.progressStart(r2, n2);
    });
    zr();
    A = r2;
    if (!d) {
      Dr();
    }
    jr(false, true, n2);
    return x;
  };
  var Mr = function(r2) {
    D.forEach(function(n2) {
      n2.progressStep(r2);
    });
    Fr(r2);
    return x;
  };
  var qr = function(r2, n2, e2) {
    A = false;
    D.forEach(function(i2) {
      i2.progressEnd(r2, n2, e2);
    });
    if (e2 !== void 0) {
      b = e2;
    }
    E = false;
    P = true;
    if (r2 === 0) {
      C = cr() === "reverse" ? "normal" : "reverse";
      if (C === "reverse") {
        P = false;
      }
      if (B) {
        jr();
        Fr(1 - n2);
      } else {
        _ = (1 - n2) * lr() * -1;
        jr(false, false);
      }
    } else if (r2 === 1) {
      if (B) {
        jr();
        Fr(n2);
      } else {
        _ = n2 * lr() * -1;
        jr(false, false);
      }
    }
    if (r2 !== void 0 && !c) {
      Lr();
    }
    return x;
  };
  var zr = function() {
    if (d) {
      if (B) {
        q.forEach(function(r2) {
          r2.pause();
        });
      } else {
        I.forEach(function(r2) {
          setStyleProperty(r2, "animation-play-state", "paused");
        });
      }
      T = true;
    }
  };
  var Br = function() {
    D.forEach(function(r2) {
      r2.pause();
    });
    zr();
    return x;
  };
  var Gr = function() {
    Rr();
  };
  var Hr = function() {
    q.forEach(function(r2) {
      r2.play();
    });
    if (u.length === 0 || I.length === 0) {
      Rr();
    }
  };
  var Jr = function() {
    if (B) {
      Fr(0);
      Wr();
    }
  };
  var Lr = function(r2) {
    return new Promise(function(n2) {
      if (r2 === null || r2 === void 0 ? void 0 : r2.sync) {
        g = true;
        U(function() {
          return g = false;
        }, {
          oneTimeCallback: true
        });
      }
      if (!d) {
        Dr();
      }
      if (E) {
        Jr();
        E = false;
      }
      if (S) {
        p = D.length + 1;
        S = false;
      }
      var e2 = function() {
        O(i2, k);
        n2();
      };
      var i2 = function() {
        O(e2, R);
        n2();
      };
      U(i2, {
        oneTimeCallback: true
      });
      Q(e2, {
        oneTimeCallback: true
      });
      D.forEach(function(r3) {
        r3.play();
      });
      if (B) {
        Hr();
      } else {
        Gr();
      }
      T = false;
    });
  };
  var Nr = function() {
    D.forEach(function(r2) {
      r2.stop();
    });
    if (d) {
      X();
      d = false;
    }
    L();
    R.forEach(function(r2) {
      return r2.c(0, x);
    });
    R.length = 0;
  };
  var Or = function(r2, n2) {
    var e2;
    var i2 = u[0];
    if (i2 !== void 0 && (i2.offset === void 0 || i2.offset === 0)) {
      i2[r2] = n2;
    } else {
      u = __spreadArray([(e2 = {
        offset: 0
      }, e2[r2] = n2, e2)], u, true);
    }
    return x;
  };
  var Qr = function(r2, n2) {
    var e2;
    var i2 = u[u.length - 1];
    if (i2 !== void 0 && (i2.offset === void 0 || i2.offset === 1)) {
      i2[r2] = n2;
    } else {
      u = __spreadArray(__spreadArray([], u, true), [(e2 = {
        offset: 1
      }, e2[r2] = n2, e2)], false);
    }
    return x;
  };
  var Ur = function(r2, n2, e2) {
    return Or(r2, n2).to(r2, e2);
  };
  return x = {
    parentAnimation: c,
    elements: I,
    childAnimations: D,
    id: w,
    animationFinish: Rr,
    from: Or,
    to: Qr,
    fromTo: Ur,
    parent: Er,
    play: Lr,
    pause: Br,
    stop: Nr,
    destroy: H,
    keyframes: Tr,
    addAnimation: xr,
    addElement: Sr,
    update: jr,
    fill: gr,
    direction: Ar,
    iterations: Pr,
    duration: _r,
    easing: br,
    delay: Cr,
    getWebAnimations: G,
    getKeyframes: pr,
    getFill: dr,
    getDirection: cr,
    getDelay: yr,
    getIterations: mr,
    getEasing: sr,
    getDuration: lr,
    afterAddRead: rr,
    afterAddWrite: nr,
    afterClearStyles: vr,
    afterStyles: or,
    afterRemoveClass: ur,
    afterAddClass: fr,
    beforeAddRead: Z,
    beforeAddWrite: $,
    beforeClearStyles: ar,
    beforeStyles: tr,
    beforeRemoveClass: ir,
    beforeAddClass: er,
    onFinish: U,
    isRunning: N,
    progressStart: Kr,
    progressStep: Mr,
    progressEnd: qr
  };
};

// node_modules/@ionic/core/dist/esm-es5/helpers-d94bc8ad.js
var componentOnReady = function(r, a) {
  if (r.componentOnReady) {
    r.componentOnReady().then(function(r2) {
      return a(r2);
    });
  } else {
    raf(function() {
      return a(r);
    });
  }
};
var raf = function(r) {
  if (typeof __zone_symbol__requestAnimationFrame === "function") {
    return __zone_symbol__requestAnimationFrame(r);
  }
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame(r);
  }
  return setTimeout(r);
};

// node_modules/@ionic/core/dist/esm-es5/index-68c0d151.js
var moveFocus = function(n) {
  n.tabIndex = -1;
  n.focus();
};
var isVisible = function(n) {
  return n.offsetParent !== null;
};
var createFocusController = function() {
  var n = function(n2) {
    var e2 = config.get("focusManagerPriority", false);
    if (e2) {
      var r = document.activeElement;
      if (r !== null && (n2 === null || n2 === void 0 ? void 0 : n2.contains(r))) {
        r.setAttribute(LAST_FOCUS, "true");
      }
    }
  };
  var e = function(n2) {
    var e2 = config.get("focusManagerPriority", false);
    if (Array.isArray(e2) && !n2.contains(document.activeElement)) {
      var r = n2.querySelector("[".concat(LAST_FOCUS, "]"));
      if (r && isVisible(r)) {
        moveFocus(r);
        return;
      }
      for (var i = 0, t = e2; i < t.length; i++) {
        var a = t[i];
        switch (a) {
          case "content":
            var o = n2.querySelector('main, [role="main"]');
            if (o && isVisible(o)) {
              moveFocus(o);
              return;
            }
            break;
          case "heading":
            var s = n2.querySelector('h1, [role="heading"][aria-level="1"]');
            if (s && isVisible(s)) {
              moveFocus(s);
              return;
            }
            break;
          case "banner":
            var u = n2.querySelector('header, [role="banner"]');
            if (u && isVisible(u)) {
              moveFocus(u);
              return;
            }
            break;
          default:
            printIonWarning("Unrecognized focus manager priority value ".concat(a));
            break;
        }
      }
      moveFocus(n2);
    }
  };
  return {
    saveViewFocus: n,
    setViewFocus: e
  };
};
var LAST_FOCUS = "ion-last-focus";
var focusController = createFocusController();
var getIonPageElement = function(n) {
  if (n.classList.contains("ion-page")) {
    return n;
  }
  var e = n.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs");
  if (e) {
    return e;
  }
  return n;
};

export {
  doc,
  createAnimation,
  componentOnReady,
  getIonPageElement
};
/*! Bundled license information:

@ionic/core/dist/esm-es5/index-a5d50daf.js:
@ionic/core/dist/esm-es5/animation-8b25e105.js:
@ionic/core/dist/esm-es5/helpers-d94bc8ad.js:
@ionic/core/dist/esm-es5/index-68c0d151.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=chunk-6PSV6M47.js.map
