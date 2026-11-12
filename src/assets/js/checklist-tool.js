// Checklist tool: ticks in localStorage ("wp-cl-<id>"), progress count, per-category counts and collapse state,
// export/import as JSON. Loaded only on pages with [data-cl-tool].
(function () {
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  $$("[data-cl-tool]").forEach(function (root) {
    var id = root.getAttribute("data-cl-tool"), K = "wp-cl-" + id, st = {};
    try { st = JSON.parse(localStorage.getItem(K)) || {}; } catch (e) {}
    st.items = st.items || {}; st.closed = st.closed || {};
    var boxes = $$("[data-cl-item]", root), cats = $$("[data-cl-cat]", root);
    function save() { try { localStorage.setItem(K, JSON.stringify(st)); } catch (e) {} }
    function render() {
      var done = 0;
      boxes.forEach(function (b) { b.checked = !!st.items[b.getAttribute("data-cl-item")]; if (b.checked) done++; });
      cats.forEach(function (c) {
        var bs = $$("[data-cl-item]", c), n = bs.filter(function (b) { return b.checked; }).length;
        c.querySelector("[data-cl-count]").textContent = n + " / " + bs.length;
        c.classList.toggle("is-done", n === bs.length);
      });
      root.querySelector("[data-cl-progress]").textContent = done + " of " + boxes.length + " done (" + Math.round((done / (boxes.length || 1)) * 100) + "%). Saved on this device.";
    }
    boxes.forEach(function (b) {
      b.disabled = false;
      b.addEventListener("change", function () { var k = b.getAttribute("data-cl-item"); if (b.checked) st.items[k] = 1; else delete st.items[k]; save(); render(); });
    });
    cats.forEach(function (c) {
      var k = c.getAttribute("data-cl-cat");
      if (st.closed[k]) c.open = false;
      c.addEventListener("toggle", function () { if (c.open) delete st.closed[k]; else st.closed[k] = 1; save(); });
    });
    var ex = root.querySelector("[data-cl-export]"), im = root.querySelector("[data-cl-import]"), rs = root.querySelector("[data-cl-reset]");
    if (ex) ex.addEventListener("click", function () {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify({ checklist: id, exported: new Date().toISOString(), items: Object.keys(st.items) }, null, 2)], { type: "application/json" }));
      a.download = "gta6-waypoints-" + id + ".json"; a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    if (im) im.addEventListener("change", function () {
      var f = im.files && im.files[0]; if (!f) return;
      f.text().then(function (t) {
        var d = JSON.parse(t); if (d.checklist !== id || !Array.isArray(d.items)) throw new Error("wrong file");
        st.items = {}; d.items.forEach(function (k) { st.items[k] = 1; }); save(); render();
      }).catch(function () { alert("That file isn't a progress export for this checklist."); });
      im.value = "";
    });
    if (rs) rs.addEventListener("click", function () { if (confirm("Clear every tick on this checklist?")) { st.items = {}; save(); render(); } });
    render();
  });
})();
