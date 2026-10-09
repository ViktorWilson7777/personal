# FER202 - Lab 4 & 5: Next.js Rendering, API Routes & Supabase Favorites

An e-commerce web application built with **Next.js 15 App Router**, **Supabase Auth & Database (with Row Level Security)**, and **Tailwind CSS**.

---

## 🌟 Key Features

1. **Next.js 15 App Router Architecture**:
   - Server-Rendered components, Route Handlers (`/api/products`), and Static Site Generation (`generateStaticParams`).
   - Clean root layout structure with unified providers (`AuthProvider`, `FavoritesProvider`).
   - Dynamic parameters and search query processing (`params`, `searchParams`).

2. **Server-Rendered Product Detail (`/products/[id]`)**:
   - Fully server-rendered with `data-testid="product-detail"`, `detail-name`, `detail-price`, `detail-description`, `detail-category`, and `link-back`.
   - Dynamic per-product `<title>` metadata (`<name> | Windy`).
   - Pre-rendered at build time with `generateStaticParams`.
   - Returns HTTP 404 with custom `not-found` page for invalid product IDs.

3. **URL-Driven Search & Category Filtering (`/`)**:
   - Server Component reading `searchParams` (`q`, `category`).
   - Standard HTML GET form (`search-input`, `category-select`, `btn-search`).
   - Direct server-rendered product cards matching search criteria; displays `no-results` when no matches are found.

4. **API Routes (Route Handlers)**:
   - `GET /api/products`: Returns full product array; supports case-insensitive `?q=` text filter and `?category=` filter.
   - `GET /api/products/[id]`: Returns single product JSON object; returns HTTP 404 with `{ "error": "Not found" }` for unknown IDs.

5. **Supabase Favorites & Row Level Security (RLS)**:
   - Backed by Supabase `public.favorites` table with strict authenticated RLS policies (`read own`, `insert own`, `delete own`).
   - Context built with `useReducer` managing `SET`, `ADD`, `REMOVE` actions.
   - Optimistic UI updates with automatic rollback upon backend failure.
   - Favorite heart button (`btn-favorite`) with `aria-pressed` state and redirection to `/login` for unauthenticated visitors.

6. **Protected Favorites & Account Routes**:
   - `/favorites`: displays `favorites-page`, `favorite-item` list, or `favorites-empty` fallback.
   - Header shows `link-favorites` with real-time `favorites-count` badge for authenticated users.
   - Full Lab 3 Auth carryover: `/account`, `/login`, `/register`.

7. **Error & Loading Boundaries**:
   - `app/loading.jsx`: loading UI with `data-testid="loading"`.
   - `app/error.jsx`: client error boundary with `data-testid="error-boundary"` and retry button `data-testid="btn-retry"`.
   - `app/not-found.jsx`: 404 error page with `data-testid="not-found"`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://jmerauzuflwenwxvtzml.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm run start
```
