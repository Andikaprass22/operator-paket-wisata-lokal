# Jelajah Lombok — Landing Page Operator Paket Wisata (Template) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun template landing page profesional untuk operator paket wisata lokal (Vite + React + TypeScript + Tailwind v4) dengan lapisan konten terpisah, filter berfungsi, integrasi WhatsApp berisi nama paket/tanggal/peserta, dan formulir permintaan trip dengan konfirmasi jelas.

**Architecture:** Tiga lapisan terpisah — `src/content/**` (data bertipe, tanpa React), `src/lib/**` (fungsi murni teruji), dan `src/components|pages/**` (tampilan). Dua route: `/` (landing dengan seluruh section) dan `/paket/:slug` (detail paket). Styling dengan token `@theme` Tailwind v4 agar mudah di-re-skin.

**Tech Stack:** Vite 8, React 19, TypeScript 5.9, Tailwind CSS v4, React Router 7, Vitest 5, ESLint 9.

**Spec:** `docs/superpowers/specs/2026-10-05-operator-paket-wisata-lokal-design.md`

## Global Constraints

- Node v25.8.1, npm 11.11.0.
- **Shell default `NODE_ENV=production`** → SETIAP `npm install` harus memakai `--include=dev`, jika tidak devDependencies (vite, tsc, vitest, eslint) tidak terpasang.
- TypeScript dipin `~5.9.3`. **Jangan** naikkan ke 6/7 — `typescript-eslint@8` membatasi `typescript <6.1.0`.
- `@vitejs/plugin-react@6` mensyaratkan `vite ^8`. Tailwind v4 via plugin `@tailwindcss/vite`; tema lewat blok `@theme` di `src/index.css` (tanpa `tailwind.config.js`).
- `verbatimModuleSyntax: true` → impor khusus tipe WAJIB `import type`.
- `noUnusedLocals` + `noUnusedParameters` aktif → tidak boleh ada variabel/parameter tak terpakai.
- `src/vite-env.d.ts` berisi `/// <reference types="vite/client" />` harus ada sebelum impor CSS.
- Seluruh teks UI berbahasa Indonesia. **Tidak ada teks bisnis yang di-hardcode di komponen** — semua dari `src/content/**`.
- **Tidak boleh ada tautan kosong** (`href=""`, `href="#"`) maupun tombol tanpa aksi.
- **Tidak boleh** menyajikan jadwal/harga/ulasan/ketersediaan seolah terverifikasi. Semua data contoh dilabeli ("contoh").
- `formatRupiah` = `"Rp" + new Intl.NumberFormat("id-ID").format(n)` (bukan `style:"currency"`, yang menyisipkan NBSP).
- `formatTanggal` memakai `new Date(iso + "T00:00:00")` (waktu lokal, agar tidak bergeser sehari).
- Verifikasi tiap task: `npm run test`, `npm run lint`, `npm run build`.
- Commit kecil per task memakai trailer `Co-authored-by: CommandCodeBot <noreply@commandcode.ai>`.

## Review Focus

Kondisi yang mudah bocor dan tidak otomatis tertutup oleh test komponen:

1. Tanggal lampau, atau peserta 0 / melebihi kapasitas paket pada formulir → harus ditolak dengan pesan jelas, bukan diterima diam-diam.
2. Kombinasi filter tanpa hasil → keadaan kosong dengan tombol "Reset filter", bukan grid kosong bisu.
3. Nomor WhatsApp tidak valid/kosong di `site.ts` → tombol dinonaktifkan dengan keterangan, bukan tautan mati.
4. Slug detail paket tidak dikenal → halaman "paket tidak ditemukan" dengan jalan kembali ke daftar.
5. Path gambar hilang/gagal dimuat → fallback placeholder netral, bukan gambar rusak.

Test untuk masing-masing kondisi ditambahkan pada task yang memiliki kodenya (lihat Review Focus mapping di Task 5, 6, 7, 8, 11, 16).

---

## Task 1: Scaffold proyek, tema, dan shell router

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `.gitignore`, `src/vite-env.d.ts`, `src/index.css`, `src/main.tsx`, `src/App.tsx`, `src/pages/HomePage.tsx`, `src/pages/PackageDetailPage.tsx`

**Interfaces:**
- Produces: aplikasi Vite+React+TS+Tailwind yang bisa `build`; route `/` → `HomePage`, `/paket/:slug` → halaman sementara. Token tema Tailwind: `deep-950 #06282f`, `deep-900 #0b3d4a`, `deep-700 #0f5566`, `lagoon-500 #16a3b8`, `lagoon-300 #7fd6e0`, `sand-50 #fbf8f2`, `sand-100 #f4efe6`, `sand-200 #e7dfd0`, `charcoal #1c2b2e`, `coral-500 #ff6b4a`, `coral-600 #e8542f`; font `--font-display` (Fraunces Variable) dan `--font-sans` (Plus Jakarta Sans Variable).

- [ ] **Step 1: Inisialisasi repo git**

Run: `git init`
Expected: repositori git baru tanpa error.

- [ ] **Step 2: Tulis `package.json` dengan versi terkunci**

```json
{
  "name": "jelajah-lombok-template",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "test": "vitest run",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fontsource-variable/fraunces": "^5.3.0",
    "@fontsource-variable/plus-jakarta-sans": "^5.3.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "react-router-dom": "^7.18.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.5",
    "@tailwindcss/vite": "^4.3.3",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.1",
    "eslint": "^9.39.5",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.7",
    "globals": "^17.13.0",
    "tailwindcss": "^4.3.3",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.71.0",
    "vite": "^8.3.2",
    "vitest": "^5.0.3"
  }
}
```

- [ ] **Step 3: Tulis file konfigurasi**

`vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

`src/vite-env.d.ts` (WAJIB — tanpa ini `tsc` gagal pada `import "./index.css"`):
```ts
/// <reference types="vite/client" />
```

`tsconfig.json` (references `./tsconfig.app.json` + `./tsconfig.node.json`; `files: []`). `tsconfig.app.json` untuk `src` dan `tsconfig.node.json` untuk `vite.config.ts`, keduanya dengan `"strict": true`, `"moduleResolution": "bundler"`, `"verbatimModuleSyntax": true`, `"noEmit": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`, `"jsx": "react-jsx"`, `"lib": ["ES2022","DOM","DOM.Iterable"]` (`tsconfig.node.json` pakai `ES2023`/`["ES2023"]`).

`eslint.config.js` memakai flat config: `tseslint.config({ ignores: ["dist"] }, { extends: [js.configs.recommended, ...tseslint.configs.recommended], files: ["**/*.{ts,tsx}"], languageOptions: { ecmaVersion: 2022, globals: globals.browser }, plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh }, rules: { ...reactHooks.configs.recommended.rules, "react-refresh/only-export-components": ["warn", { allowConstantExport: true }] } })`.

`.gitignore`: `node_modules`, `dist`, `coverage`, `*.local`, `*.tsbuildinfo`, `.vite`.

- [ ] **Step 4: Tulis `src/index.css` dengan token tema**

```css
@import "tailwindcss";

