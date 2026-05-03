# CMS Phase 2 Tasks

- [x] **1. Supabase Schema Updates**
  - [x] Add `site_settings` table (Theming, Config, Contacts).
  - [x] Add `services` table.
  - [x] Add `gallery` table.
  - [x] Create SQL migration script (`supabase_schema_v2.sql`).

- [x] **2. Data Layer Updates**
  - [x] Update `src/lib/api.ts` with CRUD operations for settings, services, and gallery.
  - [x] Update `SiteContext.tsx` to fetch and store `settings`, `services`, and `gallery` globally.

- [x] **3. Dynamic Theming Integration**
  - [x] Inject `primary_color` dynamically into the document root.
  - [x] Update background media and overlay opacity dynamically in sections based on `settings`.

- [x] **4. CMS Dashboard UI (`Dashboard.tsx`)**
  - [x] Build "General Settings" tab (Color Picker, Sliders, Contact info).
  - [x] Build "Services" tab (CRUD for services).
  - [x] Build "Gallery" tab (CRUD for gallery items).

- [x] **5. Dynamic Frontend Integration**
  - [x] Update `ServicesSection.tsx` to consume dynamic data.
  - [x] Update `GallerySection.tsx` to consume dynamic data.
  - [x] Ensure static fallback works flawlessly.

- [x] **6. Layout & Aesthetic Refinement**
  - [x] Implement spacing tokens and cinematic utilities in `index.css`.
  - [x] Enhance separation and layering in `ServicesSection`.
  - [x] Improve "Sticky" layering and device contrast in `ProductsSection`.
  - [x] Enhance `InteractiveCard` depth and header contrast in `GallerySection`.

- [x] **7. Final Adaptation & Quality Pass**
  - [x] Implement fluid typography using `clamp()` for smooth device transitions.
  - [x] Optimize sticky stacking for mobile viewports.
  - [x] Fix featured showcase aspect ratios on small screens.
  - [x] Ensure all interactive targets meet touch accessibility standards.
  - [x] Global layout audit for RTL and LTR parity.
