// GTA 6 Waypoints: live countdown. Vanilla, deferred. YouTube facade + analytics events live in enhance.js.
(function () {
  var d = document;
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var pad = function (n) { return n < 10 ? "0" + n : "" + n; };

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
        var note = el.querySelector("[data-cd-note]");
        if (note) note.hidden = true;
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

})();
