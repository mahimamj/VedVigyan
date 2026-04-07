function renderCartPage() {
  const tableBody = document.getElementById("cartBody");
  const subtotalEl = document.getElementById("cartSubtotal");
  const emptyEl = document.getElementById("cartEmpty");
  const actionsEl = document.getElementById("cartActions");
  if (!tableBody) return;

  const cart = window.VedVigyanCart.loadCart();
  const items = Object.values(cart.items);

  if (!items.length) {
    tableBody.innerHTML = "";
    if (subtotalEl) subtotalEl.textContent = window.VedVigyanCart.formatINR(0);
    if (emptyEl) emptyEl.style.display = "block";
    if (actionsEl) actionsEl.style.display = "none";
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

  if (subtotalEl) subtotalEl.textContent = window.VedVigyanCart.formatINR(window.VedVigyanCart.cartSubtotal(cart));

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

