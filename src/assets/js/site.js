// GTA 6 Waypoints: store-region unlock state + live countdown. Vanilla, deferred.
// Regions come from site.json → unlock (inlined as #wp-unlock). Other scripts listen for "wp:region".
(function () {
  var d = document;
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
  var U = {};
  try { U = JSON.parse(d.getElementById("wp-unlock").textContent); } catch (e) {}
  var R = U.regions || [], K = "wp-region", cur = null, saved = null;
  var find = function (id) { for (var i = 0; i < R.length; i++) if (R[i].id === id) return R[i]; };
  var off = function (at) { var m = /([+-])(\d\d):(\d\d)$/.exec(at); return m ? (m[1] === "-" ? -1 : 1) * (m[2] * 60 + +m[3]) : null; };

  // Saved choice wins; otherwise match the viewer's UTC offset on launch day; otherwise local midnight.
  try { saved = localStorage.getItem(K); } catch (e) {}
  if (saved && saved !== "local") cur = find(saved) || null;
  if (!saved) {
    var mine = -new Date("2026-11-19T12:00:00Z").getTimezoneOffset();
    for (var i = 0; i < R.length; i++) if (off(R[i].at) === mine) { cur = R[i]; break; }
  }

  var fmt = function (t) { return new Date(t).toLocaleString(void 0, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }); };
  var target = function (el) { return cur ? Date.parse(cur.at) : new Date(el.getAttribute("data-target")).getTime(); };
  var cds = $$("[data-countdown]");

  function tick(el) {
    var c = el._c || (el._c = {}), left = Math.max(0, Math.floor((target(el) - Date.now()) / 1000));
    if (!c.d) $$("[data-cd]", el).forEach(function (b) { c[b.getAttribute("data-cd")] = b; });
    var live = !left, q = function (s) { return el.querySelector(s); };
    q("[data-cd-clock]").hidden = live;
    q("[data-cd-live]").hidden = !live;
    q("[data-cd-heading]").textContent = live ? el.getAttribute("data-live-heading") : el.getAttribute("data-heading");
    if (live) return;
    var dd = Math.floor(left / 86400), h = Math.floor(left / 3600) % 24, m = Math.floor(left / 60) % 60;
    c.d.textContent = dd; c.h.textContent = pad(h); c.m.textContent = pad(m); c.s.textContent = pad(left % 60);
    var mins = Math.floor(left / 60), sum = q("[data-cd-summary]");
    if (sum && mins !== el._m) { el._m = mins; sum.textContent = dd + " days, " + h + " hours and " + m + " minutes to go."; }
  }

  function sync() {
    $$("[data-region-select]").forEach(function (s) { s.value = cur ? cur.id : "local"; });
    $$("[data-cd-unlock]").forEach(function (s) {
      var el = s.closest("[data-countdown]") || cds[0];
      if (el) s.textContent = "Unlocks " + fmt(target(el)) + " your time · " + (cur ? cur.name + " store" : "Midnight in your time zone");
    });
    cds.forEach(tick);
    d.dispatchEvent(new CustomEvent("wp:region", { detail: cur }));
  }

  window.WP = {
    regions: R,
    region: function () { return cur; },
    set: function (id) { cur = find(id) || null; try { localStorage.setItem(K, cur ? cur.id : "local"); } catch (e) {} sync(); },
    fmt: fmt,
  };
  $$("[data-region-select]").forEach(function (s) { s.addEventListener("change", function () { window.WP.set(s.value); }); });
  sync();
  cds.forEach(function (el) { el.querySelector("[data-cd-clock]").classList.add("is-on"); });
  setInterval(function () { cds.forEach(tick); }, 1000);
})();
