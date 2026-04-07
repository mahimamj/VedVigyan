function renderCheckoutSummary() {
  const summary = document.getElementById("checkoutSummary");
  const totalEl = document.getElementById("checkoutTotal");
  if (!summary || !totalEl) return;

  const cart = window.VedVigyanCart.loadCart();
  const items = Object.values(cart.items);
  if (!items.length) {
    summary.innerHTML = `<p class="sub" style="margin:0">Your cart is empty. <a href="/shop.html">Go to shop</a>.</p>`;
    totalEl.textContent = window.VedVigyanCart.formatINR(0);
    return;
  }

  summary.innerHTML = items
    .map((it) => {
      return `
        <div style="display:flex; justify-content:space-between; gap:10px; padding:10px 0; border-bottom:1px solid var(--line)">
          <div>
            <b>${it.name}</b>
            <div class="muted">Qty: ${it.qty}</div>
          </div>
          <div><b>${window.VedVigyanCart.formatINR((it.price || 0) * (it.qty || 0))}</b></div>
        </div>
      `;
    })
    .join("");

  totalEl.textContent = window.VedVigyanCart.formatINR(window.VedVigyanCart.cartSubtotal(cart));
}

function wireCheckoutForm() {
  const form = document.getElementById("checkoutForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.phone || !data.address) {
      window.VedVigyanCart.toast("Please fill required fields");
      return;
    }

    // Placeholder: In real integration this would post to backend/payment gateway.
    window.VedVigyanCart.clearCart();
    window.VedVigyanCart.toast("Order placed (COD)");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 650);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutSummary();
  wireCheckoutForm();
  window.addEventListener("vedvigyan:cart-updated", renderCheckoutSummary);
});

