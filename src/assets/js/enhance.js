// GTA 6 Waypoints: YouTube click-to-load facade and analytics events (signup, affiliate_click, tool_open).
(function () {
  var d = document;
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var track = function (name, params) { if (window.gtag) window.gtag("event", name, params || {}); };

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

  // Unlock-time picker: preselect the viewer's region, show its time and the viewer's own clock time.
  var sel = d.querySelector("[data-unlock-select]");
  if (sel) {
    var out = d.querySelector("[data-unlock-result]");
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
    var opts = $$("option", sel), pick = null;
    opts.forEach(function (o) { if (o.getAttribute("data-tz") === tz) pick = o; });
    if (!pick) {
      var mine = -new Date(Date.UTC(2026, 10, 19, 5)).getTimezoneOffset();
      opts.forEach(function (o) {
        var f = new Intl.DateTimeFormat("en-US", { timeZone: o.getAttribute("data-tz"), timeZoneName: "longOffset" }).format(new Date(Date.UTC(2026, 10, 19, 5)));
        var m = f.match(/GMT([+-])(\d\d):?(\d\d)?/), off = m ? (m[1] === "-" ? -1 : 1) * (+m[2] * 60 + +(m[3] || 0)) : 0;
        if (!pick && off === mine) pick = o;
      });
    }
    if (pick) sel.value = pick.value;
    var show = function () {
      var o = sel.options[sel.selectedIndex], t = new Date(o.getAttribute("data-utc"));
      var yours = t.toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
      out.innerHTML = "Assumed unlock: <strong>" + o.getAttribute("data-local") + "</strong><br>Where you are: " + yours;
      $$(".wave li").forEach(function (li, i) { li.classList.toggle("is-mine", li.querySelector(".wave__name").textContent === o.textContent); });
    };
    sel.addEventListener("change", show);
    show();
    $$("[data-unlock-region]").forEach(function (r) { if (!r.value && pick) r.value = pick.value; });
  }

  // Share: native share sheet where supported, links otherwise.
  if (navigator.share) { d.documentElement.classList.add("has-share"); $$("[data-share]").forEach(function (b) { b.hidden = false; }); }
  var copy = function (text, btn) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(function () {
      var was = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = was; }, 1600);
    });
  };
  d.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : null;
    if (!t) return;
    var sh = t.closest("[data-share]");
    if (sh) { navigator.share({ title: d.title, text: sh.getAttribute("data-share-text"), url: sh.getAttribute("data-share-url") }).catch(function () {}); track("share", { method: "native" }); }
    var net = t.closest("[data-share-net]");
    if (net) track("share", { method: net.getAttribute("data-share-net") });
    var cp = t.closest("[data-copy]");
    if (cp) { copy(cp.getAttribute("data-copy"), cp); track("share", { method: "copy" }); }
    var cf = t.closest("[data-copy-from]");
    if (cf) copy(d.getElementById(cf.getAttribute("data-copy-from")).value, cf);
    var cal = t.closest("[data-cal]");
    if (cal) track("add_to_calendar", { method: cal.getAttribute("data-cal") });
  });

  // Checklist: ticks saved on this device.
  $$("[data-checklist]").forEach(function (list) {
    var key = "wp-" + list.getAttribute("data-checklist"), saved = {}, opened = false;
    var prog = d.querySelector("[data-checklist-progress]");
    try { saved = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) {}
    var boxes = $$("input[type=checkbox]", list);
    var render = function () {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      if (prog) prog.textContent = n === boxes.length ? "All " + n + " done. You're ready." : n + " of " + boxes.length + " done";
    };
    boxes.forEach(function (b) {
      b.checked = !!saved[b.getAttribute("data-id")];
      b.addEventListener("change", function () {
        saved[b.getAttribute("data-id")] = b.checked;
        try { localStorage.setItem(key, JSON.stringify(saved)); } catch (e) {}
        if (!opened) { opened = true; track("tool_open", { tool: "launch-checklist" }); }
        render();
      });
    });
    render();
  });

  // Widget page: options update the embed code, OBS link and preview.
  var w = d.querySelector("[data-widget]");
  if (w) {
    var base = w.getAttribute("data-base");
    var upd = function () {
      var size = (w.querySelector("[name=w-size]:checked") || {}).value, bg = (w.querySelector("[name=w-bg]:checked") || {}).value;
      var q = [];
      if (size && size !== "md") q.push("size=" + size);
      if (bg === "transparent") q.push("bg=transparent");
      var qs = q.length ? "?" + q.join("&") : "", h = size === "sm" ? 170 : size === "lg" ? 320 : 230;
      w.querySelector("[data-widget-code]").value = '<iframe src="' + base + qs + '" title="GTA 6 countdown" width="100%" height="' + h + '" style="border:0;max-width:640px" loading="lazy"></iframe>\n<p style="font-size:12px"><a href="' + base.replace("embed/countdown/", "") + '">GTA 6 countdown</a> by GTA 6 Waypoints</p>';
      var pv = w.querySelector("[data-widget-preview]");
      pv.src = "/embed/countdown/" + qs; pv.height = h;
    };
    $$("input[type=radio]", w).forEach(function (r) { r.addEventListener("change", upd); });
  }

  $$("[data-signup]").forEach(function (f) {
    f.addEventListener("submit", function () { track("signup", { interest: f.getAttribute("data-interest") }); });
  });
})();
