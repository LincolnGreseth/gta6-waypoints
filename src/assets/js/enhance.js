// GTA 6 Waypoints: sitewide enhancements (kept small: home budget is 2 KB).
// Menu (Esc, outside click, focus trap, scroll lock), share + calendar, signup region, analytics events.
(function () {
  var d = document, html = d.documentElement;
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var track = function (n, p) { if (window.gtag) window.gtag("event", n, p || {}); };

  // Menu
  var m = d.querySelector("[data-menu]");
  if (m) {
    var sm = m.querySelector("summary");
    var close = function () { if (m.open) { m.open = false; sm.focus(); } };
    m.addEventListener("toggle", function () {
      sm.setAttribute("aria-expanded", m.open);
      html.classList.toggle("menu-lock", m.open && innerWidth < 720);
    });
    d.addEventListener("keydown", function (e) {
      if (!m.open) return;
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      var f = [sm].concat($$("a", m)), i = f.indexOf(d.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    });
    d.addEventListener("click", function (e) { if (m.open && !m.contains(e.target)) close(); });
  }

  // Share (native sheet, or copy with a toast) + calendar tracking
  var copy = function (t, el) {
    var x = el.parentNode.querySelector("[data-toast]");
    if (navigator.clipboard && x) navigator.clipboard.writeText(t).then(function () {
      x.textContent = "Copied"; x.classList.add("is-on");
      setTimeout(function () { x.classList.remove("is-on"); x.textContent = ""; }, 1800);
    });
  };
  d.addEventListener("click", function (e) {
    var t = e.target, el;
    if (!t.closest) return;
    if ((el = t.closest("[data-share]"))) {
      var r = window.WP && window.WP.region(), at = r ? Date.parse(r.at) : new Date("2026-11-19T00:00:00").getTime();
      var n = Math.ceil((at - Date.now()) / 864e5), u = el.getAttribute("data-share-url");
      var txt = (n > 0 ? "GTA 6 unlocks in " + n + " day" + (n > 1 ? "s" : "") : "GTA 6 is out") + ". Check your region's unlock time:";
      if (navigator.share) navigator.share({ text: txt, url: u }).catch(function () {});
      else copy(txt + " " + u, el);
      track("share");
    }
    if ((el = t.closest("[data-cal]"))) track("add_to_calendar", { method: el.getAttribute("data-cal") });
  });

  // Signup: region follows the picker until the visitor changes it; track submits
  var sr = $$("[data-signup-region]");
  var fill = function (r) { sr.forEach(function (s) { s._t || (s.value = r ? r.id : "local"); }); };
  sr.forEach(function (s) { s.addEventListener("change", function () { s._t = 1; }); });
  d.addEventListener("wp:region", function (e) { fill(e.detail); });
  if (window.WP) fill(window.WP.region());
  $$("[data-signup]").forEach(function (f) { f.addEventListener("submit", function () { track("signup", { interest: f.getAttribute("data-interest") }); }); });
})();
