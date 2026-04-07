function findCategoryForCartItem(productId) {
  const catalog = (window.VED_VIGYAN_DATA && window.VED_VIGYAN_DATA.products) || [];
  return catalog.find((product) => product.id === productId)?.category || "";
}

function createRecommendationMarkup(product, label) {
  return `
    <article class="recommend-card">
      <div class="thumb">
        <img src="${product.image}" alt="${product.imageAlt}" width="240" height="180" loading="lazy">
      </div>
      <div class="body">
        <div class="eyebrow">${label}</div>
        <h3>${product.name}</h3>
        <p class="sub" style="margin:0">${product.short}</p>
        <div class="price">${window.VedVigyanCart.formatINR(product.price)}</div>
        <div class="actions">
          <a class="btn small" href="${product.url}">View Details</a>
          <button class="btn small primary" type="button" data-add-to-cart="${product.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderCartPage() {
  const tableBody = document.getElementById("cartBody");
  const subtotalEl = document.getElementById("cartSubtotal");
  const emptyEl = document.getElementById("cartEmpty");
  const actionsEl = document.getElementById("cartActions");
  const summaryHost = document.getElementById("cartSmartSummary");
  const recommendationHost = document.getElementById("cartRecommendations");
  if (!tableBody) return;

  const cart = window.VedVigyanCart.loadCart();
  const items = Object.values(cart.items);
  const subtotal = window.VedVigyanCart.cartSubtotal(cart);
  const freeShippingGap = Math.max(0, 1499 - subtotal);
  const catalog = (window.VED_VIGYAN_DATA && window.VED_VIGYAN_DATA.products) || [];

  if (summaryHost) {
    summaryHost.innerHTML = `
      <div class="smart-summary">
        <div>
          <div class="eyebrow">Cart insight</div>
          <h3>${items.length ? "Your cart is building nicely" : "Start with one simple spiritual essential"}</h3>
          <p class="sub" style="margin:0">
            ${
              items.length
                ? freeShippingGap > 0
                  ? `Add ${window.VedVigyanCart.formatINR(freeShippingGap)} more to unlock free shipping in this demo flow.`
                  : "You have unlocked free shipping in this demo flow."
                : "Popular starter picks include Tulsi mala, Rudraksha bracelet, and Gangajal."
            }
          </p>
        </div>
        <div class="progress-strip" aria-hidden="true">
          <span style="width:${Math.min(100, Math.round((subtotal / 1499) * 100))}%"></span>
        </div>
      </div>
    `;
  }

  if (!items.length) {
    tableBody.innerHTML = "";
    if (subtotalEl) subtotalEl.textContent = window.VedVigyanCart.formatINR(0);
    if (emptyEl) emptyEl.style.display = "block";
    if (actionsEl) actionsEl.style.display = "none";
    if (recommendationHost) {
      recommendationHost.innerHTML = catalog
        .slice(0, 3)
        .map((product) => createRecommendationMarkup(product, "Starter pick"))
        .join("");
      window.VedVigyanCart.wireAddToCartButtons(recommendationHost);
    }
    return;
  }

  if (emptyEl) emptyEl.style.display = "none";
  if (actionsEl) actionsEl.style.display = "flex";

  tableBody.innerHTML = items
    .map((it) => {
      const line = (it.price || 0) * (it.qty || 0);
      return `
        <tr>
          <td>
            <div style="display:flex; gap:10px; align-items:flex-start">
              <img src="${it.image}" alt="${it.imageAlt}" width="64" height="64" style="border-radius:14px; border:1px solid var(--line); background:rgba(255,255,255,.7); padding:6px">
              <div>
                <div style="font-weight:900">${it.name}</div>
                <a class="muted" href="${it.url}">View product</a>
              </div>
            </div>
          </td>
          <td>${window.VedVigyanCart.formatINR(it.price)}</td>
          <td>
            <div class="qty" data-qty="${it.id}">
              <button type="button" data-dec="${it.id}" aria-label="Decrease quantity">−</button>
              <span>${it.qty}</span>
              <button type="button" data-inc="${it.id}" aria-label="Increase quantity">+</button>
            </div>
          </td>
          <td><b>${window.VedVigyanCart.formatINR(line)}</b></td>
          <td>
            <button class="btn small" type="button" data-remove="${it.id}">Remove</button>
          </td>
        </tr>
      `;
    })
    .join("");

  if (subtotalEl) subtotalEl.textContent = window.VedVigyanCart.formatINR(subtotal);

  if (recommendationHost) {
    const categories = new Set(items.map((item) => findCategoryForCartItem(item.id)));
    const recommendations = catalog
      .filter((product) => !cart.items[product.id] && categories.has(product.category))
      .slice(0, 3);

    recommendationHost.innerHTML = recommendations.length
      ? recommendations
          .map((product) => createRecommendationMarkup(product, "Pairs well with your cart"))
          .join("")
      : '<p class="sub" style="margin:0">Your cart already covers this category well. You can head to checkout when ready.</p>';

    window.VedVigyanCart.wireAddToCartButtons(recommendationHost);
  }

  tableBody.querySelectorAll("[data-remove]").forEach((b) => {
    b.addEventListener("click", () => {
      window.VedVigyanCart.removeFromCart(b.getAttribute("data-remove"));
      renderCartPage();
      window.VedVigyanCart.toast("Removed");
    });
  });
  tableBody.querySelectorAll("[data-inc]").forEach((b) => {
    b.addEventListener("click", () => {
      const id = b.getAttribute("data-inc");
      const c = window.VedVigyanCart.loadCart();
      const qty = (c.items[id]?.qty || 1) + 1;
      window.VedVigyanCart.setQty(id, qty);
      renderCartPage();
    });
  });
  tableBody.querySelectorAll("[data-dec]").forEach((b) => {
    b.addEventListener("click", () => {
      const id = b.getAttribute("data-dec");
      const c = window.VedVigyanCart.loadCart();
      const qty = Math.max(1, (c.items[id]?.qty || 1) - 1);
      window.VedVigyanCart.setQty(id, qty);
      renderCartPage();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  window.addEventListener("vedvigyan:cart-updated", renderCartPage);
});

