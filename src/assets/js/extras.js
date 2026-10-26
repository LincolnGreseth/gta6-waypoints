// GTA 6 Waypoints: page-specific extras, loaded only where used (see base.njk):
// YouTube facade, unlock-region table and list, launch checklist, embed promo.
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
  });

  // Unlock regions: "Your time" column, tap-to-set rows, and highlighting the viewer's region.
  $$("[data-region-row]").forEach(function (tr) {
    var c = tr.querySelector("[data-yourtime]");
    if (c && window.WP) c.textContent = window.WP.fmt(Date.parse(tr.getAttribute("data-at")));
  });
  d.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-set-region]");
    if (b && window.WP) window.WP.set(b.getAttribute("data-set-region"));
  });
  var mark = function (r) {
    var id = r ? r.id : "";
    $$("[data-region-row]").forEach(function (tr) { tr.classList.toggle("is-mine", tr.getAttribute("data-region-row") === id); });
    $$(".wave [data-wave-id]").forEach(function (li) { li.classList.toggle("is-mine", li.getAttribute("data-wave-id") === id); });
  };
  d.addEventListener("wp:region", function (e) { mark(e.detail); });
  if (window.WP) mark(window.WP.region());

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

  // Embed promo: options update the preview, embed code and OBS URL.
  $$("[data-embed-promo]").forEach(function (w) {
    var base = w.getAttribute("data-base"), v = function (k) { return w.querySelector('[data-ep="' + k + '"]').value; };
    var rs = w.querySelector('[data-ep="region"]');
    if (window.WP && window.WP.region()) rs.value = window.WP.region().id;
    var upd = function () {
      var q = [], r = v("region"), t = v("theme"), z = v("size");
      if (r) q.push("region=" + r);
      if (t !== "dark") q.push("theme=" + t);
      if (z !== "wide") q.push("size=" + z);
      var qs = q.length ? "?" + q.join("&") : "", hgt = z === "compact" ? 170 : 220;
      w.querySelector("[data-ep-code]").value = '<iframe src="' + base + "/embed/countdown/" + qs + '" title="GTA 6 countdown" width="560" height="' + hgt + '" loading="lazy" style="border:0;max-width:100%"></iframe>\n<p style="font-size:12px"><a href="' + base + '/release-date-times/">GTA 6 unlock times</a> by GTA 6 Waypoints</p>';
      w.querySelector("[data-ep-obs]").value = base + "/embed/obs/" + (r ? "?region=" + r : "");
      var pv = w.querySelector("[data-ep-preview]"); pv.src = "/embed/countdown/" + qs; pv.height = hgt;
    };
    $$("select", w).forEach(function (s) { s.addEventListener("change", upd); });
    upd();
  });

  // Copy buttons (embed code, OBS URL), affiliate + tool tracking
  d.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target : null, el;
    if (!t) return;
    if ((el = t.closest("[data-copy-from]")) && navigator.clipboard) navigator.clipboard.writeText(d.getElementById(el.getAttribute("data-copy-from")).value).then(function () { var w = el.textContent; el.textContent = "Copied"; setTimeout(function () { el.textContent = w; }, 1600); });
    if ((el = t.closest("[data-aff]"))) track("affiliate_click", { link_id: el.getAttribute("data-aff") });
    if ((el = t.closest("[data-tool]"))) track("tool_open", { tool: el.getAttribute("data-tool") });
  });
})();
