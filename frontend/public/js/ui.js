function setActiveNav() {
  const path = window.location.pathname.replace(/\/+$/, "");
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const normalized = href.replace(/\/+$/, "");
    const isActive = normalized && normalized !== "#" && path.endsWith(normalized);
    a.setAttribute("aria-current", isActive ? "page" : "false");
    if (isActive) a.style.background = "rgba(242,140,40,.10)";
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
  setActiveNav();
  initMobileMenu();
  initBackToTop();
});

