/* Somi TV logo idle life: breathing, glances, blinks and an occasional wave, hop or letter shimmy.
   ES5, no libraries. Renders at most 30fps, holds still briefly while the remote is in use and
   stops while the page is hidden. Only SVG transforms and the eye cut-outs change. */
(function () {
  var svg = document.getElementById('brandLogo'), bodyPath = document.getElementById('logoBody');
  if (!svg || !bodyPath) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(id) { return document.getElementById(id); }
  function mk(ox, oy) { return { x: 0, y: 0, r: 0, sx: 1, sy: 1, ox: ox, oy: oy }; }
  var CH = mk(127, 597), ARM = mk(275, 960), T = mk(94, 484.6), V = mk(276, 484.6);
  var EYE = { x: 0, y: 0, sx: 1, lid: 0, wide: 1, happy: 0 };
  var el = { ch: $('logoChar'), arm: $('logoArm'), t: $('logoT'), v: $('logoV') };
  var BODY = bodyPath.getAttribute('d'), lastD = '', breath = 0;
  var EYES = [{ cx: 882.5, cy: 1011.5, rx: 66.5, ry: 93.5 }, { cx: 1121.5, cy: 990, rx: 65.5, ry: 88 }];
  function f(n) { return Math.round(n * 10) / 10; }
  function ell(cx, cy, rx, ry) { return 'M' + f(cx - rx) + ' ' + f(cy) + 'A' + f(rx) + ' ' + f(ry) + ' 0 1 0 ' + f(cx + rx) + ' ' + f(cy) + 'A' + f(rx) + ' ' + f(ry) + ' 0 1 0 ' + f(cx - rx) + ' ' + f(cy) + 'Z'; }
  function tf(o, sx, sy) { return 'translate(' + f(o.x) + ' ' + f(o.y) + ') translate(' + o.ox + ' ' + o.oy + ') rotate(' + f(o.r * 10) / 10 + ') scale(' + (Math.round(sx * 1000) / 1000) + ' ' + (Math.round(sy * 1000) / 1000) + ') translate(' + (-o.ox) + ' ' + (-o.oy) + ')'; }
  function render() {
    el.ch.setAttribute('transform', tf(CH, CH.sx * (1 - breath * 0.012), CH.sy * (1 + breath * 0.028)));
    el.arm.setAttribute('transform', tf(ARM, ARM.sx, ARM.sy));
    el.t.setAttribute('transform', tf(T, T.sx, T.sy));
    el.v.setAttribute('transform', tf(V, V.sx, V.sy));
    var sy = Math.max(0.06, (1 - 0.94 * EYE.lid) * (1 - 0.62 * EYE.happy)) * EYE.wide, sx = EYE.sx * EYE.wide, d = BODY, i, e;
    for (i = 0; i < EYES.length; i++) {
      e = EYES[i];
      // Lids close toward the lower third, as in the original character animation.
      d += ell(e.cx + EYE.x, e.cy + EYE.y - 45 * EYE.happy + e.ry * 0.25 * (1 - sy / EYE.wide), e.rx * sx, e.ry * sy);
    }
    if (d !== lastD) { bodyPath.setAttribute('d', d); lastD = d; }
  }
  render();
  if (reduce) return;

  function pin(n) { return function (t) { return Math.pow(t, n); }; }
  function pout(n) { return function (t) { return 1 - Math.pow(1 - t, n); }; }
  function elastic(p) { return function (t) { return t === 0 || t === 1 ? t : Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1; }; }
  var E = { p2i: pin(3), p2o: pout(3), p3o: pout(4), so: function (t) { return Math.sin(t * Math.PI / 2); }, sio: function (t) { return -(Math.cos(Math.PI * t) - 1) / 2; } };
  function now() { return window.performance && performance.now ? performance.now() : Date.now(); }
  function R(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  // Minimal tween engine. A tween that starts takes over its properties from older running tweens.
  var tweens = [];
  function tw(obj, props, dur, ease, delay) {
    var w = { obj: obj, props: props, dur: dur * 1000, ease: ease || E.p2o, start: now() + (delay || 0) * 1000, from: null };
    tweens.push(w); return w;
  }
  function seq(obj, steps, delay) {
    var at = delay || 0, i;
    for (i = 0; i < steps.length; i++) { tw(obj, steps[i][0], steps[i][1], steps[i][2], at); at += steps[i][1]; }
    return at;
  }
  function step(t) {
    var keep = [], i, j, k, w, o, p;
    for (i = 0; i < tweens.length; i++) {
      w = tweens[i];
      if (t < w.start) { keep.push(w); continue; }
      if (!w.from) {
        w.from = {};
        for (j = 0; j < tweens.length; j++) {
          o = tweens[j];
          if (o === w || o.obj !== w.obj || !o.from || o.done) continue;
          for (k in w.props) delete o.props[k];
        }
        for (k in w.props) w.from[k] = w.obj[k];
      }
      p = w.dur ? Math.min(1, (t - w.start) / w.dur) : 1;
      for (k in w.props) w.obj[k] = w.from[k] + (w.props[k] - w.from[k]) * w.ease(p);
      if (p < 1) keep.push(w); else w.done = true;
    }
    tweens = keep;
  }

  function look(x, y, speed) {
    speed = speed || 0.22; x = clamp(x, -46, 46); y = clamp(y, -30, 24);
    tw(EYE, { x: x, y: y, sx: 1 - Math.abs(x) / 46 * 0.1 }, speed, E.p3o);
    tw(CH, { r: x / 46 * 1.6 }, speed * 3, E.so);
  }
  function blink() { seq(EYE, [[{ lid: 1 }, 0.07, E.p2i], [{ lid: 0 }, 0.11, E.p2o]]); }
  function wave(reps) {
    var steps = [[{ r: -13 }, 0.22, E.so]], i;
    for (i = 0; i < reps; i++) steps.push([{ r: 5 }, 0.2, E.sio], [{ r: -11 }, 0.2, E.sio]);
    steps.push([{ r: 0 }, 0.35, E.so]);
    seq(ARM, steps);
  }
  function bounce(G, delay) {
    seq(G, [[{ y: -18, sx: 0.94, sy: 1.07 }, 0.16, E.p2o], [{ y: 0, sx: 1, sy: 1 }, 0.16, E.p2i], [{ sx: 1.08, sy: 0.9 }, 0.07, E.p2o], [{ sx: 1, sy: 1 }, 0.45, elastic(0.4)]], delay);
  }
  var busy = false;
  function hop() {
    if (busy) return; busy = true;
    var end = seq(CH, [[{ sx: 1.1, sy: 0.88 }, 0.12, E.p2o], [{ y: -36, sx: 0.9, sy: 1.12 }, 0.22, E.p2o], [{ y: 0, sx: 1, sy: 1 }, 0.2, E.p2i], [{ sx: 1.13, sy: 0.87 }, 0.08, E.p2o], [{ sx: 1, sy: 1 }, 0.6, elastic(0.35)]]);
    bounce(T, 0.56); bounce(V, 0.64);
    setTimeout(function () { busy = false; }, end * 1000);
  }
  function tvShimmy() {
    if (busy) return;
    look(44, 4, 0.3); bounce(T, 0.35); bounce(V, 0.45);
    setTimeout(function () { blink(); look(0, 0, 0.3); }, 1100);
  }
  function idleLook() {
    var roll = Math.random();
    if (roll < 0.22) look(0, 0);
    else if (roll < 0.38) look(R(32, 46), R(-6, 10));
    else look(R(-46, 46), R(-28, 20));
    setTimeout(idleLook, R(900, 2800));
  }
  function blinkLoop() {
    blink();
    if (Math.random() < 0.25) setTimeout(blink, 240);
    setTimeout(blinkLoop, R(2200, 5500));
  }
  function gestureLoop() {
    var r = Math.random();
    if (r < 0.45) wave(Math.random() < 0.5 ? 1 : 2);
    else if (r < 0.75) hop();
    else tvShimmy();
    setTimeout(gestureLoop, R(7000, 13000));
  }

  // Hold the mark still for a moment while the remote is in use, so navigation always has the frame.
  var lastKey = -1e9, lastFrame = 0, born = now();
  window.addEventListener('keydown', function () { lastKey = now(); }, true);
  var raf = window.requestAnimationFrame || function (fn) { return setTimeout(function () { fn(now()); }, 33); };
  function frame() {
    var t = now();
    if (!document.hidden && t - lastFrame >= 33 && t - lastKey > 450) {
      lastFrame = t;
      breath = (1 - Math.cos(2 * Math.PI * ((t - born) / 4600))) / 2;
      step(t); render();
    }
    raf(frame);
  }
  raf(frame);
  setTimeout(idleLook, 600);
  setTimeout(blinkLoop, 1400);
  setTimeout(gestureLoop, R(3000, 5000));
})();
