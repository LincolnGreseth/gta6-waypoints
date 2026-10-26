// GTA 6 Waypoints: store-region unlock state, live countdown tiles and the midnight wave. Vanilla, deferred.
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
  var hm = function (t) { return new Date(t).toLocaleString(void 0, { weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }); };
  var target = function (el) { return cur ? Date.parse(cur.at) : new Date(el.getAttribute("data-target")).getTime(); };
  var cds = $$("[data-countdown]");
  cds.forEach(function (el) { var h = el.querySelector("[data-cd-heading]"); if (h) el._h = h.innerHTML; });

  function tick(el) {
    var c = el._c || (el._c = {}), left = Math.max(0, Math.floor((target(el) - Date.now()) / 1000));
    if (!c.d) $$("[data-cd]", el).forEach(function (b) { c[b.getAttribute("data-cd")] = b; });
    var live = !left, q = function (s) { return el.querySelector(s); }, h = q("[data-cd-heading]");
    q("[data-cd-clock]").hidden = live;
    q("[data-cd-live]").hidden = !live;
    if (live !== el._live) { el._live = live; h.innerHTML = live ? el.getAttribute("data-live-heading") : el._h; name(); }
    if (live) return;
    var dd = Math.floor(left / 86400), hh = Math.floor(left / 3600) % 24, m = Math.floor(left / 60) % 60;
    c.d.textContent = pad(dd); c.h.textContent = pad(hh); c.m.textContent = pad(m); c.s.textContent = pad(left % 60);
    var mins = Math.floor(left / 60), sum = q("[data-cd-summary]");
    if (sum && mins !== el._m) { el._m = mins; sum.textContent = dd + " days, " + hh + " hours and " + m + " minutes to go."; }
  }
  function name() { $$("[data-cd-region]").forEach(function (b) { b.textContent = cur ? cur.name : "your time zone"; }); }

  // The midnight wave: viewer's node + label, and every time shown in the viewer's time zone.
  function wave() {
    $$("[data-wv]").forEach(function (w) {
      var tz = ""; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
      $$("[data-wv-tz]", w).forEach(function (s) { s.textContent = tz || "local time"; });
      $$("[data-wv-time]", w).forEach(function (t) { t.textContent = hm(Date.parse(t.getAttribute("data-wv-time"))); });
      var lbl = w.querySelector("[data-wv-mine]"), n = null;
      $$("[data-wave-id]", w).forEach(function (el) { var on = !!cur && el.getAttribute("data-wave-id") === cur.id; el.classList.toggle("is-mine", on); if (on) n = el; });
      if (!lbl) return;
      var edge = n && (n.classList.contains("is-first") || n.classList.contains("is-last"));
      $$(".wv__lbl--first, .wv__lbl--last", w).forEach(function (l) { l.classList.toggle("is-you", !!edge && l.classList.contains(n.classList.contains("is-first") ? "wv__lbl--first" : "wv__lbl--last")); });
      lbl.hidden = !n || edge;
      if (!n || edge) return;
      var x = parseFloat(n.style.left);
      lbl.style.left = n.style.left; lbl.style.top = n.style.top;
      lbl.classList.toggle("is-below", x > 70); lbl.classList.toggle("is-edge-r", x > 85); lbl.classList.toggle("is-edge-l", x < 15);
      lbl.querySelector("b").textContent = cur.name;
      lbl.querySelector("time").textContent = hm(Date.parse(cur.at));
    });
  }

  function sync() {
    $$("[data-region-select]").forEach(function (s) { s.value = cur ? cur.id : "local"; });
    $$("[data-cd-unlock]").forEach(function (s) {
      var el = s.closest("[data-countdown]") || cds[0];
      if (el) s.textContent = "Unlocks " + fmt(target(el)) + " your time · " + (cur ? cur.name + " store" : "Midnight in your time zone");
    });
    name(); wave();
    cds.forEach(function (el) { tick(el); el.classList.add("is-ready"); });
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
  setInterval(function () { cds.forEach(tick); }, 1000);
})();
