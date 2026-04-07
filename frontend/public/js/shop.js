function renderShop() {
  const grid = document.getElementById("productGrid");
  const categorySelect = document.getElementById("categorySelect");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");
  const countEl = document.getElementById("resultCount");
  const advisorForm = document.getElementById("advisorForm");
  const advisorResult = document.getElementById("advisorResult");
  if (!grid) return;

  const data = window.VED_VIGYAN_DATA;
  const products = data?.products || [];
  const FILTERS_KEY = "ved_vigyan_shop_filters_v2";

  let active = "all";
  let query = "";
  let sort = "featured";
  let minPrice = "";
  let maxPrice = "";

  function syncInputs() {
    if (categorySelect) categorySelect.value = active;
    if (searchInput) searchInput.value = query;
    if (sortSelect) sortSelect.value = sort;
    if (minPriceInput) minPriceInput.value = minPrice;
    if (maxPriceInput) maxPriceInput.value = maxPrice;
  }

  function persistFilters() {
    localStorage.setItem(
      FILTERS_KEY,
      JSON.stringify({ active, query, sort, minPrice, maxPrice })
    );
  }

  function restoreFilters() {
    try {
      const saved = JSON.parse(localStorage.getItem(FILTERS_KEY) || "null");
      if (!saved) return;
      active = saved.active || "all";
      query = saved.query || "";
      sort = saved.sort || "featured";
      minPrice = saved.minPrice || "";
      maxPrice = saved.maxPrice || "";
      syncInputs();
    } catch {
      // Ignore malformed local state and continue with defaults.
    }
  }

  function scoreProduct(product, profile) {
    const tags = product.tags || [];
    let score = 0;

    if (profile.goal && tags.includes(profile.goal)) score += 4;
    if (profile.goal === "clarity" && tags.includes("focus")) score += 1;
    if (profile.goal === "prosperity" && tags.includes("guidance")) score += 1;
    if (profile.experience === "beginner" && tags.includes("beginner")) score += 3;
    if (profile.experience === "regular" && tags.includes("serious-practice")) score += 3;
    if (profile.wear === "daily" && tags.includes("daily-wear")) score += 3;
    if (profile.wear === "ritual" && tags.includes("ritual")) score += 3;
    if (profile.budget === "under-700" && product.price <= 700) score += 2;
    if (profile.budget === "700-1500" && product.price >= 700 && product.price <= 1500) score += 2;
    if (profile.budget === "1500-plus" && product.price >= 1500) score += 2;
    if (product.price === 0) score -= 1;

    return score;
  }

  function renderAdvisorResult(product, profile) {
    if (!advisorResult) return;
    if (!product) {
      advisorResult.innerHTML =
        '<p class="sub" style="margin:0">No close match yet. Try a wider budget or a different goal.</p>';
      return;
    }

    advisorResult.innerHTML = `
      <div class="advisor-result-card">
        <div>
          <div class="eyebrow">Recommended for you</div>
          <h3>${product.name}</h3>
          <p class="sub" style="margin:0 0 10px">${product.short}</p>
          <div class="advisor-meta">
            <span class="pill">${profile.goal || "balanced"} focus</span>
            <span class="pill">${profile.experience || "beginner"} friendly</span>
            <span class="pill">${profile.wear || "daily"} use</span>
          </div>
        </div>
        <div class="advisor-result-actions">
          <div class="price">${window.VedVigyanCart.formatINR(product.price)}</div>
          <div class="actions">
            <a class="btn small" href="${product.url}">View Match</a>
            <button class="btn small primary" type="button" data-advisor-apply="${product.category}">
              Show Similar
            </button>
          </div>
        </div>
      </div>
    `;

    advisorResult.querySelector("[data-advisor-apply]")?.addEventListener("click", () => {
      active = product.category;
      query = profile.goal === "clarity" ? "focus" : "";
      syncInputs();
      apply();
      window.scrollTo({ top: Math.max(0, grid.offsetTop - 120), behavior: "smooth" });
    });
  }

  function wireAdvisor() {
    if (!advisorForm) return;
    advisorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const profile = Object.fromEntries(new FormData(advisorForm).entries());
      const [match] = [...products]
        .map((product) => ({ product, score: scoreProduct(product, profile) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.product);

      renderAdvisorResult(match, profile);
    });
  }

  function ensureQuickViewModal() {
    if (document.getElementById("quickViewOverlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "quickViewOverlay";
    overlay.className = "overlay";
    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-label="Quick view">
        <div class="modal-head">
          <b id="qvTitle">Quick view</b>
          <button class="modal-close" type="button" aria-label="Close">✕</button>
        </div>
        <div class="modal-body" id="qvBody"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    const close = () => {
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    };
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    overlay.querySelector(".modal-close").addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("show")) close();
    });
    overlay.__vv_close = close;
  }

  function openQuickView(productId) {
    ensureQuickViewModal();
    const overlay = document.getElementById("quickViewOverlay");
    const p = products.find((x) => x.id === productId);
    if (!overlay || !p) return;

    const title = overlay.querySelector("#qvTitle");
    const body = overlay.querySelector("#qvBody");
    if (title) title.textContent = p.name;
    if (body) {
      body.innerHTML = `
        <div class="product-layout" style="grid-template-columns: 1fr 1fr; gap:14px">
          <div class="product-img" style="min-height:260px">
            <img src="${p.image}" alt="${p.imageAlt}" width="520" height="320" loading="lazy">
          </div>
          <div>
            <div class="pillrow" style="padding:0; margin-bottom:10px">
              <span class="pill">${p.category.replace("-", " ")}</span>
              <span class="pill">Authenticity guidance</span>
            </div>
            <p class="sub" style="margin:0 0 12px">${p.short}</p>
            <div class="price" style="font-size:20px">${window.VedVigyanCart.formatINR(p.price)}</div>
            <div class="actions" style="margin-top:12px">
              <a class="btn small" href="${p.url}">View Full Details</a>
              <button class="btn small primary" type="button" data-add-to-cart="${p.id}">Add to Cart</button>
              <button class="btn small wishbtn" type="button" data-wishlist="${p.id}" aria-label="Add to wishlist">♡</button>
            </div>
            <div class="chakra" style="margin-top:12px">
              <b>Quick tip:</b> Choose comfort + consistency. If you want help selecting, use our category pages to request guidance.
            </div>
          </div>
        </div>
      `;
      window.VedVigyanCart.wireAddToCartButtons(body);
      window.VedVigyanWishlist?.wireWishlistButtons?.(body);
      window.VedVigyanWishlist?.updateWishButtons?.(body);
    }

    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function apply() {
    const q = query.trim().toLowerCase();
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);

    let filtered = products.filter((p) => {
      const catOk = active === "all" ? true : p.category === active;
      const qOk = !q
        ? true
        : `${p.name} ${p.short} ${p.category} ${(p.tags || []).join(" ")}`
            .toLowerCase()
            .includes(q);
      const priceOk =
        (min === null || p.price >= min) && (max === null || p.price <= max);
      return catOk && qOk && priceOk;
    });

    if (sort === "price-asc") filtered = filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filtered = filtered.sort((a, b) => b.price - a.price);
    if (sort === "name-asc") filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

    persistFilters();

    grid.innerHTML = filtered
      .map((p) => {
        return `
          <article class="card">
            <div class="thumb">
              <img src="${p.image}" alt="${p.imageAlt}" width="420" height="260" loading="lazy">
            </div>
            <div class="pillrow">
              <span class="pill">${p.category.replace("-", " ")}</span>
              <span class="pill">Authenticity guidance</span>
            </div>
            <div class="body">
              <h3>${p.name}</h3>
              <div class="muted">${p.short}</div>
              <div class="price">${window.VedVigyanCart.formatINR(p.price)}</div>
              <div class="actions">
                <a class="btn small" href="${p.url}">View Details</a>
                <button class="btn small primary" type="button" data-add-to-cart="${p.id}">Add to Cart</button>
                <button class="btn small wishbtn" type="button" data-wishlist="${p.id}" aria-label="Add to wishlist">♡</button>
                <button class="btn small" type="button" data-quick-view="${p.id}">Quick View</button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    window.VedVigyanCart.wireAddToCartButtons(grid);
    window.VedVigyanWishlist?.wireWishlistButtons?.(grid);
    window.VedVigyanWishlist?.updateWishButtons?.(grid);
    grid.querySelectorAll("[data-quick-view]").forEach((b) => {
      b.addEventListener("click", () => openQuickView(b.getAttribute("data-quick-view")));
    });
    if (countEl) countEl.textContent = `${filtered.length} item(s)`;
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", (e) => {
      active = e.target.value || "all";
      apply();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      query = e.target.value || "";
      apply();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sort = e.target.value || "featured";
      apply();
    });
  }

  const onPriceInput = () => {
    minPrice = minPriceInput?.value ?? "";
    maxPrice = maxPriceInput?.value ?? "";
    apply();
  };
  if (minPriceInput) minPriceInput.addEventListener("input", onPriceInput);
  if (maxPriceInput) maxPriceInput.addEventListener("input", onPriceInput);

  // Initialize from dropdown (if present)
  if (categorySelect) active = categorySelect.value || "all";

  restoreFilters();
  wireAdvisor();
  apply();
}

document.addEventListener("DOMContentLoaded", renderShop);

