// Map tool: draws pins (x/y %) on a neutral grid, category filters, found state in localStorage ("wp-map-<id>").
// Loaded only on pages with [data-map-tool]. The list below the plot is the accessible version of every pin.
(function () {
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  $$("[data-map-tool]").forEach(function (root) {
    var D = JSON.parse(root.querySelector("[data-mt-data]").textContent), K = "wp-map-" + D.id, found = {};
    try { found = JSON.parse(localStorage.getItem(K)) || {}; } catch (e) {}
    var color = {}; D.categories.forEach(function (c) { color[c.id] = c.color; });
    var plot = root.querySelector("[data-mt-plot]"), count = root.querySelector("[data-mt-count]"), hideFound = root.querySelector("[data-mt-hidefound]");
    var dots = {};
    D.pins.forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "mt__pin"; b.title = p.title; b.tabIndex = -1;
      b.style.left = p.x + "%"; b.style.top = p.y + "%"; b.style.setProperty("--c", color[p.category] || "#fff");
      b.addEventListener("click", function () { var li = root.querySelector('[data-mt-pin="' + p.id + '"]'); li.scrollIntoView({ block: "nearest" }); li.classList.add("is-flash"); setTimeout(function () { li.classList.remove("is-flash"); }, 900); });
      plot.appendChild(b); dots[p.id] = b;
    });
    function save() { try { localStorage.setItem(K, JSON.stringify(found)); } catch (e) {} }
    function render() {
      var on = {}; $$("[data-mt-cat]", root).forEach(function (c) { on[c.getAttribute("data-mt-cat")] = c.checked; });
      var shown = 0, nFound = 0;
      $$("[data-mt-pin]", root).forEach(function (li) {
        var id = li.getAttribute("data-mt-pin"), f = !!found[id], vis = on[li.getAttribute("data-cat")] && !(hideFound.checked && f);
        li.hidden = !vis; dots[id].hidden = !vis; dots[id].classList.toggle("is-found", f);
        li.querySelector("[data-mt-found]").checked = f;
        if (vis) shown++; if (f) nFound++;
      });
      count.textContent = shown + " pins shown · " + nFound + " of " + D.pins.length + " found. Saved on this device.";
    }
    $$("[data-mt-found]", root).forEach(function (cb) {
      cb.disabled = false;
      cb.addEventListener("change", function () { var id = cb.closest("[data-mt-pin]").getAttribute("data-mt-pin"); if (cb.checked) found[id] = 1; else delete found[id]; save(); render(); });
    });
    $$("[data-mt-cat], [data-mt-hidefound]", root).forEach(function (c) { c.addEventListener("change", render); });
    render();
  });
})();
