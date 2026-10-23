/* Somi TV intro: plays once per launch over Home, then removes itself.
   ES5, no libraries. Any remote key or click skips it. Only SVG transforms and opacity change. */
(function () {
  var stage = document.getElementById('stage');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!stage || reduce || navigator.webdriver || document.hidden) return;

  var SVG = '<svg class="intro-mark" viewBox="-40 265 700 380" aria-hidden="true"><defs><path id="introBody" fill-rule="evenodd" d="M797.6 1602.9C803.6 1602.3 813.5 1600.5 819.6 1599.0C849.5 1591.3 865.5 1581.1 895.5 1550.9C915.4 1530.8 919.5 1527.6 928.2 1524.8C944.2 1519.9 954.4 1523.6 984.7 1545.3C999.6 1555.9 1006.8 1559.9 1018.4 1563.9C1031.1 1568.4 1043.3 1570.3 1058.5 1570.3C1086.4 1570.2 1107.8 1560.4 1143.3 1531.5C1159.8 1518.0 1167.1 1516.0 1199.6 1516.3C1227.8 1516.5 1235.8 1514.7 1250.5 1505.3C1263.7 1496.7 1276.4 1481.8 1286.6 1462.5C1296.7 1443.6 1318.2 1375.6 1328.0 1332.0C1330.3 1321.8 1333.2 1309.2 1334.5 1304.0C1340.2 1281.5 1345.7 1250.7 1349.6 1220.0C1351.7 1203.1 1352.6 1153.9 1351.0 1136.7C1348.9 1113.1 1343.5 1080.2 1338.9 1062.5C1335.7 1050.4 1325.1 1017.6 1320.3 1005.0C1312.2 983.9 1286.4 928.0 1276.4 910.0C1257.4 875.9 1230.4 836.5 1205.4 806.5C1184.2 781.1 1172.1 768.8 1136.5 736.5C1097.4 701.1 1087.6 689.7 1080.9 672.5C1077.0 662.6 1074.0 646.8 1074.0 636.6C1074.0 618.9 1080.4 585.9 1090.0 554.5C1092.7 545.7 1096.7 531.3 1099.0 522.5C1101.2 513.7 1105.1 500.1 1107.5 492.2C1115.4 467.0 1125.5 413.7 1128.9 380.1C1132.7 343.2 1126.2 296.3 1113.1 265.9C1108.7 255.7 1095.0 234.8 1086.3 224.8C1067.3 203.1 1037.1 185.7 1007.5 179.5C996.6 177.2 969.8 177.1 957.4 179.3C905.0 188.7 860.5 228.3 839.7 284.1C827.4 317.0 819.5 362.0 815.5 422.5C811.9 476.4 807.2 495.5 799.7 487.2C794.1 481.1 785.7 450.2 781.1 418.9C770.2 345.9 768.4 335.9 760.4 307.3C746.2 256.0 731.6 226.6 704.6 195.3C680.6 167.5 644.6 146.7 610.8 141.3C595.5 138.9 568.8 139.1 554.0 141.8C492.8 153.0 446.2 200.0 433.5 263.4C429.5 283.5 428.7 294.5 429.3 318.0C430.1 347.6 432.8 364.3 441.5 395.6C448.7 421.1 452.5 432.3 473.0 487.0C495.4 546.8 500.3 561.1 505.6 582.0C516.2 623.0 510.8 656.4 488.9 687.5C480.7 699.1 457.1 722.8 431.0 745.7C410.0 764.1 392.7 781.3 364.1 812.3C334.0 844.8 317.0 852.2 303.8 838.4C294.2 828.3 292.0 809.5 295.6 767.3C301.1 702.6 286.8 666.2 248.5 647.5C235.6 641.2 226.7 638.9 212.4 638.3C160.1 635.9 110.2 670.7 82.1 729.0C72.9 748.2 69.6 758.1 65.4 778.5C54.2 833.8 60.9 885.5 86.0 936.5C105.1 975.6 130.8 1005.0 175.5 1038.8C201.8 1058.7 213.6 1068.7 218.5 1075.2C224.1 1082.6 231.2 1097.0 233.4 1105.5C236.2 1116.1 237.5 1142.2 236.1 1158.8C232.0 1208.9 235.6 1264.9 246.0 1310.4C261.1 1376.4 269.4 1404.9 285.0 1444.0C304.2 1492.2 326.4 1515.4 361.0 1523.5C368.8 1525.3 378.3 1525.4 403.3 1523.9C420.4 1522.9 422.8 1522.9 428.7 1524.5C437.4 1526.9 449.8 1535.2 463.1 1547.6C496.5 1579.0 533.1 1591.2 569.5 1583.3C581.8 1580.6 599.0 1572.9 613.7 1563.4C644.5 1543.5 655.6 1545.0 696.8 1574.5C720.0 1591.2 744.1 1600.3 771.5 1602.9C784.5 1604.1 785.6 1604.1 797.6 1602.9ZM868.0 1103.7C858.2 1100.4 852.3 1096.5 844.0 1088.0C815.6 1059.0 807.6 1005.1 825.4 963.8C830.9 951.0 834.9 945.1 844.5 935.5C857.5 922.5 867.4 918.0 883.2 918.0C912.4 918.0 936.4 942.0 946.7 981.6C949.3 991.7 949.5 993.9 949.5 1011.5C949.5 1032.8 947.5 1043.6 940.5 1060.1C925.9 1094.8 895.5 1113.1 868.0 1103.7ZM1127.1 1077.5C1080.0 1067.2 1044.1 994.6 1060.2 942.0C1073.9 897.3 1116.5 888.6 1151.6 923.4C1196.7 968.3 1199.7 1053.5 1156.8 1073.8C1146.3 1078.8 1138.0 1079.8 1127.1 1077.5Z"/><clipPath id="introArmClip"><path d="M-10 560 L335 560 L348 840 L276 1100 L-10 1100 Z"/></clipPath><clipPath id="introJointClip"><circle cx="275" cy="950" r="150"/></clipPath><clipPath id="introBodyClip"><path clip-rule="evenodd" d="M-100 -100H1800V1800H-100Z M-10 560 L335 560 L322 840 L238 1088 L-10 1088 Z"/></clipPath></defs><g id="introChar" opacity="0"><g transform="matrix(0.189624 0 0 0.189624 -7.036476 293.074775)"><use href="#introBody" xlink:href="#introBody" clip-path="url(#introBodyClip)"/><use href="#introBody" xlink:href="#introBody" clip-path="url(#introJointClip)"/><g id="introArm"><use href="#introBody" xlink:href="#introBody" clip-path="url(#introArmClip)"/></g><ellipse id="introLidL" cx="882.5" cy="1011.5" rx="74" ry="100" transform="scale(1 0)"/><ellipse id="introLidR" cx="1121.5" cy="990" rx="73" ry="96" transform="scale(1 0)"/></g></g><g transform="translate(236 117)"><g id="introT" opacity="0"><path transform="translate(1.409393 484.597671)" d="M 113.4375 -181.0625 L 154.886719 -179.753906 L 164.484375 -225.128906 L 122.597656 -223.820312 L 126.960938 -244.761719 L 137.433594 -294.5 L 75.914062 -294.5 L 65.445312 -244.328125 L 61.082031 -223.820312 L 30.539062 -225.128906 L 20.941406 -179.753906 L 51.917969 -181.0625 L 47.992188 -163.175781 L 26.613281 -63.261719 C 25.304688 -57.15625 24.433594 -51.046875 24.433594 -45.375 C 24.433594 -17.015625 42.757812 0 80.714844 0 L 116.492188 0 L 126.960938 -49.300781 L 106.457031 -49.300781 C 94.238281 -49.300781 89.003906 -53.226562 89.003906 -62.828125 C 89.003906 -65.007812 89.441406 -68.0625 90.75 -74.605469 L 109.511719 -161.867188 Z M 113.4375 -181.0625"/></g><g id="introV" opacity="0"><path transform="translate(144.077882 484.597671)" d="M 137.871094 -157.503906 L 96.859375 -59.773438 L 93.804688 -157.503906 L 88.566406 -225.128906 L 26.179688 -225.128906 L 52.355469 0 L 115.183594 0 L 237.34375 -225.128906 L 173.210938 -225.128906 Z M 137.871094 -157.503906"/></g></g></svg>';
  var root = document.createElement('div');
  root.className = 'intro';
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = SVG;
  stage.appendChild(root);

  function $(id) { return document.getElementById(id); }
  function mk(ox, oy) { return { x: 0, y: 0, r: 0, sx: 1, sy: 1, o: 0, ox: ox, oy: oy }; }
  var CH = mk(127, 597), ARM = mk(275, 960), LL = mk(882.5, 911.5), LR = mk(1121.5, 894), T = mk(94, 484.6), V = mk(276, 484.6), M = { o: 1 };
  LL.sy = 0; LR.sy = 0;
  T.y = -240; T.r = -14; V.y = -240; V.r = 12;
  var el = { ch: $('introChar'), arm: $('introArm'), ll: $('introLidL'), lr: $('introLidR'), t: $('introT'), v: $('introV') };
  function tf(o) { return 'translate(' + o.x + ' ' + o.y + ') translate(' + o.ox + ' ' + o.oy + ') rotate(' + o.r + ') scale(' + o.sx + ' ' + o.sy + ') translate(' + (-o.ox) + ' ' + (-o.oy) + ')'; }
  function render() {
    el.ch.setAttribute('transform', tf(CH)); el.ch.setAttribute('opacity', CH.o);
    el.arm.setAttribute('transform', tf(ARM));
    el.ll.setAttribute('transform', tf(LL)); el.lr.setAttribute('transform', tf(LR));
    el.t.setAttribute('transform', tf(T)); el.t.setAttribute('opacity', T.o);
    el.v.setAttribute('transform', tf(V)); el.v.setAttribute('opacity', V.o);
    root.style.opacity = M.o;
  }

  // Easings matching the original GSAP timeline (powerN = polynomial of degree N + 1).
  function pin(n) { return function (t) { return Math.pow(t, n); }; }
  function pout(n) { return function (t) { return 1 - Math.pow(1 - t, n); }; }
  var E = {
    p1o: pout(2), p2i: pin(3), p2o: pout(3), p3i: pin(4), p3o: pout(4),
    so: function (t) { return Math.sin(t * Math.PI / 2); },
    sio: function (t) { return -(Math.cos(Math.PI * t) - 1) / 2; },
    el: function (t) { var p = 0.35; return t === 0 || t === 1 ? t : Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1; }
  };

  var tweens = [];
  function to(obj, props, at, dur, ease, yoyo) { tweens.push({ obj: obj, props: props, at: at, dur: dur, ease: ease, yoyo: !!yoyo, from: null }); }
  function set(obj, props, at) { tweens.push({ obj: obj, props: props, at: at, dur: 0, ease: E.p1o, yoyo: false, from: null }); }

  set(CH, { o: 1, sx: 0.08, sy: 0.08, y: 30 }, 0.3);
  to(CH, { sx: 0.82, sy: 1.24, y: -40 }, 0.3, 0.24, E.p3o);
  to(CH, { sx: 1.14, sy: 0.84, y: 0 }, 0.54, 0.17, E.p2i);
  to(CH, { sx: 1, sy: 1 }, 0.71, 0.75, E.el);
  to(T, { o: 1 }, 0.6, 0.08, E.p1o);
  to(T, { y: 0, r: 0 }, 0.6, 0.42, E.p3i);
  to(T, { sx: 1.1, sy: 0.86 }, 1.02, 0.1, E.p2o, true);
  to(V, { o: 1 }, 0.74, 0.08, E.p1o);
  to(V, { y: 0, r: 0 }, 0.74, 0.42, E.p3i);
  to(V, { sx: 1.1, sy: 0.86 }, 1.16, 0.1, E.p2o, true);
  to(CH, { y: -12 }, 1.08, 0.12, E.p1o, true);
  // Hello wave.
  to(ARM, { r: -13 }, 1.4, 0.22, E.so);
  to(ARM, { r: 5 }, 1.62, 0.2, E.sio);
  to(ARM, { r: -11 }, 1.82, 0.2, E.sio);
  to(ARM, { r: 4 }, 2.02, 0.2, E.sio);
  to(ARM, { r: 0 }, 2.22, 0.35, E.so);
  to(CH, { r: -2.5 }, 1.4, 0.4, E.sio, true);
  [2.15, 3.3, 3.52].forEach(function (at) { to(LL, { sy: 1 }, at, 0.07, E.p2i, true); to(LR, { sy: 1 }, at, 0.07, E.p2i, true); });
  var FADE = 3.95, END = FADE + 0.6;
  to(M, { o: 0 }, FADE, 0.6, E.p2i);

  function apply(t) {
    for (var i = 0; i < tweens.length; i++) {
      var w = tweens[i], k;
      if (t < w.at) continue;
      if (!w.from) { w.from = {}; for (k in w.props) w.from[k] = w.obj[k]; }
      var span = w.dur * (w.yoyo ? 2 : 1), u = w.dur ? Math.min(1, (t - w.at) / span) : 1, p;
      if (w.yoyo) p = u < 0.5 ? w.ease(u * 2) : w.ease(2 - u * 2);
      else p = w.ease(u);
      for (k in w.props) w.obj[k] = w.from[k] + (w.props[k] - w.from[k]) * p;
    }
  }

  var start = 0, frame = 0, done = false;
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(function () { f(Date.now()); }, 16); };
  var caf = window.cancelAnimationFrame || clearTimeout;
  function finish() {
    if (!root.parentNode) return;
    done = true; caf(frame);
    window.removeEventListener('keydown', skip, true);
    root.removeEventListener('click', skip);
    if (root.parentNode) root.parentNode.removeChild(root);
  }
  function tick(now) {
    if (!start) start = now;
    var t = (now - start) / 1000;
    apply(t); render();
    if (t >= END) finish(); else frame = raf(tick);
  }
  // A skipped intro fades quickly; the key that skips it is not passed to Home.
  function skip(ev) {
    if (ev) { if (ev.stopImmediatePropagation) ev.stopImmediatePropagation(); if (ev.preventDefault) ev.preventDefault(); }
    if (done) return;
    done = true; caf(frame);
    root.style.transition = 'opacity 220ms linear';
    root.style.opacity = '0';
    setTimeout(finish, 240);
  }
  window.addEventListener('keydown', skip, true);
  root.addEventListener('click', skip);
  render();
  frame = raf(tick);
})();
