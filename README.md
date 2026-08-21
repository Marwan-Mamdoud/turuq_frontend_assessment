# Warehouse Moderator App
 
A simple, clean Next.js application built for a Warehouse Moderator to view and
manage product details efficiently. Built as part of the Turuq Frontend Technical
Assessment.
 
## Tech Stack
 
- **Next.js (App Router)** with TypeScript
- **Server Components** for data fetching, **Server Actions** for mutations
- **Tailwind CSS** for styling
- **Radix UI / shadcn/ui** for accessible base components
- **Framer Motion** for animations
- **next-intl** for Arabic / English translations + RTL support
- **Lucide React** for icons
## Features
 
- 5 personal info cards on the root page (`/`)
- Persistent side navigation with a link to `/products`
- Products list page (`/products`) fetching live data from a mock API, with
  search, variant, and price-range filtering
- Product details page (`/products/[id]`) with an editable form that updates
  the summary at the top on submit
- Dark / light mode, persisted via cookies (read server-side — no theme flash)
- Arabic / English language toggle with full RTL layout support, also
  persisted via cookies
- Responsive design (mobile, tablet, desktop)
- Page and component animations throughout
## Prerequisites
 
- Node.js 18.17 or later
- npm, pnpm, or yarn
## Getting Started
 
1. **Clone the repository**
```bash
   git clone https://github.com/Marwan-Mamdoud/turuq_frontend_assessment.git
   cd warehouse-moderator-app
```
 
2. **Install dependencies**
```bash
   npm install
```
 
3. **Environment variables**
   Create a `.env.local` file in the project root:
```env
   NEXT_PUBLIC_PRODUCTS_API_URL=https://6776992512a55a9a7d0c4868.mockapi.io/products
```
 
4. **Run the development server**
```bash
   npm run dev
```
 
5. Open [http://localhost:3000](http://localhost:3000) in your browser.
## Available Scripts
 
| Command         | Description                          |
|-----------------|---------------------------------------|
| `npm run dev`   | Runs the app in development mode      |
| `npm run build` | Builds the app for production         |
| `npm run start` | Runs the built app in production mode |
| `npm run lint`  | Runs ESLint                           |
 
## Project Structure
 
```
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout — reads theme/locale cookies
│   │   ├── page.tsx             # Root page — 5 info cards
│   │   ├── products/
│   │   │   ├── page.tsx         # Products list (Server Component)
│   │   │   ├── loading.tsx      # Skeleton loading state
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Product details + edit form
│   ├── actions/                 # Server Actions (theme, locale, product update)
├── components/
│   ├── ui/                      # Radix/shadcn base components
│   ├── info-card.tsx
│   ├── side-nav.tsx
│   ├── product-card.tsx
│   ├── product-filters.tsx
│   ├── theme-toggle.tsx
│   └── language-toggle.tsx
├── data/
│   └── personal-info.ts         # Static data for the 5 info cards
├── messages/
│   ├── en.json                  # English translations
│   └── ar.json                  # Arabic translations
├── lib/
│   └── ...                      # Utility functions
└── README.md
```
# Implementation Notes

* **Theme & language persistence:** Both dark/light mode and the active locale are stored in cookies and read server-side in the root layout before the first paint, avoiding any flash of incorrect theme or direction.
* **Filtering:** The products list is fetched once on the server; filtering by name, variant, and price range happens client-side against that data set.
* **RTL:** When Arabic is active, the layout switches to `dir="rtl"` and uses CSS logical properties throughout, so spacing and the side navigation correctly mirror.

## Challenges

* **Product API limitation:** The provided MockAPI endpoint did not reliably support fetching a single product by ID. Calling `/products/:id` returned `"Not found"`, while using the `?id=` query parameter could return multiple products with similar IDs (for example, requesting `id=1` could also return products with IDs `10`, `11`, `12`, etc.).
* **Resolution:** To handle this limitation reliably, the implementation retrieves the available product data and performs an exact ID match in the application, ensuring that the correct product is selected for the `/products/[id]` page.

## Live Demo

https://turuqfrontendassessment.vercel.app/

