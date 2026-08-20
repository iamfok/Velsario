# Velsario — Next.js Website

Premium Black & White Fashion Brand Website

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Cloudflare Pages (free)
- **Database:** Google Sheets (via Apps Script)

## Project Structure
```
velsario/
├── app/
│   ├── main/           # Public website pages
│   │   ├── page.tsx           # Home
│   │   ├── shop/page.tsx      # Shop
│   │   ├── shop/[id]/page.tsx # Product detail
│   │   ├── cart/page.tsx      # Cart
│   │   ├── checkout/page.tsx  # Checkout
│   │   ├── about/page.tsx     # About
│   │   ├── contact/page.tsx   # Contact
│   │   └── ...
│   ├── admin/          # Admin panel
│   │   ├── page.tsx           # Dashboard
│   │   ├── products/page.tsx  # Products
│   │   ├── orders/page.tsx    # Orders
│   │   └── content/page.tsx   # Content approval
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
├── lib/
│   ├── products.ts     # Product data (edit this to add products)
│   └── cart-context.tsx
└── ...
```

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open http://localhost:3000

### 3. Add Products
Edit `lib/products.ts` to add/edit products.

### 4. Deploy to Cloudflare Pages

1. Push to GitHub
2. Go to Cloudflare Pages → Create Project → Connect GitHub
3. Build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
4. Deploy!

### 5. Connect Domain (velsario.com)
In Cloudflare Pages → Custom Domains → Add `velsario.com`
Then in Hostinger → Update nameservers to Cloudflare

## Admin Panel
Access at: `your-domain.com/admin`

> Note: Add password protection via Cloudflare Access (free) for security.

## Customization

### Colors
Edit `tailwind.config.ts` → `colors` section

### Fonts
Edit `app/globals.css` → `@import` and font-family

### Products
Edit `lib/products.ts` — add product objects with images from Google Drive

### Pages
Each page is a separate file in `app/main/` — edit directly

## Environment Variables
No env variables needed — all API URLs are in the code.
For production, move sensitive URLs to `.env.local`.
