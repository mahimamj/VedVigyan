# Ved Vigyan (Static eCommerce Website)

Beginner-friendly, modern, responsive **HTML + CSS + JavaScript** eCommerce website for spiritual products (Rudraksha, malas, puja items).

## Run locally (easiest)

### Option A: VS Code / Cursor Live Server (recommended)
- Install **Live Server** extension
- Right-click `frontend/index.html` → **Open with Live Server**

### Option B: Python simple server
From the project root:

```bash
cd frontend
python -m http.server 5500
```

Then open `http://localhost:5500/`

### Option C: Node static server

```bash
npx serve frontend
```

## Main Pages (SEO-friendly)
- `frontend/index.html` (Homepage)
- `frontend/shop.html` (Product listing + filter + search)
- `frontend/rudraksha.html` (SEO category page + lead form)
- `frontend/mala.html` (SEO category page + lead form)
- `frontend/gem-stone.html` (SEO category page + lead form)
- `frontend/faq.html` (FAQ page)
- `frontend/wishlist.html` (Wishlist page)
- `frontend/rudraksha/5-mukhi.html`
- `frontend/rudraksha/7-mukhi.html`
- `frontend/rudraksha-mala/5-mukhi-mala-108.html`
- `frontend/mala/tulsi-mala.html`
- `frontend/bracelet/rudraksha-bracelet.html`
- `frontend/gem-stone/amethyst-bracelet.html`
- `frontend/gem-stone/tiger-eye-bracelet.html`
- `frontend/astrology/kundli-report.html`
- `frontend/puja-items/gangajal.html`
- `frontend/cart.html` (Cart: add/remove/update qty)
- `frontend/checkout.html` (Basic checkout form + COD placeholder)
- `frontend/blog.html` (Blog listing)
- `frontend/blog/benefits-of-wearing-rudraksha.html`
- `frontend/blog/how-to-identify-original-rudraksha.html`
- `frontend/contact.html`

## Where to edit products / prices
Edit:
- `frontend/public/js/data.js`

Add new products by copying one object in `products[]`, and create a matching product page in the right folder:
- `frontend/rudraksha/<slug>.html`
- `frontend/mala/<slug>.html`
- `frontend/gem-stone/<slug>.html`
- `frontend/puja-items/<slug>.html`

## Cart (how it works)
- Uses `localStorage`
- Cart logic: `frontend/public/js/cart.js`
- Shop listing: `frontend/public/js/shop.js`
- Cart page UI: `frontend/public/js/cart-page.js`
- Checkout: `frontend/public/js/checkout.js`
- Lead form (WhatsApp demo): `frontend/public/js/lead.js`
- Wishlist: `frontend/public/js/wishlist.js`

## Design
Theme colors are in:
- `frontend/public/css/style.css` (`--saffron`, `--gold`, etc.)

## Notes
- Checkout is a **frontend demo**. For real payments (HDFC gateway later), connect the checkout form to a backend API.