@theme {
  --color-deep-950: #06282f;
  --color-deep-900: #0b3d4a;
  --color-deep-700: #0f5566;
  --color-lagoon-500: #16a3b8;
  --color-lagoon-300: #7fd6e0;
  --color-sand-50: #fbf8f2;
  --color-sand-100: #f4efe6;
  --color-sand-200: #e7dfd0;
  --color-charcoal: #1c2b2e;
  --color-coral-500: #ff6b4a;
  --color-coral-600: #e8542f;

  --font-display: "Fraunces Variable", Georgia, serif;
  --font-sans: "Plus Jakarta Sans Variable", system-ui, sans-serif;
}

html { scroll-behavior: smooth; }
body { @apply bg-sand-50 font-sans text-charcoal antialiased; }
```

- [ ] **Step 5: Tulis `index.html`, `src/main.tsx`, `src/App.tsx`, `src/pages/HomePage.tsx`**

`index.html`: `lang="id"`, `<div id="root">`, script `/src/main.tsx`, `<title>` dan meta description Bahasa Indonesia (nilai sementara, diganti di Task 17).

`src/main.tsx`: impor `@fontsource-variable/fraunces`, `@fontsource-variable/plus-jakarta-sans`, `./index.css`; render `<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>`.

`src/App.tsx`: `Routes` dengan `/` → `HomePage` dan `/paket/:slug` → `PackageDetailPage`.

`src/pages/HomePage.tsx` dan `src/pages/PackageDetailPage.tsx`: keduanya sementara mengembalikan `<main className="p-8">…</main>` (diisi pada Task 15 dan Task 16).

- [ ] **Step 6: Install dependensi (termasuk dev)**

Run: `npm install --include=dev`
Expected: exit 0, ratusan paket terpasang (bukan hanya 9).

- [ ] **Step 7: Verifikasi build dan lint**

Run: `npm run build`
Expected: `tsc -b` tanpa error, `vite build` sukses, menghasilkan `dist/`.

Run: `npm run lint`
Expected: 0 error.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -F - <<'EOF'
chore: scaffold Vite + React + TS + Tailwind v4

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 2: Aset artwork SVG demo

**Files:**
- Create: `public/favicon.svg`, `public/images/hero-rinjani.svg`, `public/images/gili-trawangan.svg`, `public/images/rinjani-trek.svg`, `public/images/sade-village.svg`, `public/images/pink-beach.svg`, `public/images/sendang-gile.svg`, `public/images/kuta-mandese.svg`, `public/images/lombok-lengkap.svg`, `public/images/guide-portrait.svg`, `public/images/placeholder.svg`

**Interfaces:**
- Produces: aset gambar lokal yang direferensikan `src/content/**` sebagai `/images/<nama>.svg`, plus `public/favicon.svg`. Tidak ada dependensi jaringan.

- [ ] **Step 1: Tulis satu SVG contoh lengkap (`public/images/hero-rinjani.svg`)**

Resep yang harus diikuti: `viewBox="0 0 1200 800"`, `preserveAspectRatio="xMidYMid slice"`, tanpa `<image>`. Susun berlapis: langit gradien (`deep-900` → `lagoon-500`), cakram matahari (`coral-500`, opacity 0.9), siluet punggungan Rinjani bertingkat (2–3 lapis, `deep-950` dengan opacity berbeda), garis kontur topografi tipis (`lagoon-300`, opacity 0.25), lalu baris band ombak (`sand-50`, opacity 0.15). Sisipkan label kecil di sudut: `<text ...>Foto contoh</text>` (`sand-50`, font-size 18, opacity 0.7).

- [ ] **Step 2: Tulis 8 SVG destinasi + `guide-portrait.svg` + `placeholder.svg`**

Ikuti resep Step 1 tetapi ubah komposisi agar tiap destinasi berbeda (mis. band bawah laut untuk Gili, terasering untuk Sade, pasir merah muda untuk Pink Beach, air terjun vertikal untuk Sendang Gile, bukit sabana untuk Kuta Mandese, itinerary 4 hari sebagai panel bertumpuk untuk Lombok Lengkap). `guide-portrait.svg` berdimensi `600x600` (potret siluet pemandu). `placeholder.svg` adalah versi netral `1200x800` bergradien sand dengan label "Gambar belum tersedia". `public/favicon.svg` berdimensi `64x64`: cakram `deep-900` dengan monogram "JL" `sand-50`.

- [ ] **Step 3: Verifikasi aset ikut ter-build**

Run: `npm run build`
Expected: sukses; `dist/images/` berisi seluruh SVG.

- [ ] **Step 4: Commit**

```bash
git add public/images
git commit -F - <<'EOF'
feat: add local demo destination artwork

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 3: Lapisan konten + test integritas data

**Files:**
- Create: `src/content/types.ts`, `src/content/site.ts`, `src/content/packages.ts`, `src/content/gallery.ts`, `src/content/reviews.ts`, `src/content/operator.ts`, `src/content/travelInfo.ts`, `src/content/faq.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Produces (diekspor, dipakai task lain):
  - dari `types.ts`: `ActivityType`, `DurationBucket`, `Money`, `ItineraryStop`, `Package`, `GalleryItem`, `Review`, `OperatorProfile`, `TravelInfoBlock`, `FaqItem`, `SiteConfig`
  - dari `site.ts`: `export const site: SiteConfig`
  - dari `packages.ts`: `export const packages: Package[]`
  - dari `gallery.ts`: `export const galleryItems: GalleryItem[]`
  - dari `reviews.ts`: `export const reviews: Review[]`
  - dari `operator.ts`: `export const operatorProfile: OperatorProfile`
  - dari `travelInfo.ts`: `export const travelInfo: TravelInfoBlock[]`
  - dari `faq.ts`: `export const faqItems: FaqItem[]`

- [ ] **Step 1: Tulis `types.ts`**

Salin definisi dari spec §6 apa adanya (`Package` dengan `slug`, `title`, `summary`, `destination`, `durationDays`, `durationLabel`, `price: Money`, `priceNote`, `activityTypes: ActivityType[]`, `schedule: string[]`, `meetingPoint`, `minParticipants`, `maxParticipants`, `seatsNote`, `heroImage`, `galleryImages`, `highlights`, `itinerary: ItineraryStop[]`, `facilities`, `included`, `excluded`, `isDemo?`). `ActivityType` = `"pantai" | "gunung" | "budaya" | "bahari" | "kuliner"`. `DurationBucket` = `"1hari" | "23hari" | "4hari+"`.

- [ ] **Step 2: Tulis test integritas yang gagal**

`src/content/content.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { packages } from "./packages";
import { galleryItems } from "./gallery";
import { reviews } from "./reviews";
import { faqItems } from "./faq";
import { site } from "./site";

describe("integritas konten", () => {
  it("slug paket unik", () => {
    const slugs = packages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("setiap paket punya gambar & isi wajib", () => {
    for (const p of packages) {
      expect(p.heroImage.startsWith("/images/")).toBe(true);
      expect(p.galleryImages.length).toBeGreaterThan(0);
      for (const img of [p.heroImage, ...p.galleryImages]) {
        expect(img.startsWith("/images/")).toBe(true);
      }
      expect(p.itinerary.length).toBeGreaterThan(0);
      expect(p.included.length).toBeGreaterThan(0);
      expect(p.excluded.length).toBeGreaterThan(0);
      expect(p.activityTypes.length).toBeGreaterThan(0);
      expect(p.maxParticipants).toBeGreaterThanOrEqual(p.minParticipants);
      expect(p.minParticipants).toBeGreaterThanOrEqual(1);
    }
  });

  it("nomor whatsapp hanya berisi digit", () => {
    expect(site.whatsappNumber).toMatch(/^\d+$/);
  });

  it("ulasan selalu bertanda demo", () => {
    for (const r of reviews) expect(r.isDemo).toBe(true);
  });

  it("id galeri dan faq unik", () => {
    expect(new Set(galleryItems.map((g) => g.id)).size).toBe(galleryItems.length);
    expect(new Set(faqItems.map((f) => f.id)).size).toBe(faqItems.length);
  });
});
```

- [ ] **Step 3: Jalankan test, pastikan GAGAL**

Run: `npm test`
Expected: FAIL — modul `./packages` dan lain-lain belum ada.

- [ ] **Step 4: Isi `site.ts`**

`businessName: "Jelajah Lombok"`, `logoMark: "JL"`, `tagline` singkat, `region: "Lombok, Nusa Tenggara Barat"`, `whatsappNumber: "628123456789"`, `email`, `phoneDisplay`, `address`, `socials` (minimal Instagram + Facebook dengan URL absolut yang valid, mis. `https://instagram.com/jelajahlombok`), `nav` berisi tepat: `#beranda`, `#paket`, `#galeri`, `#operator`, `#ulasan`, `#informasi`, `#faq`, `#formulir`, dan `demoNotice` berisi teks contoh.

- [ ] **Step 5: Isi `packages.ts` dengan 7 paket contoh**

Isi kolom berikut persis; sisanya (summary, schedule, itinerary, facilities, included/excluded, meetingPoint, highlights, priceNote, seatsNote) ditulis sebagai konten contoh yang wajar dalam Bahasa Indonesia, dan setiap `priceNote` menyatakan "harga contoh".

| slug | title | destination | hari | harga/orang | activityTypes | gambar |
|------|-------|-------------|------|-------------|---------------|--------|
| `gili-trawangan-air` | Gili Trawangan & Gili Air Escape | Gili Trawangan, Lombok Utara | 2 | 1850000 | bahari, pantai | gili-trawangan.svg |
| `rinjani-sembalun-summit` | Rinjani Sembalun Summit Trek | Taman Nasional Gunung Rinjani | 3 | 4350000 | gunung | rinjani-trek.svg |
| `sade-village-culture` | Sasak Culture & Sade Village | Sade, Lombok Tengah | 1 | 650000 | budaya | sade-village.svg |
| `pink-beach-gili-petelu` | Pink Beach & Gili Petelu Hop | Pink Beach, Lombok Timur | 1 | 950000 | bahari, pantai | pink-beach.svg |
| `sendang-gile-waterfall` | Sendang Gile & Tiu Kelep | Senaru, Lombok Utara | 1 | 750000 | gunung | sendang-gile.svg |
| `kuta-mandese-sunset` | Kuta Mandalika & Bukit Merese | Kuta Mandalika, Lombok Tengah | 1 | 550000 | pantai, kuliner | kuta-mandese.svg |
| `lombok-lengkap-4d` | Lombok Lengkap 4 Hari 3 Malam | Lombok (lintas wilayah) | 4 | 5750000 | pantai, gunung, budaya, bahari | lombok-lengkap.svg |

Jadwal (`schedule`) minimal 3 tanggal contoh per paket. `seatsNote` menyatakan kuota contoh.

- [ ] **Step 6: Isi `gallery.ts`, `reviews.ts`, `operator.ts`, `travelInfo.ts`, `faq.ts`**

- `galleryItems`: 8–10 item, `src` menunjuk `/images/*.svg`, dengan `caption` dan `alt` deskriptif.
- `reviews`: 5–6 ulasan contoh, semuanya `isDemo: true`, dengan label `tripLabel` yang merujuk paket nyata.
- `operatorProfile`: 1 profil pemandu (nama, peran, bio, `yearsExperience`, `languages`, `photo: "/images/guide-portrait.svg"`, `certifications`).
- `travelInfo`: 4 blok — transportasi (`icon: "plane"`), cuaca (`"sun"`), persiapan barang (`"bag"`), keamanan/asuransi (`"shield"`).
- `faqItems`: 6 pertanyaan (pembayaran, pembatalan, cuaca/ musim, privasi rombongan, penjemputan bandara, tingkat kesulitan trek).

- [ ] **Step 7: Jalankan test, pastikan LULUS**

Run: `npm test`
Expected: PASS semua.

Run: `npm run build && npm run lint`
Expected: tanpa error.

- [ ] **Step 8: Commit**

```bash
git add src/content
git commit -F - <<'EOF'
feat: add typed content layer with demo data and integrity tests

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 4: `lib/format.ts`

**Files:**
- Create: `src/lib/format.ts`
- Test: `src/lib/format.test.ts`

**Interfaces:**
- Produces: `formatRupiah(amount: number): string`, `formatTanggal(iso: string): string`

- [ ] **Step 1: Tulis test yang gagal**

```ts
import { describe, it, expect } from "vitest";
import { formatRupiah, formatTanggal } from "./format";

describe("formatRupiah", () => {
  it("tanpa pemisah desimal dan tanpa spasi setelah Rp", () => {
    expect(formatRupiah(0)).toBe("Rp0");
    expect(formatRupiah(150000)).toBe("Rp150.000");
    expect(formatRupiah(1250000)).toBe("Rp1.250.000");
    expect(formatRupiah(12500000)).toBe("Rp12.500.000");
  });
});

describe("formatTanggal", () => {
  it("memformat tanggal lokal tanpa pergeseran hari", () => {
    expect(formatTanggal("2026-11-14")).toBe("14 Nov 2026");
    expect(formatTanggal("2027-01-01")).toBe("1 Jan 2027");
  });
});
```

- [ ] **Step 2: Jalankan test, pastikan GAGAL**

Run: `npx vitest run src/lib/format.test.ts`
Expected: FAIL — modul `./format` belum ada.

- [ ] **Step 3: Implementasi `format.ts`**

`formatRupiah`: `"Rp" + new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(amount)`. **Jangan** pakai `style: "currency"` (menyisipkan NBSP). `formatTanggal`: `new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso + "T00:00:00"))`.

- [ ] **Step 4: Jalankan test, pastikan LULUS**

Run: `npx vitest run src/lib/format.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/format.ts src/lib/format.test.ts
git commit -F - <<'EOF'
feat: add currency and date formatting helpers

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 5: `lib/filters.ts`

**Files:**
- Create: `src/lib/filters.ts`
- Test: `src/lib/filters.test.ts`

**Interfaces:**
- Consumes: `Package`, `ActivityType`, `DurationBucket` dari `../content/types` (`import type`).
- Produces:
  ```ts
  export type PriceBucket = "semua" | "dibawah2jt" | "2jt-5jt" | "diatas5jt";
  export interface FilterState {
    duration: DurationBucket | "semua";
    activity: ActivityType | "semua";
    price: PriceBucket;
  }
  export const defaultFilters: FilterState;
  export function durationBucketOf(days: number): DurationBucket;
  export function matchesPriceBucket(amount: number, bucket: PriceBucket): boolean;
  export function filterPackages(packages: Package[], filters: FilterState): Package[];
  export function countActiveFilters(filters: FilterState): number;
  ```

Bucket: `durationBucketOf(1) === "1hari"`, `(2|3) === "23hari"`, `(>=4) === "4hari+"`. Harga: `dibawah2jt` bila `< 2_000_000`; `2jt-5jt` bila `>= 2_000_000 && <= 5_000_000`; `diatas5jt` bila `> 5_000_000`. `filterPackages` = AND antar kategori; `"semua"` tidak membatasi. `countActiveFilters` menghitung field yang bukan default.

- [ ] **Step 1: Tulis test yang gagal**

Gunakan helper `mk(overrides)` yang membangun `Package` minimal, lalu uji:
```ts
it("bucket durasi", () => {
  expect(durationBucketOf(1)).toBe("1hari");
  expect(durationBucketOf(2)).toBe("23hari");
  expect(durationBucketOf(3)).toBe("23hari");
  expect(durationBucketOf(4)).toBe("4hari+");
});

it("bucket harga", () => {
  expect(matchesPriceBucket(1_999_999, "dibawah2jt")).toBe(true);
  expect(matchesPriceBucket(2_000_000, "2jt-5jt")).toBe(true);
  expect(matchesPriceBucket(5_000_000, "2jt-5jt")).toBe(true);
  expect(matchesPriceBucket(5_000_001, "diatas5jt")).toBe(true);
  expect(matchesPriceBucket(150000, "semua")).toBe(true);
});

it("default tidak menyaring apa pun", () => {
  expect(filterPackages([a, b, c], defaultFilters)).toHaveLength(3);
});

it("menggabungkan kategori dengan AND", () => {
  // paket A: 1 hari, pantai, 550000 ; paket B: 3 hari, gunung, 4350000
  const f = { ...defaultFilters, duration: "1hari" as const, activity: "pantai" as const, price: "dibawah2jt" as const };
  expect(filterPackages([a, b], f)).toEqual([a]);
});

it("kombinasi tanpa kecocokan mengembalikan array kosong", () => {
  const f = { ...defaultFilters, duration: "4hari+" as const, activity: "kuliner" as const };
  expect(filterPackages([a, b], f)).toEqual([]);
});

it("menghitung filter aktif", () => {
  expect(countActiveFilters(defaultFilters)).toBe(0);
  expect(countActiveFilters({ duration: "1hari", activity: "semua", price: "dibawah2jt" })).toBe(2);
});
```

- [ ] **Step 2: Jalankan test, pastikan GAGAL**

Run: `npx vitest run src/lib/filters.test.ts`
Expected: FAIL — modul `./filters` belum ada.

- [ ] **Step 3: Implementasi `filters.ts`**

- [ ] **Step 4: Jalankan test, pastikan LULUS**

Run: `npx vitest run src/lib/filters.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/filters.ts src/lib/filters.test.ts
git commit -F - <<'EOF'
feat: add package filtering logic

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 6: `lib/whatsapp.ts`

**Files:**
- Create: `src/lib/whatsapp.ts`
- Test: `src/lib/whatsapp.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export interface WhatsAppContext {
    packageTitle?: string;
    date?: string;
    participants?: number;
    note?: string;
  }
  export function normalizePhoneNumber(raw: string): string; // digit saja; "0…"/"+62…" -> "62…"
  export function isWhatsAppConfigured(raw: string): boolean;
  export function buildWhatsAppMessage(ctx: WhatsAppContext): string;
  export function buildWhatsAppUrl(rawNumber: string, ctx: WhatsAppContext): string | null; // null bila nomor tidak valid
  ```
- `buildWhatsAppUrl` mengembalikan `null` bila `isWhatsAppConfigured` false → dipakai `WhatsAppButton` untuk menonaktifkan tombol (Review Focus #3).

- [ ] **Step 1: Tulis test yang gagal**

```ts
it("normalisasi nomor", () => {
  expect(normalizePhoneNumber("0812345678")).toBe("62812345678");
  expect(normalizePhoneNumber("+62 812-3456-78")).toBe("62812345678");
  expect(normalizePhoneNumber("62 812 3456 78")).toBe("62812345678");
});

it("validitas nomor", () => {
  expect(isWhatsAppConfigured("628123456789")).toBe(true);
  expect(isWhatsAppConfigured("")).toBe(false);
  expect(isWhatsAppConfigured("abc")).toBe(false);
});

it("pesan memuat paket, tanggal, dan peserta", () => {
  const msg = buildWhatsAppMessage({ packageTitle: "Gili Trawangan & Gili Air Escape", date: "2026-11-14", participants: 2 });
  expect(msg).toContain("Gili Trawangan & Gili Air Escape");
  expect(msg).toContain("2026-11-14");
  expect(msg).toContain("2");
});

it("field kosong tidak dipaksakan ke pesan", () => {
  const msg = buildWhatsAppMessage({ packageTitle: "Sasak Culture & Sade Village" });
  expect(msg).toContain("Sasak Culture & Sade Village");
  expect(msg).not.toContain("Tanggal");
  expect(msg).not.toContain("Peserta");
});

it("url whatsapp ter-encode dan null saat nomor tidak valid", () => {
  const url = buildWhatsAppUrl("08123456789", { packageTitle: "Rinjani Sembalun Summit Trek", date: "2026-12-01", participants: 4 });
  expect(url).not.toBeNull();
  expect(url!.startsWith("https://wa.me/628123456789?text=")).toBe(true);
  expect(url!).toContain("%20");
  expect(url!).not.toContain(" ");
  expect(buildWhatsAppUrl("", {})).toBeNull();
});
```

- [ ] **Step 2: Jalankan test, pastikan GAGAL**

Run: `npx vitest run src/lib/whatsapp.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implementasi `whatsapp.ts`**

Salam pembuka ("Halo Jelajah Lombok, saya ingin bertanya tentang paket wisata."), baris opsional `Paket: <title>`, `Tanggal perjalanan: <date>`, `Jumlah peserta: <n> orang`, catatan opsional, penutup sopan. Gabung dengan `\n`. URL: `https://wa.me/${normalizePhoneNumber(raw)}?text=${encodeURIComponent(message)}`.

- [ ] **Step 4: Jalankan test, pastikan LULUS**

Run: `npx vitest run src/lib/whatsapp.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/whatsapp.ts src/lib/whatsapp.test.ts
git commit -F - <<'EOF'
feat: add WhatsApp deep-link builder

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 7: `lib/tripRequest.ts`

**Files:**
- Create: `src/lib/tripRequest.ts`
- Test: `src/lib/tripRequest.test.ts`

**Interfaces:**
- Consumes: `formatTanggal` dari `./format`.
- Produces:
  ```ts
  export interface TripRequestInput {
    packageSlug: string; date: string; participants: number;
    name: string; contact: string; note?: string;
  }
  export type TripRequestErrors = Partial<Record<keyof TripRequestInput, string>>;
  export interface ValidateOptions { today?: Date; maxParticipants?: number; }
  export function validateTripRequest(input: TripRequestInput, options?: ValidateOptions): TripRequestErrors;
  export function buildTripRequestSummary(input: TripRequestInput, packageTitle: string): string;
  ```

- [ ] **Step 1: Tulis test yang gagal**

```ts
const base = { packageSlug: "sade-village-culture", date: "2026-12-01", participants: 2, name: "Budi", contact: "08123456789" };
const today = new Date("2026-10-05T00:00:00");

it("input valid tidak menghasilkan error", () => {
  expect(validateTripRequest(base, { today })).toEqual({});
});

it("menolak tanggal lampau", () => {
  const errs = validateTripRequest({ ...base, date: "2026-01-01" }, { today });
  expect(errs.date).toBeDefined();
});

it("menolak peserta 0, negatif, atau melebihi kapasitas", () => {
  expect(validateTripRequest({ ...base, participants: 0 }, { today, maxParticipants: 12 }).participants).toBeDefined();
  expect(validateTripRequest({ ...base, participants: -3 }, { today, maxParticipants: 12 }).participants).toBeDefined();
  expect(validateTripRequest({ ...base, participants: 99 }, { today, maxParticipants: 12 }).participants).toBeDefined();
  expect(validateTripRequest({ ...base, participants: 12 }, { today, maxParticipants: 12 }).participants).toBeUndefined();
});

it("menolak field wajib kosong", () => {
  const errs = validateTripRequest({ ...base, packageSlug: "", name: "  ", contact: "" }, { today });
  expect(errs.packageSlug).toBeDefined();
  expect(errs.name).toBeDefined();
  expect(errs.contact).toBeDefined();
});

it("menolak tanggal dan peserta kosong", () => {
  const errs = validateTripRequest({ ...base, date: "", participants: Number.NaN }, { today });
  expect(errs.date).toBeDefined();
  expect(errs.participants).toBeDefined();
});

it("ringkasan memuat paket, tanggal, dan peserta", () => {
  const s = buildTripRequestSummary(base, "Sasak Culture & Sade Village");
  expect(s).toContain("Sasak Culture & Sade Village");
  expect(s).toContain("1 Des 2026");
  expect(s).toContain("2");
});
```

- [ ] **Step 2: Jalankan test, pastikan GAGAL**

Run: `npx vitest run src/lib/tripRequest.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implementasi `tripRequest.ts`**

Pesan error Bahasa Indonesia. Tanggal lampau dibandingkan pada granularitas hari (bandingkan `new Date(date + "T00:00:00")` dengan awal hari `today`). `buildTripRequestSummary` menyusun baris "Paket: …", "Tanggal: … (hasil `formatTanggal`)", "Peserta: N orang", "Nama: …", "Kontak: …", plus catatan bila ada.

- [ ] **Step 4: Jalankan test, pastikan LULUS**

Run: `npm test`
Expected: PASS semua test (format, filters, whatsapp, tripRequest, content).

- [ ] **Step 5: Commit**

```bash
git add src/lib/tripRequest.ts src/lib/tripRequest.test.ts
git commit -F - <<'EOF'
feat: add trip request validation and summary

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 8: Primitif UI

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/SmartImage.tsx`, `src/components/ui/DemoNotice.tsx`, `src/components/ui/WhatsAppButton.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppUrl`, `WhatsAppContext` dari `../../lib/whatsapp`.
- Produces:
  ```ts
  export type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp";
  export type ButtonSize = "sm" | "md" | "lg";
  export function Button(props: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }): JSX.Element;
  export function LinkButton(props: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant; size?: ButtonSize; external?: boolean }): JSX.Element;
  export function WhatsAppButton(props: { number: string; ctx: WhatsAppContext; children: ReactNode; variant?: ButtonVariant; size?: ButtonSize; className?: string }): JSX.Element;
  export function SectionHeading(props: { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; tone?: "light" | "dark"; id?: string }): JSX.Element;
  export function Badge(props: { children: ReactNode; tone?: "neutral" | "lagoon" | "coral" | "sand" }): JSX.Element;
  export function SmartImage(props: { src: string; alt: string; className?: string; ratio?: string; fallbackLabel?: string }): JSX.Element;
  export function DemoNotice(props: { text: string; variant?: "banner" | "inline" }): JSX.Element;
  ```
- `LinkButton` dengan `external` menambah `target="_blank"` + `rel="noopener noreferrer"`.
- `WhatsAppButton` memanggil `buildWhatsAppUrl`; bila hasilnya `null`, render elemen `aria-disabled="true"` bergaya nonaktif dengan judul "Nomor WhatsApp belum diatur" (Review Focus #3).
- `SmartImage` menangani `onError` → ganti ke `/images/placeholder.svg` (Review Focus #5), `loading="lazy"`, `decoding="async"`, `alt` wajib, wrapper rasio tetap.

- [ ] **Step 1: Implementasi keenam komponen**

Gunakan token tema (`bg-deep-900`, `text-sand-50`, `bg-coral-500`, dll.) dan `focus-visible:` ring untuk aksesibilitas. Varian `whatsapp` memakai hijau `#25D366` lewat arbitrary value.

- [ ] **Step 2: Verifikasi tipe, lint, build**

Run: `npm run build && npm run lint`
Expected: tanpa error. (Komponen belum dirender; ini memastikan kontrak tipe benar.)

- [ ] **Step 3: Commit**

```bash
git add src/components/ui
git commit -F - <<'EOF'
feat: add UI primitives

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 9: Layout — Navbar, Footer, SiteLayout, ScrollToTop

**Files:**
- Create: `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/SiteLayout.tsx`, `src/components/layout/ScrollToTop.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `SiteConfig` dari `../../content/types`; `Button`, `LinkButton`; `WhatsAppContext`/`buildWhatsAppUrl` (footer).
- Produces:
  ```ts
  export function Navbar(props: { site: SiteConfig }): JSX.Element;
  export function Footer(props: { site: SiteConfig }): JSX.Element;
  export function SiteLayout(props: { site: SiteConfig; children: ReactNode }): JSX.Element;
  export function ScrollToTop(): null; // useLocation + scrollTo(0,0) saat pathname berubah
  ```

- [ ] **Step 1: Implementasi `Navbar`**

Logo (mark + `businessName`), menu dari `site.nav`, tombol "Pilih Paket" (link ke `#paket`). Navigasi anchor dihitung dari `useLocation()`: di `/` pakai `href="#paket"`, di route lain pakai `href="/#paket"` — **selalu berupa `<a>` dengan href non-kosong**. Tombol menu mobile dengan `aria-expanded`, `aria-controls`, dan menu yang bisa ditutup.

- [ ] **Step 2: Implementasi `Footer`**

Kontak: WhatsApp (via `buildWhatsAppUrl`), `mailto:` untuk email, `tel:` untuk telepon, alamat, `socials` (`target="_blank"` + `rel`). Sertakan `DemoNotice`.

- [ ] **Step 3: Implementasi `SiteLayout` + `ScrollToTop`, lalu pakai di `App.tsx`**

`SiteLayout` merender `Navbar`, `main` (children), `Footer`, dan `ScrollToTop`. `App.tsx` membungkus kedua route dengan `SiteLayout site={site}`.

- [ ] **Step 4: Verifikasi**

Run: `npm run build && npm run lint`
Expected: tanpa error.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout src/App.tsx
git commit -F - <<'EOF'
feat: add site layout, navbar, and footer

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 10: Section Hero

**Files:**
- Create: `src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `SiteConfig`; `LinkButton`, `WhatsAppButton`; `buildWhatsAppUrl`.
- Produces: `export function Hero(props: { site: SiteConfig }): JSX.Element;` — section `id="beranda"` dengan `scroll-mt-24`.

- [ ] **Step 1: Implementasi `Hero`**

Latar `SmartImage src="/images/hero-rinjani.svg"` penuh (tinggi ~`min-h-[85vh]`), overlay gradien `deep-950`. Konten: eyebrow (`site.region`), headline singkat (bukan klise), 1 kalimat pendukung, dan **dua tombol**: `LinkButton` "Lihat Paket" → `#paket`, dan `WhatsAppButton` "Tanya via WhatsApp" (ctx tanpa paket). Sertakan strip kecil berisi 3 fakta ringkas (mis. jumlah paket contoh, wilayah, respons WhatsApp) — dihitung dari `packages.length`.

- [ ] **Step 2: Verifikasi**

Run: `npm run build && npm run lint`
Expected: tanpa error.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -F - <<'EOF'
feat: add hero section

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 11: Section daftar paket (filter, kartu, grid)

**Files:**
- Create: `src/components/packages/PackageFilter.tsx`, `src/components/packages/PackageCard.tsx`, `src/components/packages/PackageGrid.tsx`

**Interfaces:**
- Consumes: `Package`, `ActivityType`, `DurationBucket`; `FilterState`, `defaultFilters`; `formatRupiah`; `Badge`, `LinkButton`, `WhatsAppButton`, `SmartImage`.
- Produces:
  ```ts
  export function PackageFilter(props: { value: FilterState; onChange: (next: FilterState) => void; resultCount: number; activeCount: number; onReset: () => void }): JSX.Element;
  export function PackageCard(props: { pkg: Package }): JSX.Element;
  export function PackageGrid(props: { packages: Package[]; onReset: () => void }): JSX.Element;
  ```
- `PackageFilter` memakai `<select>` berlabel: Durasi (`semua`, `1hari`, `23hari`, `4hari+`), Aktivitas (semua `ActivityType`), Harga (`semua`, `dibawah2jt`, `2jt-5jt`, `diatas5jt`) + tampilan `resultCount` dan tombol "Reset filter" (tampil bila `activeCount > 0`).
- `PackageCard` menampilkan foto, judul, destinasi, meta (durasi, jadwal terdekat, rentang peserta), harga via `formatRupiah` + `priceNote`, `Badge` aktivitas, tombol "Lihat Detail" (`LinkButton` ke `/paket/<slug>`) dan `WhatsAppButton` dengan ctx `{ packageTitle: pkg.title }`.
- `PackageGrid` merender grid; bila `packages.length === 0` menampilkan keadaan kosong dengan tombol "Reset filter" memanggil `onReset` (Review Focus #2).

- [ ] **Step 1: Implementasi ketiga komponen**

- [ ] **Step 2: Verifikasi**

Run: `npm run build && npm run lint`
Expected: tanpa error.

- [ ] **Step 3: Commit**

```bash
git add src/components/packages
git commit -F - <<'EOF'
feat: add package filter, card, and grid

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 12: Galeri, profil operator, dan ulasan

**Files:**
- Create: `src/components/sections/Gallery.tsx`, `src/components/sections/OperatorProfileSection.tsx`, `src/components/sections/ReviewsSection.tsx`

**Interfaces:**
- Consumes: `GalleryItem`, `OperatorProfile`, `Review`; `SectionHeading`, `SmartImage`, `Badge`.
- Produces:
  ```ts
  export function Gallery(props: { items: GalleryItem[] }): JSX.Element;            // id="galeri"
  export function OperatorProfileSection(props: { profile: OperatorProfile }): JSX.Element; // id="operator"
  export function ReviewsSection(props: { reviews: Review[] }): JSX.Element;        // id="ulasan"
  ```

- [ ] **Step 1: Implementasi `Gallery`**

Grid masonry-ish (kolom bervariasi) dengan `SmartImage`; setiap item punya `caption` dan `alt`. Sertakan `DemoNotice variant="inline"` bahwa gambar adalah contoh.

- [ ] **Step 2: Implementasi `OperatorProfileSection`**

Foto potret + nama + peran + bio, daftar `languages` dan `certifications` sebagai `Badge`. Sebutkan `yearsExperience`.

- [ ] **Step 3: Implementasi `ReviewsSection`**

Kartu ulasan dengan rating bintang, nama, asal, `tripLabel`, dan teks. Header section **wajib** menyatakan ulasan adalah contoh dan harus diganti dengan ulasan asli (persyaratan kejujuran konten).

- [ ] **Step 4: Verifikasi**

Run: `npm run build && npm run lint`
Expected: tanpa error.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Gallery.tsx src/components/sections/OperatorProfileSection.tsx src/components/sections/ReviewsSection.tsx
git commit -F - <<'EOF'
feat: add gallery, operator profile, and reviews sections

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 13: Informasi perjalanan dan FAQ

**Files:**
- Create: `src/components/sections/TravelInfoSection.tsx`, `src/components/sections/FaqSection.tsx`

**Interfaces:**
- Consumes: `TravelInfoBlock`, `FaqItem`; `SectionHeading`.
- Produces:
  ```ts
  export function TravelInfoSection(props: { blocks: TravelInfoBlock[] }): JSX.Element; // id="informasi"
  export function FaqSection(props: { items: FaqItem[] }): JSX.Element;                 // id="faq"
  ```

- [ ] **Step 1: Implementasi `TravelInfoSection`**

Kartu per blok: judul, `body`, dan daftar `bullets`. Ikon dipilih dari `icon` (`plane`/`sun`/`bag`/`shield`) memakai SVG inline sederhana (tanpa dependensi ikon eksternal).

- [ ] **Step 2: Implementasi `FaqSection`**

Accordion: setiap item adalah `<button>` dengan `aria-expanded` dan `aria-controls` yang mengontrol panel (`id` panel = `${item.id}-panel`) dengan `role="region"` + `aria-labelledby`. Buka/tutup dengan state (`openId` tunggal). Item tertutup default.

- [ ] **Step 3: Verifikasi**

Run: `npm run build && npm run lint`
Expected: tanpa error.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/TravelInfoSection.tsx src/components/sections/FaqSection.tsx
git commit -F - <<'EOF'
feat: add travel info and FAQ accordion

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 14: Formulir permintaan trip

**Files:**
- Create: `src/components/sections/TripForm.tsx`

**Interfaces:**
- Consumes: `Package`; `TripRequestInput`, `validateTripRequest`, `buildTripRequestSummary`, `TripRequestErrors`; `buildWhatsAppUrl`; `formatRupiah`; `Button`, `WhatsAppButton`, `SectionHeading`.
- Produces: `export function TripForm(props: { packages: Package[] }): JSX.Element;` — section `id="formulir"`.

Perilaku:
- Field: `select` paket (dari `packages`), `<input type="date">`, `<input type="number" min=1>`, nama, kontak, catatan (`textarea`).
- Prefill dari query string: `useSearchParams()` membaca `paket` dan (opsional) `tanggal`/`peserta`.
- Submit → `validateTripRequest(input, { maxParticipants })`; bila ada error, tampilkan pesan per field (`aria-describedby`) dan fokuskan field pertama yang error; jangan tampilkan konfirmasi.
- Bila valid → tampilkan panel konfirmasi `role="status"` (Review Focus: konfirmasi jelas) berisi `buildTripRequestSummary`, pernyataan bahwa ini **permintaan awal, bukan pemesanan terverifikasi**, tombol "Lanjut ke WhatsApp" memakai ringkasan sebagai ctx, dan tombol "Kirim permintaan lain" untuk reset.

- [ ] **Step 1: Implementasi `TripForm`**

- [ ] **Step 2: Verifikasi**

Run: `npm run build && npm run lint`
Expected: tanpa error.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/TripForm.tsx
git commit -F - <<'EOF'
feat: add trip request form with confirmation

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 15: CTA penutup dan perakitan `HomePage`

**Files:**
- Create: `src/components/sections/ClosingCta.tsx`
- Modify: `src/pages/HomePage.tsx`

**Interfaces:**
- Consumes: `SiteConfig`, `packages`; `FilterState`, `defaultFilters`, `filterPackages`, `countActiveFilters`; semua section dari Task 10–14.
- Produces: `export function ClosingCta(props: { site: SiteConfig }): JSX.Element;` — `HomePage` merakit seluruh section dalam satu `<main>`.

- [ ] **Step 1: Implementasi `ClosingCta`**

Section gelap (`deep-950`) dengan headline penutup, `WhatsAppButton` dan `LinkButton` ke `#formulir`.

- [ ] **Step 2: Rakit `HomePage`**

Kelola state filter:
```tsx
const [filters, setFilters] = useState<FilterState>(defaultFilters);
const results = useMemo(() => filterPackages(packages, filters), [filters]);
```
Section paket (`id="paket"`) merender `SectionHeading`, `PackageFilter` (dengan `onChange={setFilters}`, `onReset={() => setFilters(defaultFilters)}`, `resultCount={results.length}`, `activeCount={countActiveFilters(filters)}`), dan `PackageGrid packages={results} onReset={() => setFilters(defaultFilters)}`.

Urutan section: Hero → Paket → Galeri → Operator → Ulasan → Informasi → FAQ → TripForm → ClosingCta. `DemoNotice variant="banner"` dirender di atas daftar section.

- [ ] **Step 3: Verifikasi build, lint, test**

Run: `npm run build && npm run lint && npm test`
Expected: semua lulus.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ClosingCta.tsx src/pages/HomePage.tsx
git commit -F - <<'EOF'
feat: assemble home page with closing CTA

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 16: Halaman detail paket

**Files:**
- Create: `src/components/detail/Itinerary.tsx`, `src/components/detail/Inclusions.tsx`, `src/components/detail/MeetingPoint.tsx`, `src/components/detail/PackageBookingPanel.tsx`
- Modify: `src/pages/PackageDetailPage.tsx` (mengganti placeholder dari Task 1)

**Interfaces:**
- Consumes: `Package`, `packages`; `formatRupiah`, `formatTanggal`; `buildWhatsAppUrl`, `isWhatsAppConfigured`; `Button`, `LinkButton`, `WhatsAppButton`, `SmartImage`, `Badge`, `SectionHeading`.
- Produces:
  ```ts
  export function Itinerary(props: { stops: ItineraryStop[] }): JSX.Element;
  export function Inclusions(props: { included: string[]; excluded: string[] }): JSX.Element;
  export function MeetingPoint(props: { pkg: Package }): JSX.Element;
  export function PackageBookingPanel(props: { pkg: Package }): JSX.Element;
  ```
- `PackageDetailPage` default `export`; memakai `useParams<{ slug: string }>()`, mencari di `packages`; bila tidak ditemukan render keadaan "Paket tidak ditemukan" dengan `LinkButton` ke `/` (Review Focus #4).

- [ ] **Step 1: Implementasi komponen detail**

`Itinerary` = timeline vertikal dari `time`/`title`/`detail`. `Inclusions` = dua kolom (termasuk dengan tanda centang, tidak termasuk dengan tanda silang). `MeetingPoint` menampilkan `pkg.meetingPoint` + `minParticipants`/`maxParticipants` + `seatsNote` (dilabeli contoh). `PackageBookingPanel` = panel sticky di desktop: harga (`formatRupiah` + `priceNote`), pemilih tanggal (`<input type="date">`) dan jumlah peserta (`<input type="number">`, clamp ke `minParticipants`–`maxParticipants`), tombol `WhatsAppButton` dengan ctx `{ packageTitle, date, participants }`, plus `LinkButton` "Ajukan lewat formulir" ke `/?paket=<slug>#formulir`.

- [ ] **Step 2: Implementasi `PackageDetailPage`**

Struktur: header foto hero paket (`SmartImage`), judul + destinasi + `Badge` aktivitas, ringkasan, grid konten (kiri: itinerary, fasilitas, `Inclusions`, `MeetingPoint`; kanan: `PackageBookingPanel`), CTA kembali. Sertakan `DemoNotice variant="inline"`.

- [ ] **Step 3: Verifikasi**

Run: `npm run build && npm run lint && npm test`
Expected: semua lulus.

- [ ] **Step 4: Commit**

```bash
git add src/components/detail src/pages/PackageDetailPage.tsx
git commit -F - <<'EOF'
feat: add package detail page

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Task 17: README, panduan kustomisasi, dan verifikasi akhir

**Files:**
- Create: `README.md`
- Modify: `index.html` (title + meta description berdasarkan `site`)

**Interfaces:**
- Produces: dokumentasi; tidak ada kode runtime baru.

- [ ] **Step 1: Tulis `README.md`**

Muat: cara menjalankan (`npm install --include=dev`, `npm run dev`, `npm run build`), struktur `src/content/**` sebagai satu-satunya tempat mengganti konten, daftar field per file konten, cara mengganti palet (`@theme` di `src/index.css`), cara mengganti gambar (taruh di `public/images/`, perbarui path), cara mengganti nomor WhatsApp, dan **daftar periksa sebelum dipakai klien**: ganti konten & harga, verifikasi jadwal, ganti ulasan dengan asli, ganti foto dengan hak lisensi sendiri, perbarui nomor WhatsApp/kontak, sesuaikan/hapus `demoNotice`.

- [ ] **Step 2: Perbarui `index.html`**

Isi `<title>` dan `<meta name="description">` Bahasa Indonesia yang menyebut "Jelajah Lombok", serta tambahkan `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`.

- [ ] **Step 3: Verifikasi akhir menyeluruh**

Run: `npm run lint`
Expected: 0 error.

Run: `npm test`
Expected: seluruh unit test lulus.

Run: `npm run build`
Expected: sukses, `dist/` berisi `index.html`, `assets/`, `images/`.

- [ ] **Step 4: Smoke test dev server (manual, lalu matikan server)**

Jalankan `npm run dev` sebagai proses latar, buka halaman, dan periksa daftar berikut. **Matikan server setelah selesai.**

- Hero tampil dengan gambar & dua tombol berfungsi.
- Navbar desktop & mobile berfungsi; tombol "Pilih Paket" menggulir ke daftar paket.
- Filter mengubah daftar; kombinasi tanpa hasil menampilkan keadaan kosong + "Reset filter".
- "Lihat Detail" membuka `/paket/<slug>`; memuat ulang URL detail langsung juga bekerja.
- Slug detail tidak dikenal → halaman "tidak ditemukan" dengan tombol kembali.
- Tombol WhatsApp membuka `wa.me` dengan pesan memuat nama paket; tanggal & peserta ikut bila diisi.
- FAQ buka/tutup berfungsi.
- Formulir: submit kosong menampilkan error; submit valid menampilkan konfirmasi; tanggal lampau ditolak.
- Tidak ada anchor `href=""` atau `href="#"`; tidak ada tombol tanpa aksi.
- Tampilan responsif di lebar mobile (~375px) dan desktop (~1440px).

- [ ] **Step 5: Commit**

```bash
git add README.md index.html
git commit -F - <<'EOF'
docs: add customization guide and finalize metadata

Co-authored-by: CommandCodeBot <noreply@commandcode.ai>
EOF
```

---

## Review Focus → Task mapping

| Review Focus | Test / verifikasi | Task |
|--------------|-------------------|------|
| 1. Tanggal lampau / peserta tidak wajar | unit test `validateTripRequest` | Task 7 (+ UI Task 14) |
| 2. Filter tanpa hasil | unit test array kosong | Task 5 (+ UI Task 11) |
| 3. Nomor WhatsApp tidak valid | unit test `buildWhatsAppUrl` → `null` | Task 6 (+ `WhatsAppButton` Task 8) |
| 4. Slug detail tidak dikenal | smoke test + keadaan "tidak ditemukan" | Task 16 |
| 5. Gambar gagal dimuat | `SmartImage` fallback | Task 8 (+ aset Task 2) |
