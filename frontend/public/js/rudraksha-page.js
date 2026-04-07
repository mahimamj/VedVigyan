function renderRudrakshaPage() {
  const catalogHost = document.getElementById("rudrakshaCatalog");
  const storiesHost = document.getElementById("rudrakshaStories");
  const products = (window.VED_VIGYAN_DATA?.products || []).filter(
    (product) => product.category === "rudraksha"
  );

  function renderStars(rating) {
    const fullStars = Math.round(rating || 0);
    return `${"★".repeat(fullStars)}${"☆".repeat(Math.max(0, 5 - fullStars))}`;
  }

  function renderPriceBlock(product) {
    const actualPrice = window.VedVigyanCart.formatINR(product.price);
    if (!product.originalPrice || product.originalPrice <= product.price) {
      return `<div class="price">${actualPrice}</div>`;
    }

    return `
      <div class="rating-row">
        <span class="stars" aria-hidden="true">${renderStars(product.rating)}</span>
        <span class="rating-text">${product.rating}/5</span>
      </div>
      <div class="price-stack">
        <div class="price">${actualPrice}</div>
        <div class="price-meta">
          <span class="old-price">${window.VedVigyanCart.formatINR(product.originalPrice)}</span>
          <span class="discount-badge">${product.discountPercent}% OFF</span>
        </div>
      </div>
    `;
  }

  if (catalogHost) {
    catalogHost.innerHTML = products
      .map(
        (product) => `
          <article class="card">
            <div class="thumb">
              <img src="${product.image}" alt="${product.imageAlt}" width="420" height="260" loading="lazy">
            </div>
            <div class="pillrow">
              <span class="pill">Rudraksha</span>
              <span class="pill">${product.slug.replace(/-/g, " ")}</span>
            </div>
            <div class="body">
              <h3>${product.name}</h3>
              <div class="muted">${product.short}</div>
              ${renderPriceBlock(product)}
              <div class="actions">
                <a class="btn small" href="${product.url}">View Details</a>
                <button class="btn small primary" type="button" data-add-to-cart="${product.id}">Add to Cart</button>
              </div>
            </div>
          </article>
        `
      )
      .join("");

    window.VedVigyanCart.wireAddToCartButtons(catalogHost);
  }

  if (storiesHost) {
    storiesHost.innerHTML = `
      <article class="story-card">
        <img src="/public/images/products/rudraksha-benefits.png" alt="Rudraksha life change story banner" loading="lazy">
      </article>
      <article class="story-card">
        <img src="/public/images/products/rudraksha-benefits-men.png" alt="Rudraksha transformation banner for men" loading="lazy">
      </article>
      <article class="story-card">
        <img src="/public/images/products/rudraksha-10-mukhi-square.png" alt="10 Mukhi Rudraksha showcase image" loading="lazy">
      </article>
    `;
  }
}

document.addEventListener("DOMContentLoaded", renderRudrakshaPage);
