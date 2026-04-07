function getSlugFromPath() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const file = path.split("/").pop() || "";
  return file.replace(/\.html$/i, "");
}

function getCategoryFromPath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts.length >= 2 ? parts[parts.length - 2] : "";
}

function renderProductPage() {
  const data = window.VED_VIGYAN_DATA;
  const products = data?.products || [];
  const slug = getSlugFromPath();
  const category = getCategoryFromPath();

  const product = products.find((p) => p.slug === slug && p.category === category);
  if (!product) return;

  const titleEl = document.getElementById("productTitle");
  const priceEl = document.getElementById("productPrice");
  const descEl = document.getElementById("productDesc");
  const imgEl = document.getElementById("productImg");
  const bulletsEl = document.getElementById("productBullets");
  const addBtn = document.getElementById("addToCartBtn");
  const wishBtn = document.querySelector("[data-wishlist]");

  if (titleEl) titleEl.textContent = product.name;
  if (priceEl) priceEl.textContent = window.VedVigyanCart.formatINR(product.price);
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
}

document.addEventListener("DOMContentLoaded", renderProductPage);

