# Production Analytics Dashboard

A modern SaaS analytics dashboard built with Next.js App Router, React 19, TypeScript, and Tailwind CSS. The application provides comprehensive analytics, order management, customer metrics, and real-time activity tracking tailored for high-volume commerce platforms.

## Live Demo

* Production Deployment: https://products-analysis-dashboard.vercel.app

## Design System: Neo-Brutalism

The user interface implements a strict Neo-Brutalism design aesthetic. This design language provides high contrast, distinct visual hierarchy, and structural clarity:

1. Zero Border Radius: All cards, containers, inputs, buttons, badges, tables, and modal dialogs use completely square corners (0px border radius) without soft curves.
2. Distinct High-Contrast Borders: Solid 2px black borders enclose every structural component, establishing clear visual boundaries and grid-like division.
3. Saturated Color Blocking: Intentional, high-contrast block background colors (such as vibrant yellow, soft pink, mint cyan, and crisp white) define functional sections, avoiding gradients or subtle blurs.
4. Typography Pairing: Bold monospace typography (Space Mono) is utilized for technical headers, values, metric counters, and uppercase labels, paired with Inter sans-serif for readable body copy.
5. High-Impact Interactive Elements: Buttons follow sharp brutalist styling with solid black fills, inverted white bold typography, and flat tactile states without artificial drop-shadow blurs.
6. Raw Visual Data Representation: Charts and graphs use solid strokes and discrete flat bar elements that mirror the mechanical, functional brutalist aesthetic.

## Key Features

### Overview Dashboard
* Key Performance Indicator (KPI) grid displaying Total Revenue, Total Orders, Active Customers, and Conversion Rate with historical trend indicators.
* Revenue Trend interactive area chart with formatted currency tooltips.
* Orders Volume bar chart showing daily order distribution.
* Recent Orders table with real-time customer and payment status badges.
* Live Activity Feed detailing recent customer registrations, order placements, and system events.

### Orders Management Page
* Full-text search across customer names, emails, and order identifiers.
* Multi-status filtering (Pending, Processing, Shipped, Delivered, Cancelled).
* Date range filtering for custom time window analytics.
* Server-synchronized URL pagination and pageSize controls.
* Slide-over Order Details Sheet providing itemized breakdowns, customer contact data, shipping addresses, and status history.

### Resilience and User Experience States
* Skeleton loading placeholders mirroring exact component dimensions for smooth transitions.
* Dedicated empty states with actionable reset triggers when query results return empty.
* Isolated error boundaries for resilient fault containment without crashing the layout.
* Responsive layouts engineered for mobile, tablet, and desktop viewports.

## Architectural Foundation

### Server Components vs Client Components Split
The application enforces a clear boundary between Server Components and Client Components to maximize initial page performance and minimize JavaScript bundle overhead:
* Server Components (Default): Pages such as `app/(dashboard)/page.tsx` and `app/(dashboard)/orders/page.tsx` execute exclusively on the server. They handle initial data retrieval, process search parameters, and render static structures directly to HTML.
* Client Components (`'use client'`): Isolated strictly to components requiring browser event listeners, interactive state, charts, or browser APIs. Examples include `RevenueChart`, `OrdersChart`, `OrdersToolbar`, `OrdersPagination`, and `OrderDetailsSheet`.

### API Service Layer and Data Flow
UI components never query the filesystem, raw JSON files, or database mock files directly:
* Mock Database: Stored under `src/data/mock/` simulating production datasets for customers, orders, and system activities.
* Route Handlers: Next.js API endpoints (`src/app/api/*`) handle filtering, pagination, date parsing, and sorting logic, returning standard JSON contracts.
* Service Layer: Decoupled service modules (`orders.service.ts`, `analytics.service.ts`, `activities.service.ts`) interact through a centralized `apiClient` utility that standardizes error handling and response normalization.

### URL as Single Source of Truth for State
The orders management interface utilizes query parameters (`searchParams`) rather than local React component state or external global state stores:
* Filter state, search queries, and active page numbers persist inside the URL string.
* Allows deep linking, browser back and forward history navigation, and seamless page refreshing without lost state.

## Performance Optimization: useMemo and useCallback

The project adheres strictly to performance guidelines, avoiding speculative optimization and reserving hooks specifically for expensive computations or reference stability.

### useMemo Usage

1. `src/components/dashboard/RevenueChart.tsx` (Line 22)
* Purpose: Transforms raw time-series objects into formatted display coordinates and calendar date strings (`toLocaleDateString`) consumed by Recharts.
* Rationale: Date parsing and object projection are computationally demanding when dealing with multi-point time series. Memoizing the calculation prevents recalculating formatting logic on parent re-renders when the `data` reference remains identical.

2. `src/components/dashboard/OrdersChart.tsx` (Line 23)
* Purpose: Prepares daily order counts and date labels for the bar visualization.
* Rationale: Eliminates redundant array transformations and date allocations during dashboard UI interactions that do not modify the raw series input.

### useCallback Usage

1. `src/lib/hook/useOrderFilters.ts` (Line 20: `updateFilters`)
* Purpose: Generates and updates URL query parameters through Next.js navigation primitives (`useRouter`, `usePathname`, `useSearchParams`).
* Rationale: Passed down into interactive filter components (`OrdersToolbar`, search input, date pickers, select dropdowns). Memoizing ensures that `updateFilters` retains a stable function reference across render cycles, preventing unnecessary child component re-renders.

