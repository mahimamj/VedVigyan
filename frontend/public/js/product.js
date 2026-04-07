function getSlugFromPath() {
  const params = new URLSearchParams(window.location.search);
  const slugParam = params.get("slug");
  if (slugParam) return slugParam;
  const path = window.location.pathname.replace(/\/+$/, "");
  const file = path.split("/").pop() || "";
  return file.replace(/\.html$/i, "");
}

function getCategoryFromPath() {
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category");
  if (categoryParam) return categoryParam;
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts.length >= 2 ? parts[parts.length - 2] : "";
}

function saveRecentlyViewed(product) {
  const key = "ved_vigyan_recently_viewed_v1";
  try {
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const next = [product, ...existing.filter((item) => item.id !== product.id)].slice(0, 4);
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    // Ignore localStorage issues.
  }
}

function getRecentlyViewed(currentId) {
  const key = "ved_vigyan_recently_viewed_v1";
  try {
    return JSON.parse(localStorage.getItem(key) || "[]").filter((item) => item.id !== currentId);
  } catch {
    return [];
  }
}

function getRelatedProducts(product, products) {
  const tags = product.tags || [];
  return products
    .filter((candidate) => candidate.id !== product.id)
    .map((candidate) => {
      const overlap = (candidate.tags || []).filter((tag) => tags.includes(tag)).length;
      const sameCategory = candidate.category === product.category ? 2 : 0;
      return { product: candidate, score: overlap + sameCategory };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.product);
}

function createRecommendationCard(product, label) {
  const fullStars = Math.round(product.rating || 0);
  const stars = `${"★".repeat(fullStars)}${"☆".repeat(Math.max(0, 5 - fullStars))}`;
  const priceBlock = product.originalPrice && product.originalPrice > product.price
    ? `
        <div class="rating-row">
          <span class="stars" aria-hidden="true">${stars}</span>
          <span class="rating-text">${product.rating}/5</span>
        </div>
        <div class="price-stack">
          <div class="price">${window.VedVigyanCart.formatINR(product.price)}</div>
          <div class="price-meta">
            <span class="old-price">${window.VedVigyanCart.formatINR(product.originalPrice)}</span>
            <span class="discount-badge">${product.discountPercent}% OFF</span>
          </div>
        </div>
      `
    : `<div class="price">${window.VedVigyanCart.formatINR(product.price)}</div>`;

  return `
    <article class="recommend-card">
      <div class="thumb">
        <img src="${product.image}" alt="${product.imageAlt}" width="240" height="180" loading="lazy">
      </div>
      <div class="body">
        <div class="eyebrow">${label}</div>
        <h3>${product.name}</h3>
        <p class="sub" style="margin:0">${product.short}</p>
        ${priceBlock}
        <div class="actions">
          <a class="btn small" href="${product.url}">Open</a>
          <button class="btn small primary" type="button" data-add-to-cart="${product.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderDiscoveryRail(product, products) {
  const host = document.querySelector(".pagecard");
  if (!host || document.getElementById("productDiscoveryRail")) return;

  const related = getRelatedProducts(product, products);
  const recent = getRecentlyViewed(product.id).slice(0, 2);
  const combined = [
    ...related.map((item) => ({ item, label: "Related pick" })),
    ...recent.map((item) => ({ item, label: "Recently viewed" }))
  ].slice(0, 4);

  if (!combined.length) return;

  const section = document.createElement("section");
  section.id = "productDiscoveryRail";
  section.className = "discovery-rail";
  section.innerHTML = `
    <div class="section-head" style="margin-top:18px">
      <div>
        <h2 class="section-title">You May Also Like</h2>
        <p class="section-sub">Helpful picks based on this product and your recent browsing.</p>
      </div>
    </div>
    <div class="recommend-grid">
      ${combined.map(({ item, label }) => createRecommendationCard(item, label)).join("")}
    </div>
  `;

  host.appendChild(section);
  window.VedVigyanCart.wireAddToCartButtons(section);
}

function renderProductPage() {
  const data = window.VED_VIGYAN_DATA;
  const products = data?.products || [];
  const slug = getSlugFromPath();
  const category = getCategoryFromPath();

  const product = products.find((p) => p.slug === slug && p.category === category);
  if (!product) return;
  saveRecentlyViewed(product);

  const titleEl = document.getElementById("productTitle");
  const priceEl = document.getElementById("productPrice");
  const descEl = document.getElementById("productDesc");
  const imgEl = document.getElementById("productImg");
  const bulletsEl = document.getElementById("productBullets");
  const addBtn = document.getElementById("addToCartBtn");
  const wishBtn = document.querySelector("[data-wishlist]");

  if (titleEl) titleEl.textContent = product.name;
  if (priceEl) {
    const fullStars = Math.round(product.rating || 0);
    const stars = `${"★".repeat(fullStars)}${"☆".repeat(Math.max(0, 5 - fullStars))}`;
    priceEl.innerHTML = product.originalPrice && product.originalPrice > product.price
      ? `
          <div class="rating-row">
            <span class="stars" aria-hidden="true">${stars}</span>
            <span class="rating-text">${product.rating}/5</span>
          </div>
          <div class="price-stack">
            <div class="price">${window.VedVigyanCart.formatINR(product.price)}</div>
            <div class="price-meta">
              <span class="old-price">${window.VedVigyanCart.formatINR(product.originalPrice)}</span>
              <span class="discount-badge">${product.discountPercent}% OFF</span>
            </div>
          </div>
        `
      : `<div class="price">${window.VedVigyanCart.formatINR(product.price)}</div>`;
  }
  if (descEl) descEl.textContent = product.description;
  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.imageAlt;
  }
  if (bulletsEl && Array.isArray(product.bullets)) {
    bulletsEl.innerHTML = product.bullets.map((b) => `<li>${b}</li>`).join("");
  }
  if (addBtn) {
    addBtn.setAttribute("data-add-to-cart", product.id);
    window.VedVigyanCart.wireAddToCartButtons(document);
  }
  if (wishBtn) {
    wishBtn.setAttribute("data-wishlist", product.id);
    window.VedVigyanWishlist?.wireWishlistButtons?.(document);
    window.VedVigyanWishlist?.updateWishButtons?.(document);
  }

  if (product.seoTitle) document.title = product.seoTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && product.seoDescription) metaDesc.setAttribute("content", product.seoDescription);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", product.url);

  renderDiscoveryRail(product, products);
}

document.addEventListener("DOMContentLoaded", renderProductPage);

