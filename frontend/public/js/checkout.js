const CUSTOMER_KEY = "ved_vigyan_checkout_customer_v1";
const ORDER_KEY = "ved_vigyan_orders_v1";

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

function loadSavedCustomer() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "{}");
  } catch {
    return {};
  }
}

function prefillCheckoutForm() {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  const saved = loadSavedCustomer();
  Object.entries(saved).forEach(([key, value]) => {
    if (form.elements[key] && typeof value === "string") {
      form.elements[key].value = value;
    }
  });
}

function saveCustomerProfile(data) {
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(data));
}

function saveOrder(order) {
  try {
    const orders = JSON.parse(localStorage.getItem(ORDER_KEY) || "[]");
    localStorage.setItem(ORDER_KEY, JSON.stringify([order, ...orders].slice(0, 10)));
  } catch {
    // Ignore localStorage issues.
  }
}

function renderOrderConfirmation(order) {
  const form = document.getElementById("checkoutForm");
  const summary = document.getElementById("checkoutSummary");
  const totalEl = document.getElementById("checkoutTotal");
  if (!form || !summary || !totalEl) return;

  form.innerHTML = `
    <div class="order-confirm">
      <div class="eyebrow">Order placed</div>
      <h2>Your spiritual essentials are booked</h2>
      <p class="sub" style="margin:0">
        Order <b>${order.id}</b> was saved locally with ${order.items.length} item(s). Estimated dispatch: within 24 hours in this demo flow.
      </p>
      <div class="pagecard" style="margin-top:14px; padding:14px">
        <p style="margin:0 0 8px"><b>Delivery to:</b> ${order.customer.name}, ${order.customer.phone}</p>
        <p class="muted" style="margin:0">${order.customer.address}${order.customer.city ? `, ${order.customer.city}` : ""}${order.customer.pincode ? ` - ${order.customer.pincode}` : ""}</p>
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px">
        <a class="btn small primary" href="/shop.html">Continue Shopping</a>
        <a class="btn small" href="/cart.html">View Cart</a>
      </div>
    </div>
  `;

  summary.innerHTML = order.items
    .map((item) => {
      return `
        <div style="display:flex; justify-content:space-between; gap:10px; padding:10px 0; border-bottom:1px solid var(--line)">
          <div>
            <b>${item.name}</b>
            <div class="muted">Qty: ${item.qty}</div>
          </div>
          <div><b>${window.VedVigyanCart.formatINR((item.price || 0) * (item.qty || 0))}</b></div>
        </div>
      `;
    })
    .join("");

  totalEl.textContent = window.VedVigyanCart.formatINR(order.total);
}

function wireCheckoutForm() {
  const form = document.getElementById("checkoutForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const cart = window.VedVigyanCart.loadCart();
    const items = Object.values(cart.items);

    if (!data.name || !data.phone || !data.address) {
      window.VedVigyanCart.toast("Please fill required fields");
      return;
    }

    if (!items.length) {
      window.VedVigyanCart.toast("Your cart is empty");
      return;
    }

    saveCustomerProfile(data);
    const order = {
      id: `VV${Date.now().toString().slice(-8)}`,
      items,
      total: window.VedVigyanCart.cartSubtotal(cart),
      customer: data,
      payment: data.payment || "cod",
      placedAt: new Date().toISOString()
    };

    saveOrder(order);
    window.VedVigyanCart.clearCart();
    renderOrderConfirmation(order);
    window.VedVigyanCart.toast("Order placed");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  prefillCheckoutForm();
  renderCheckoutSummary();
  wireCheckoutForm();
  window.addEventListener("vedvigyan:cart-updated", renderCheckoutSummary);
});

