---
title: "Free GTA 6 Countdown Widget for Sites and OBS"
description: "Add a live GTA 6 countdown to your website or stream. Copy one line of code, or drop the link into OBS as a transparent overlay. Free."
layout: layouts/guide.njk
crumb: "Countdown widget"
h1: "Free GTA 6 countdown for your site or stream"
lead: "Copy the code below to put a live countdown to Grand Theft Auto VI's November 19, 2026 launch on your website, or add the overlay link to OBS as a browser source. It's free, updates every second, and switches to \"GTA 6 is out\" at launch."
updated: 2026-10-23
signupOff: false
related:
  - text: "GTA 6 unlock times by region"
    url: "/release-date-times/#unlock-times"
  - text: "GTA 6 launch checklist"
    url: "/launch-checklist/"
  - text: "Everything confirmed about GTA 6"
    url: "/everything-confirmed/"
---
<div class="widget" data-widget data-base="{{ site.url }}/embed/countdown/">
<fieldset class="widget__opts">
<legend>Style</legend>
<label><input type="radio" name="w-size" value="md" checked> Standard</label>
<label><input type="radio" name="w-size" value="sm"> Compact</label>
<label><input type="radio" name="w-size" value="lg"> Large</label>
</fieldset>
<fieldset class="widget__opts">
<legend>Background</legend>
<label><input type="radio" name="w-bg" value="dark" checked> Dark</label>
<label><input type="radio" name="w-bg" value="transparent"> Transparent</label>
</fieldset>
<h2 id="embed-code">Embed code</h2>
<p>Paste this where you want the countdown. The link under it credits GTA 6 Waypoints; please keep it.</p>
<label class="vh" for="w-code">Embed code</label>
<textarea id="w-code" class="widget__code" rows="5" readonly data-widget-code>&lt;iframe src="{{ site.url }}/embed/countdown/" title="GTA 6 countdown" width="100%" height="230" style="border:0;max-width:640px" loading="lazy"&gt;&lt;/iframe&gt;
&lt;p style="font-size:12px"&gt;&lt;a href="{{ site.url }}/"&gt;GTA 6 countdown&lt;/a&gt; by GTA 6 Waypoints&lt;/p&gt;</textarea>
<p><button type="button" class="btn" data-copy-from="w-code" data-tool="widget-embed">Copy embed code</button></p>
<h2 id="preview">Preview</h2>
<div class="widget__preview">
<iframe src="/embed/countdown/" title="GTA 6 countdown preview" width="100%" height="230" loading="lazy" data-widget-preview></iframe>
</div>
<h2 id="obs">Add it to OBS as a stream overlay</h2>
<ol>
<li>In OBS, click <strong>+</strong> under Sources and choose <strong>Browser</strong>.</li>
<li>Paste this URL, and set the width to 900 and the height to 320:</li>
</ol>
<label class="vh" for="w-obs">OBS browser source URL</label>
<input id="w-obs" class="widget__code" type="text" readonly value="{{ site.url }}/embed/countdown/?bg=transparent&amp;size=lg" data-widget-obs>
<p><button type="button" class="btn" data-copy-from="w-obs" data-tool="widget-obs">Copy OBS link</button></p>
<ol start="3">
<li>Click OK. The background is transparent, so it sits on top of your scene. Drag it where you want it.</li>
</ol>
</div>

## How it works

The countdown runs to midnight on November 19, 2026 in each viewer's own time zone, the same as the one on our [home page](/). Rockstar hasn't announced unlock times yet; our best estimates by region are on the [release date page](/release-date-times/#unlock-times). If Rockstar posts official times, the widget updates on its own. You don't need to change your code.

The widget loads no ads and no trackers. It's a small page from gta6waypoints.com with a credit link at the bottom.
