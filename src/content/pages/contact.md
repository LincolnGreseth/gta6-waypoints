---
title: "Contact GTA 6 Waypoints"
description: "Contact GTA 6 Waypoints with corrections (please include a source), press questions or partnership enquiries. We read every message."
layout: layouts/guide.njk
crumb: "Contact"
h1: "Contact us"
lead: "Use the form below to send a correction, a press question or a partnership enquiry. We read every message and reply when a reply is needed."
updated: 2026-10-23
signupOff: true
---
{# TODO: Lincoln — add a public contact email to site.json → contactEmail. #}

## What to contact us about

- **Corrections.** Found something wrong? Tell us what and where, and include a source link or a screenshot if you can. Corrections with a source are always welcome.
- **Press.** Questions about the site or its guides.
- **Partnerships.** Affiliate, sponsorship and advertising enquiries.

Please don't send leaked material or links to it. We don't publish leaks, and we delete those messages.

{%- if site.contactEmail %}

You can also email us at [{{ site.contactEmail }}](mailto:{{ site.contactEmail }}).
{%- endif %}

## Send a message

<style>
.contact-form{flex-direction:column;align-items:stretch;max-width:var(--measure)}
.contact-form input:not([type=hidden]),.contact-form textarea{font:inherit;color:var(--foam);background:var(--night);border:1px solid var(--dusk-line);border-radius:6px;padding:.75rem .85rem}
.contact-form button{align-self:flex-start}
</style>
<form class="signup__form contact-form" name="contact" method="post" action="/message-sent/" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact">
  <div class="hp" aria-hidden="true"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></div>
  <label for="contact-name">Name</label>
  <input id="contact-name" type="text" name="name" autocomplete="name" required>
  <label for="contact-email">Email</label>
  <input id="contact-email" type="email" name="email" autocomplete="email" required>
  <label for="contact-message">Message</label>
  <textarea id="contact-message" name="message" rows="6" required></textarea>
  <button type="submit" class="btn">Send message</button>
</form>

We use what you send only to reply to you. See our [privacy policy](/privacy/).
