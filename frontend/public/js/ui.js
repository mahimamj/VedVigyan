function normalizePath(pathname) {
  const path = (pathname || "/").replace(/\/+$/, "");
  return path || "/index.html";
}

function initGlobalTopbar() {
  const topbar = document.querySelector(".topbar");
  const container = topbar?.querySelector(".container");
  if (!container) return;
  if (container.querySelector(".topbar-ticker")) return;

  container.classList.add("topbar-ticker-wrap");
  container.innerHTML = `
    <div class="topbar-ticker" aria-label="Current offers">
      <div class="promo-track">
        <span>Limited Time Offer: Up to 39% off on selected Rudraksha</span>
        <span>Free spiritual guidance on WhatsApp for beginners</span>
        <span>Bestseller Picks: 5 Mukhi, 7 Mukhi and Tulsi Mala</span>
        <span>New arrivals now live in Rudraksha, bracelets and puja essentials</span>
        <span>Trusted authenticity guidance included with every product</span>
        <span>Limited Time Offer: Up to 39% off on selected Rudraksha</span>
        <span>Free spiritual guidance on WhatsApp for beginners</span>
        <span>Bestseller Picks: 5 Mukhi, 7 Mukhi and Tulsi Mala</span>
      </div>
    </div>
  `;
}

function initGlobalFooterSocial() {
  const contactFoot = [...document.querySelectorAll(".footer .foot")].find((section) =>
    /Contact/i.test(section.querySelector("h4")?.textContent || "")
  );
  if (!contactFoot || contactFoot.querySelector(".social-footer")) return;

  const social = document.createElement("div");
  social.className = "social social-footer";
  social.setAttribute("aria-label", "Follow Ved Vigyan");
  social.innerHTML = `
    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">yt</a>
    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
    <a href="https://in.pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">pt</a>
  `;
  contactFoot.appendChild(social);
}

function syncGlobalContactInfo() {
  const email = "Vedvigyanindia@gmail.com";
  const phoneDisplay = "+91 7900811101";
  const phoneHref = "tel:+917900811101";
  const whatsappHref = "https://wa.me/917900811101";

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.href = `mailto:${email}`;
    link.textContent = email;
  });

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.href = phoneHref;
    link.textContent = phoneDisplay;
  });

  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach((link) => {
    link.href = whatsappHref;
  });

  document.querySelectorAll("[data-store-email]").forEach((node) => {
    node.textContent = email;
  });

  document.querySelectorAll("[data-store-phone]").forEach((node) => {
    node.textContent = phoneDisplay;
  });
}

function setActiveNav() {
  const path = normalizePath(window.location.pathname);
  const sectionMatchers = [
    { selector: '.dropdown summary', label: "Rudraksha", match: /^\/rudraksha(\/|\.html|$)|^\/rudraksha-mala(\/|\.html|$)/ },
    { selector: '.dropdown summary', label: "Jaap Mala", match: /^\/mala(\/|\.html|$)|^\/rudraksha-mala(\/|\.html|$)/ },
    { selector: '.dropdown summary', label: "Astro Stone", match: /^\/gem-stone(\/|\.html|$)/ },
    { selector: '.dropdown summary', label: "Pooja Essentials", match: /^\/puja-items(\/|\.html|$)|^\/shop\.html$/ }
  ];

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = normalizePath(link.getAttribute("href") || "");
    const isActive = href === path;
    link.setAttribute("aria-current", isActive ? "page" : "false");
    link.classList.toggle("nav-active", isActive);
  });

  document.querySelectorAll(".dropdown summary").forEach((summary) => {
    summary.classList.remove("nav-active");
    summary.setAttribute("aria-current", "false");
  });

  sectionMatchers.forEach(({ selector, label, match }) => {
    if (!match.test(path)) return;
    const summary = [...document.querySelectorAll(selector)].find(
      (node) => node.textContent.trim() === label
    );
    if (!summary) return;
    summary.classList.add("nav-active");
    summary.setAttribute("aria-current", "page");
  });
}

function initDropdowns() {
  const dropdowns = [...document.querySelectorAll(".dropdown")];
  if (!dropdowns.length) return;

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("toggle", () => {
      if (!dropdown.open) return;
      dropdowns.forEach((other) => {
        if (other !== dropdown) other.open = false;
      });
    });
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) dropdown.open = false;
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    dropdowns.forEach((dropdown) => {
      dropdown.open = false;
    });
  });
}

function initCategorySummaryLinks() {
  const categoryRoutes = {
    Rudraksha: "/rudraksha.html",
    "Jaap Mala": "/mala.html",
    "Astro Stone": "/gem-stone.html",
    "Pooja Essentials": "/shop.html"
  };

  document.querySelectorAll(".dropdown summary").forEach((summary) => {
    const label = summary.textContent.trim();
    const targetHref = categoryRoutes[label];
    if (!targetHref) return;

    summary.style.cursor = "pointer";
    summary.setAttribute("role", "link");
    summary.setAttribute("data-category-link", targetHref);

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = targetHref;
    });

    summary.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      window.location.href = targetHref;
    });
  });
}

function initMobileMenu() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const open = menu.getAttribute("data-open") === "true";
    menu.setAttribute("data-open", open ? "false" : "true");
    menu.style.display = open ? "none" : "block";
  });
}

function initBackToTop() {
  if (document.getElementById("toTop")) return;
  const btn = document.createElement("button");
  btn.id = "toTop";
  btn.className = "btn small primary toTop";
  btn.type = "button";
  btn.textContent = "Top";
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(btn);

  const onScroll = () => {
    const show = window.scrollY > 500;
    btn.classList.toggle("show", show);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

document.addEventListener("DOMContentLoaded", () => {
  initGlobalTopbar();
  syncGlobalContactInfo();
  initGlobalFooterSocial();
  setActiveNav();
  initCategorySummaryLinks();
  initDropdowns();
  initMobileMenu();
  initBackToTop();
});
