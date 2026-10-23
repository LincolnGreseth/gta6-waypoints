// Build-time environment. Secrets stay in Netlify env vars, never in the repo.
export default {
  brevoAction: process.env.BREVO_FORM_ACTION || "",
};
