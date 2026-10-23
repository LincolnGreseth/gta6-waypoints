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

  $$("[data-signup]").forEach(function (f) {
    f.addEventListener("submit", function () { track("signup", { interest: f.getAttribute("data-interest") }); });
  });
})();