2. `src/lib/hook/useOrderFilters.ts` (Line 40: `resetFilters`)
* Purpose: Clears all applied filters and resets the route back to the base path.
* Rationale: Guarantees a persistent callback identity when bound to reset buttons and empty state resolution triggers.

## Project Directory Structure

```text
product-dashboard/
├── public/                             Static assets and favicon resources
├── src/
│   ├── app/                            Next.js App Router layer
│   │   ├── (dashboard)/                Dashboard route group
│   │   │   ├── orders/                 Orders management views
│   │   │   │   ├── error.tsx           Scoped orders error boundary
│   │   │   │   ├── loading.tsx         Orders page loading skeleton
│   │   │   │   └── page.tsx            Server component orders page
│   │   │   ├── error.tsx               Scoped dashboard error boundary
│   │   │   ├── layout.tsx              Dashboard shell layout (Sidebar and Topbar)
│   │   │   ├── loading.tsx             Dashboard overview skeleton loader
│   │   │   └── page.tsx                Server component overview dashboard
│   │   ├── api/                        Next.js API Route Handlers (Mock backend API)
│   │   │   ├── activities/             System activities endpoints
│   │   │   ├── analytics/              Analytics summary and time series endpoints
│   │   │   └── orders/                 Orders filtering, sorting, and detail endpoints
│   │   ├── favicon.ico                 Application icon
│   │   ├── globals.css                 Global styles, theme tokens, and brutalist rules
│   │   └── layout.tsx                  Root application layout and font configurations
│   ├── components/                     Modular UI component hierarchy
│   │   ├── dashboard/                  Overview dashboard cards, charts, and feed widgets
│   │   │   ├── ActivityFeed.tsx        System event stream component
│   │   │   ├── OrdersChart.tsx         Orders volume bar chart component
│   │   │   ├── RecentOrdersTable.tsx   Latest orders overview table
│   │   │   ├── RevenueChart.tsx        Revenue time-series area chart
│   │   │   ├── StatCard.tsx            Individual KPI metric display card
│   │   │   └── StatCardGrid.tsx        Grid container for primary metric cards
│   │   ├── orders/                     Orders domain components
│   │   │   ├── OrderDetailsSheet.tsx   Side drawer for detailed order information
│   │   │   ├── OrdersPagination.tsx    Pagination controls synced with URL state
│   │   │   ├── OrdersTable.tsx         Data table displaying filtered orders
│   │   │   ├── OrderStatusBadge.tsx    Neo-brutalist styled order status badges
│   │   │   └── OrdersToolbar.tsx       Search, status, and date filtering controls
│   │   ├── shared/                     Reusable UX state components
│   │   │   ├── skeletons/              Loading skeleton components
│   │   │   ├── EmptyState.tsx          Empty query result placeholder
│   │   │   └── ErrorState.tsx          Error fallback display component
│   │   └── ui/                         Base design system primitives (shadcn based)
│   │       ├── layout/                 Shell layout components (Sidebar, Topbar, PageHeader)
│   │       ├── badge.tsx               Badge primitive
│   │       ├── button.tsx              Button primitive with brutalist variants
│   │       ├── dialog.tsx              Modal dialog primitive
│   │       ├── input.tsx               Input primitive with sharp borders
│   │       ├── sheet.tsx               Sheet drawer primitive
│   │       ├── table.tsx               Table structure primitives
│   │       └── ...                     Additional atomic UI elements
│   ├── data/
│   │   └── mock/                       Mock database JSON files
│   │       ├── activities.json         System activities seed data
│   │       ├── customers.json          Customer records seed data
│   │       └── orders.json             Orders records seed data
│   └── lib/                            Core logic, services, and utilities
│       ├── api/                        Client service layer for HTTP communication
│       │   ├── activities.service.ts   Activities service methods
│       │   ├── analytics.service.ts    Analytics service methods
│       │   ├── client.ts               Base API client and error interceptors
│       │   └── orders.service.ts       Orders service methods
│       ├── hook/                       Custom React hooks
│       │   ├── useDebouncedValue.ts    Search input debounce hook
│       │   └── useOrderFilters.ts      URL search parameters synchronization hook
│       ├── transformers/               Data mapping and formatting functions
│       │   ├── formatCurrency.ts       Currency formatting utility
│       │   ├── formatDate.ts           Date formatting utility
│       │   └── mapOrderStatus.ts       Status badge mapping utility
│       ├── types/                      TypeScript domain interfaces and type definitions
│       └── utils.ts                    Classname concatenation helper
├── components.json                     shadcn component registry configuration
├── package.json                        Project dependencies and build scripts
├── postcss.config.mjs                  PostCSS configuration for Tailwind CSS
├── tsconfig.json                       TypeScript compiler configuration
└── README.md                           Project documentation
```

## Getting Started

### Prerequisites
* Node.js version 18.18 or higher (Node.js 20 LTS recommended)
* npm, pnpm, or yarn package manager

### Installation Steps

1. Clone the repository to your local machine:
```bash
git clone https://github.com/Anthic/products-analysis-dashboard.git
cd products-analysis-dashboard
```

2. Install project dependencies:
```bash
npm install
```

3. Configure environment variables (optional for local mock mode):
If deploying or integrating with an external endpoint, create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Launch the local development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```text
http://localhost:3000
```

## Available Scripts

* `npm run dev`: Starts the local Next.js development server with hot module reloading.
* `npm run build`: Compiles the TypeScript codebase and produces the optimized production build.
* `npm run start`: Runs the compiled production server.
* `npm run lint`: Executes ESLint to check for code quality and syntax issues.
