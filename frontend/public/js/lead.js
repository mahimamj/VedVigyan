function wireLeadForms() {
  document.querySelectorAll("[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      const name = String(data.name || "").trim();
      const phone = String(data.phone || "").trim();
      const interest = String(data.interest || "").trim();

      if (!name || !phone) {
        window.VedVigyanCart?.toast?.("Please enter name & phone");
        return;
      }

      // Save locally (demo lead capture)
      const key = "ved_vigyan_leads_v1";
      const leads = JSON.parse(localStorage.getItem(key) || "[]");
      leads.unshift({
        name,
        phone,
        interest,
        page: window.location.pathname,
        ts: new Date().toISOString()
      });
      localStorage.setItem(key, JSON.stringify(leads.slice(0, 50)));

      // Create a prefilled WhatsApp message (works on mobile/desktop WhatsApp Web)
      const msg =
        `Ved Vigyan Lead%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
        `Interest: ${encodeURIComponent(interest || "General")} %0A` +
        `Page: ${encodeURIComponent(window.location.pathname)}`;

      form.reset();
      window.VedVigyanCart?.toast?.("Lead saved. Opening WhatsApp…");
      setTimeout(() => {
        window.open(`https://wa.me/919000000000?text=${msg}`, "_blank", "noopener");
      }, 350);
    });
  });
}

document.addEventListener("DOMContentLoaded", wireLeadForms);

