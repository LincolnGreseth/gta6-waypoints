// GTA 6 Waypoints: countdown, YouTube facade, analytics events. Vanilla, deferred.
(function () {
  var d = document;
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
  var track = function (name, params) { if (window.gtag) window.gtag("event", name, params || {}); };

  // Countdown (config in site.json → countdown). Date strings without an offset are local time.
  var today = new Date();
  var ymd = today.getFullYear() + "-" + pad(today.getMonth() + 1) + "-" + pad(today.getDate());
  $$("[data-countdown]").forEach(function (el) {
    var target = new Date(el.getAttribute("data-target")).getTime();
    var clock = el.querySelector("[data-cd-clock]");
    var sum = el.querySelector("[data-cd-summary]");
    var cells = {};
    $$("[data-cd]", el).forEach(function (b) { cells[b.getAttribute("data-cd")] = b; });
    var lastMin = -1, timer;
    $$("[data-date]", el).forEach(function (li) {
      var day = li.getAttribute("data-date");
      if (day < ymd) li.classList.add("is-past");
      else if (day === ymd) li.classList.add("is-today");
    });
    function tick() {
      var left = Math.max(0, Math.floor((target - Date.now()) / 1000));
      if (!left || isNaN(target)) {
        clearInterval(timer);
        if (isNaN(target)) return;
        clock.hidden = true;
        el.querySelector("[data-cd-heading]").textContent = el.getAttribute("data-live-heading") || "GTA 6 is out";
        el.querySelector("[data-cd-live]").hidden = false;
        el.querySelector("[data-cd-date]").hidden = true;
        sum.textContent = "";
        return;
      }
      var dd = Math.floor(left / 86400), h = Math.floor(left / 3600) % 24, m = Math.floor(left / 60) % 60, s = left % 60;
      cells.d.textContent = dd;
      cells.h.textContent = pad(h);
      cells.m.textContent = pad(m);
      cells.s.textContent = pad(s);
      var mins = Math.floor(left / 60);
      if (mins !== lastMin) {
        lastMin = mins;
        sum.textContent = dd + " days, " + h + " hours and " + m + " minutes to go.";
      }
    }
    tick();
    clock.classList.add("is-on");
    timer = setInterval(tick, 1000);
  });

  // YouTube click-to-load facade (youtube-nocookie.com, nothing loads until clicked).
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-yt]");
    if (a) {
      e.preventDefault();
      var f = d.createElement("iframe");
      f.className = "yt-frame";
      f.src = "https://www.youtube-nocookie.com/embed/" + a.getAttribute("data-yt") + "?autoplay=1&rel=0";
      f.title = a.getAttribute("data-title") || "YouTube video";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true;
      a.replaceWith(f);
      var w = d.createElement("div");
      w.className = "yt";
      f.replaceWith(w);
      w.appendChild(f);
      return;
    }
    var aff = e.target.closest && e.target.closest("[data-aff]");
    if (aff) track("affiliate_click", { link_id: aff.getAttribute("data-aff") });
    var tool = e.target.closest && e.target.closest("[data-tool]");
    if (tool) track("tool_open", { tool: tool.getAttribute("data-tool") });
  });

  $$("[data-signup]").forEach(function (f) {
    f.addEventListener("submit", function () { track("signup", { interest: f.getAttribute("data-interest") }); });
  });
})();
