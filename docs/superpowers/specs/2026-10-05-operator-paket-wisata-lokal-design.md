# Jelajah Lombok — Landing Page Operator Paket Wisata Lokal (Template) — Design Spec

**Tanggal:** 2026-10-05
**Status:** Draf — menunggu review
**Nama contoh bisnis:** Jelajah Lombok
**Bentuk keluaran:** Template landing page yang dapat dijual ulang ke banyak bisnis wisata

---

## 1. Tujuan & Konteks

Membangun landing page profesional untuk operator paket wisata lokal yang berfungsi
sebagai **template komersial**: konten (nama usaha, destinasi, paket, harga, foto,
jadwal, kontak) harus dapat diganti tanpa menyentuh komponen tampilan.

Tujuan yang ingin dicapai pemilik bisnis dengan halaman ini:

1. Menampilkan paket wisata dengan jelas (destinasi, durasi, harga, jadwal, jumlah peserta).
2. Membantu calon pelanggan menyaring paket sesuai kebutuhan.
3. Mengarahkan calon pelanggan ke percakapan WhatsApp dengan konteks lengkap
   (nama paket, tanggal perjalanan, jumlah peserta) agar operator bisa merespons cepat.
4. Menumbuhkan kepercayaan lewat galeri, profil pemandu, ulasan, dan informasi perjalanan.

Karena ini template, **kesan pertama visual dan kemudahan kustomisasi adalah kriteria
sukses utama**, bukan jumlah fitur.

### Sasaran pengguna

- **Calon pelanggan (desktop & mobile):** wisatawan domestik/mancanegara yang mencari
  paket wisata lokal, ingin cepat tahu isi paket, lalu menghubungi operator.
- **Pembeli template (operator/agensi):** developer atau pemilik bisnis non-teknis yang
  akan mengganti konten dan warna tanpa membongkar kode komponen.

---

## 2. Ruang Lingkup

### Termasuk (in scope)

- Satu halaman utama (landing) yang berisi seluruh section yang diminta, plus satu
  halaman detail paket.
- Filter paket yang berfungsi (durasi, jenis aktivitas, kisaran harga) dengan
  pencarian gabungan, hasil kosong yang informatif, dan reset.
- Integrasi WhatsApp dengan pesan otomatis terisi.
- Formulir permintaan trip dengan konfirmasi jelas di sisi klien.
- Lapisan konten terpisah dari komponen tampilan.
- Konten demo Bahasa Indonesia yang jelas ditandai sebagai contoh.
- Verifikasi: `npm run build`, `tsc`, `npm run lint`, unit test logika inti.

### Tidak termasuk (out of scope)

- Backend, database, autentikasi, pembayaran.
- Pengiriman email sungguhan dari formulir (tidak ada server). Formulir hanya
  menampilkan konfirmasi lokal, dengan opsi lanjut ke WhatsApp.
- Manajemen stok/ketersediaan nyata. Field jadwal & sisa slot hanyalah contoh.
- Blog, halaman multi-bahasa, CMS.
- Optimasi SEO lanjutan (sitemap, structured data) — hanya meta dasar.

---

## 3. Alur Pengguna

1. **Mulai:** pengunjung mendarat di Hero, langsung melihat foto destinasi, headline
   singkat, dan dua tombol: **"Lihat Paket"** (scroll ke daftar paket) dan
   **"Tanya via WhatsApp"** (buka percakapan WhatsApp dengan pesan umum terisi).
2. **Menelusuri:** pengunjung memakai Navbar (menu anchor + tombol **"Pilih Paket"**)
   atau langsung menggeser ke daftar paket.
3. **Menyaring:** pengunjung memilih durasi / jenis aktivitas / kisaran harga.
   Daftar dan jumlah hasil diperbarui langsung di sisi klien.
4. **Melihat detail:** pengunjung membuka detail paket (itinerary, fasilitas,
   termasuk/tidak termasuk, titik kumpul) lewat tombol "Lihat Detail".
5. **Menghubungi:** dari kartu paket atau halaman detail, tombol **"Pesan via WhatsApp"**
   membuka WhatsApp dengan pesan berisi nama paket. Bila pengunjung mengisi tanggal &
   jumlah peserta pada detail paket, nilai itu ikut masuk ke pesan.
6. **Mengirim permintaan:** pengunjung mengisi formulir (paket, tanggal, jumlah peserta,
   nama, kontak) lalu submit. Muncul konfirmasi jelas yang merangkum isian dan
   menyatakan bahwa ini permintaan awal, **bukan** pemesanan terverifikasi, plus tombol
   lanjut ke WhatsApp dengan ringkasan yang sama.
7. **Menutup:** CTA penutup + footer berisi kontak, alamat/wilayah, sosial media, dan
   catatan demo.

---

## 4. Arsitektur & Keputusan Teknis

### Stack

| Area | Pilihan | Alasan |
|------|---------|--------|
| Build tool | Vite (versi terbaru kompatibel) | Diminta; dev server cepat, output build statis. |
| UI | React + TypeScript | Diminta; komponen + type-safety untuk lapisan konten. |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` | Token tema lewat `@theme` di CSS memudahkan re-skin per klien. |
| Routing | `react-router-dom` | Halaman detail paket dapat di-deep-link (`/paket/:slug`). |
| Font | `@fontsource-variable/fraunces` (display) + `@fontsource-variable/plus-jakarta-sans` (body) | Font di-bundle lokal, tidak bergantung CDN. |
| Test | Vitest | Unit test untuk logika murni (filter, WhatsApp, format). |
| Lint | ESLint (config React + TS) | Standar kualitas. |

**Catatan Tailwind v4:** tidak perlu `tailwind.config.js`. Tema didefinisikan lewat blok
`@theme` di `src/index.css` (warna, font, radius). Mengganti palet klien = mengubah
beberapa variabel CSS.

### Versi & kendala lingkungan (sudah diverifikasi dengan build nyata)

| Paket | Versi | Catatan |
|-------|-------|---------|
| vite | ^8.3.2 | `@vitejs/plugin-react@6` mensyaratkan vite ^8 |
| @vitejs/plugin-react | ^6.1.1 | — |
| tailwindcss / @tailwindcss/vite | ^4.3.3 | pakai plugin `@tailwindcss/vite` |
| react / react-dom / @types/react / @types/react-dom | ^19.3.0 | — |
| react-router-dom | ^7.18.4 | — |
| **typescript** | **~5.9.3** | **wajib 5.x**: `typescript-eslint@8` membatasi `<6.1.0`, jadi TS 7 tidak dipakai |
| eslint / @eslint/js | ^9.39.5 | — |
| typescript-eslint | ^8.71.0 | — |
| eslint-plugin-react-hooks / react-refresh | ^7.1.1 / ^0.5.7 | — |
| vitest | ^5.0.3 | jalan dengan vite 8 |
| @fontsource-variable/fraunces / plus-jakarta-sans | ^5.3.0 | font di-bundle lokal |

Kendala yang wajib ditangani (ditemukan lewat uji build):

- **`NODE_ENV=production` di-set di shell ini**, sehingga `npm install` melewati
  devDependencies. Instalasi harus memakai `npm install --include=dev`.
- Tanpa `src/vite-env.d.ts` berisi `/// <reference types="vite/client" />`, `tsc` gagal
  pada `import "./index.css"`.
- `verbatimModuleSyntax: true` → impor khusus tipe wajib memakai `import type`.
- `formatRupiah` tidak boleh memakai `Intl` `style: "currency"` (menyisipkan NBSP sehingga
  jadi "Rp 150.000"); format manual: `"Rp" + new Intl.NumberFormat("id-ID").format(n)`.
- `formatTanggal` harus mem-parse tanggal sebagai waktu lokal (`new Date(iso + "T00:00:00")`)
  agar tidak bergeser sehari pada zona waktu ber-offset negatif.

### Prinsip pemisahan

- **Lapisan konten (`src/content/**`)** — data murni bertipe. Satu-satunya tempat klien
  mengubah teks, harga, foto, kontak. Tidak mengimpor React.
- **Lapisan logika (`src/lib/**`)** — fungsi murni tanpa React (filter, WhatsApp,
  format). Diuji unit.
- **Lapisan tampilan (`src/components/**`, `src/pages/**`)** — hanya merender; menerima
  data dari lapisan konten. Tidak ada teks bisnis yang di-hardcode di komponen, kecuali
  label generik UI (mis. "Durasi", "Pesan via WhatsApp").

**Aturan:** setiap field yang berpotensi diganti klien harus berasal dari `src/content/`.
Teks UI statis yang bukan milik bisnis boleh berada di komponen.

### Routing

- `/` → `HomePage` (semua section landing).
- `/paket/:slug` → `PackageDetailPage` (detail + tombol WhatsApp + CTA kembali).
- Slug tidak dikenal → tampilkan keadaan "paket tidak ditemukan" dengan tombol kembali
  ke daftar paket (bukan halaman kosong).
- Perpindahan route menggulir ke atas (`ScrollToTop`).

---

## 5. Struktur File

```
operator-paket-wisata-lokal/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tsconfig.json / tsconfig.app.json / tsconfig.node.json
├─ eslint.config.js
├─ .gitignore
├─ README.md
├─ public/
│  ├─ favicon.svg
│  └─ images/             # artwork SVG demo (hero, destinasi, galeri, potret, placeholder)
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ index.css
   ├─ content/
   │  ├─ types.ts          # tipe seluruh entitas konten
   │  ├─ site.ts           # identitas usaha, kontak, sosial, nav
   │  ├─ packages.ts       # daftar paket + detail
   │  ├─ gallery.ts        # item galeri
   │  ├─ reviews.ts        # ulasan pelanggan (contoh)
   │  ├─ operator.ts       # profil pemandu/operator
   │  ├─ travelInfo.ts     # transportasi, cuaca, persiapan
   │  └─ faq.ts            # daftar FAQ
   ├─ lib/
   │  ├─ filters.ts        # filterPackages + turunan opsi filter
   │  ├─ whatsapp.ts       # buildWhatsAppUrl / buildWhatsAppMessage
   │  ├─ format.ts         # formatRupiah, formatTanggal
   │  └─ tripRequest.ts    # validasi + bentuk ringkasan permintaan trip
   ├─ components/
   │  ├─ layout/  Navbar.tsx, Footer.tsx, SiteLayout.tsx, ScrollToTop.tsx
   │  ├─ ui/      Button.tsx, SectionHeading.tsx, Badge.tsx, SmartImage.tsx,
   │  │           DemoNotice.tsx, WhatsAppButton.tsx
   │  ├─ packages/ PackageCard.tsx, PackageFilter.tsx, PackageGrid.tsx
   │  ├─ sections/ Hero.tsx, Gallery.tsx, OperatorProfileSection.tsx,
   │  │            ReviewsSection.tsx, TravelInfoSection.tsx, FaqSection.tsx,
   │  │            TripForm.tsx, ClosingCta.tsx
   │  └─ detail/  Itinerary.tsx, Inclusions.tsx, MeetingPoint.tsx, PackageBookingPanel.tsx
   └─ pages/ HomePage.tsx, PackageDetailPage.tsx
```

File dibuat kecil dan fokus. `README.md` menjelaskan cara mengganti konten untuk klien.

---

## 6. Model Data (`src/content/types.ts`)

Bentuk tipe (nama field mengikat — dipakai lintas komponen):

```ts
export type ActivityType = "pantai" | "gunung" | "budaya" | "bahari" | "kuliner";

export type DurationBucket = "1hari" | "23hari" | "4hari+";

export interface Money {
  amount: number;      // dalam Rupiah penuh, mis. 1250000
  currency: "IDR";
}

export interface ItineraryStop {
  time: string;        // mis. "07:00"
  title: string;
  detail: string;
}

export interface Package {
  slug: string;              // unik, dipakai di URL
  title: string;
  summary: string;           // 1–2 kalimat
  destination: string;       // mis. "Gili Trawangan, Lombok Utara"
  durationDays: number;      // 1, 2, 3, ...
  durationLabel: string;     // teks tampil, mis. "2 Hari 1 Malam"
  price: Money;              // harga per peserta (contoh)
  priceNote: string;         // mis. "Harga contoh per orang, min. 2 peserta"
  activityTypes: ActivityType[];
  schedule: string[];        // tanggal/jadwal contoh
  meetingPoint: string;
  minParticipants: number;
  maxParticipants: number;
  seatsNote: string;         // mis. "Kuota contoh"
  heroImage: string;         // URL foto utama
  galleryImages: string[];
  highlights: string[];
  itinerary: ItineraryStop[];
  facilities: string[];
  included: string[];
  excluded: string[];
  isDemo?: boolean;
}

export interface GalleryItem { id: string; src: string; caption: string; alt: string; }
export interface Review { id: string; name: string; origin: string; rating: number; text: string; tripLabel: string; isDemo: true; }
export interface OperatorProfile { name: string; role: string; bio: string; yearsExperience: number; languages: string[]; photo: string; certifications: string[]; }
export interface TravelInfoBlock { id: string; title: string; icon: "plane"|"sun"|"bag"|"shield"; body: string; bullets: string[]; }
export interface FaqItem { id: string; question: string; answer: string; }
export interface SiteConfig {
  businessName: string; logoMark: string; tagline: string;
  region: string; whatsappNumber: string; /* digit internasional, mis. 62812... */
  email: string; phoneDisplay: string; address: string;
  socials: { label: string; href: string }[];
  nav: { label: string; href: string }[];   // href anchor "#paket" dst.
  demoNotice: string;
}
```

**Catatan konten contoh:** semua paket, jadwal, harga, ulasan bertanda demo. Ulasan
selalu `isDemo: true` dan dirender dengan label "contoh".

---

## 7. Logika Inti (`src/lib/**`)

### 7.1 `filters.ts`

```ts
export interface FilterState {
  duration: DurationBucket | "semua";
  activity: ActivityType | "semua";
  price: "semua" | "dibawah2jt" | "2jt-5jt" | "diatas5jt";
}

export const defaultFilters: FilterState;

export function filterPackages(packages: Package[], f: FilterState): Package[];
export function countActiveFilters(f: FilterState): number;
export function durationBucketOf(days: number): DurationBucket;
```

- Filter digabung dengan logika AND antar kategori; "semua" berarti tidak membatasi.
- Bucket durasi: `1hari` = 1 hari; `23hari` = 2–3 hari; `4hari+` = ≥4 hari.
- Bucket harga memakai `price.amount` (per peserta).

### 7.2 `whatsapp.ts`

```ts
export interface WhatsAppContext {
  packageTitle?: string;
  date?: string;        // format tampil, mis. "2026-11-14"
  participants?: number;
  note?: string;
}

export function buildWhatsAppMessage(ctx: WhatsAppContext): string;
export function buildWhatsAppUrl(number: string, ctx: WhatsAppContext): string;
```

- Pesan menyertakan nama paket, tanggal perjalanan, dan jumlah peserta **bila ada**,
  serta salam & penutup sopan. Field kosong tidak dipaksakan ke dalam pesan.
- URL: `https://wa.me/<number>?text=<encodeURIComponent(message)>`.
- Nomor dinormalisasi: buang karakter non-digit, ubah awalan `0`/`+62` menjadi `62`.

### 7.3 `format.ts`

```ts
export function formatRupiah(amount: number): string;   // "Rp1.250.000"
export function formatTanggal(iso: string): string;     // locale id-ID, mis. "14 Nov 2026"
```

### 7.4 `tripRequest.ts`

```ts
export interface TripRequestInput {
  packageSlug: string;
  date: string;          // yyyy-mm-dd dari <input type="date">
  participants: number;
  name: string;
  contact: string;
  note?: string;
}

export type TripRequestErrors = Partial<Record<keyof TripRequestInput, string>>;

export interface ValidateOptions {
  today?: Date;           // default: new Date(); dipakai untuk menolak tanggal lampau
  maxParticipants?: number; // batas atas dari paket terpilih
}

export function validateTripRequest(input: TripRequestInput, options?: ValidateOptions): TripRequestErrors;
export function buildTripRequestSummary(input: TripRequestInput, pkgTitle: string): string;
```

- `validateTripRequest` menolak: paket belum dipilih, tanggal kosong, tanggal lampau,
  peserta bukan bilangan ≥ 1 dan ≤ `maxParticipants` paket, nama kosong, kontak kosong.
  Mengembalikan peta pesan error Bahasa Indonesia; objek kosong berarti valid.
- `buildTripRequestSummary` menghasilkan ringkasan teks (dipakai pada konfirmasi dan
  sebagai isi pesan WhatsApp) yang memuat nama paket, tanggal, dan jumlah peserta.

Semua logika di atas murni dan diuji dengan Vitest.

---

## 8. Desain Visual

**Arah:** editorial destinasi — foto besar mendominasi, tipografi tegas, ruang lega,
tanpa ornamen berlebihan atau teks promosi klise.

- **Palet (via `@theme`):**
  - Deep ocean teal (warna utama, navbar/CTA gelap)
  - Laut dangkal turquoise (aksen sekunder)
  - Pasir krem / off-white (latar)
  - Arang vulkanik (teks)
  - Sunset coral (aksen aksi terbatas, mis. tombol WhatsApp/primary)
- **Tipografi:** Fraunces (display, headline besar & editorial) + Plus Jakarta Sans
  (body). Skala jelas, line-height longgar, lebar baris dibatasi agar mudah dibaca.
- **Hero:** foto lanskap penuh dengan overlay gradien gelap; headline pendek; dua tombol.
- **Kartu paket:** foto sebagai fokus, judul, destinasi, baris meta (durasi, jadwal,
  peserta), harga dengan catatan "contoh", tombol "Lihat Detail" + ikon WhatsApp.
- **Ritme section:** selang-seling latar terang/gelap; heading section konsisten
  (eyebrow + judul + deskripsi singkat).
- **Detail paket:** header foto, panel ringkasan lengket (sticky) di desktop berisi
  harga, pemilih tanggal & peserta, tombol WhatsApp; di bawahnya itinerary berupa
  timeline vertikal, fasilitas, termasuk/tidak termasuk (dua kolom), titik kumpul.
- **Hindari:** kartu seragam tanpa hierarki, gradien berlebihan, ikon stok berlebihan.

### Foto demo

Keputusan: **gambar demo adalah artwork SVG lokal di `public/images/`**, bukan foto dari CDN luar.

Alasan (berdasarkan pengujian nyata saat perencanaan):

- CDN foto eksternal (Unsplash) tidak dapat diandalkan di lingkungan ini — URL yang sama
  kadang mengembalikan gambar, kadang 404 setelah beberapa permintaan beruntun. Bergantung
  padanya akan menghasilkan gambar rusak.
- Template ini akan **dijual ulang**, sehingga menanamkan foto pihak ketiga menimbulkan
  pertanyaan lisensi. Artwork lokal menghindari masalah itu sejak awal.

Rancangan artwork:

- Satu set SVG bertema destinasi Lombok dengan palet yang kohesif: siluet Rinjani,
  garis kontur topografi, band ombak, franggi kelapa, cakram matahari, pola bawah laut.
- Setiap gambar diberi label kecil "Foto contoh" agar jelas ini slot yang harus diganti.
- Semua path gambar terpusat di `src/content/**` (`heroImage`, `galleryImages`, `photo`,
  `src`), sehingga klien cukup menaruh file fotonya di `public/images/` dan mengubah path.
- `SmartImage` tetap menangani `loading="lazy"`, `alt` wajib, rasio tetap, dan **fallback**
  ke placeholder netral bila path gambar tidak ada — sehingga tidak pernah muncul gambar rusak.
- README menjelaskan cara mengganti dengan foto asli klien (ukuran, rasio, penamaan).

---

## 9. Aksesibilitas & Responsif

- Semantik HTML: `header`, `nav`, `main`, `section` (dengan heading), `footer`.
- Semua tombol/link dapat difokus keyboard dengan gaya fokus terlihat.
- Filter memakai elemen form berlabel (`<label>` + `<select>`), bukan div palsu.
- FAQ memakai tombol dengan `aria-expanded` + `aria-controls` (accordion, buka/tutup).
- Formulir: setiap input berlabel, `required`, pesan error yang terbaca, dan ringkasan
  konfirmasi diumumkan (`role="status"`).
- Kontras warna memenuhi WCAG AA untuk teks utama.
- Navbar mobile: tombol menu dengan `aria-expanded`, menu dapat ditutup.
- Layout responsif: satu kolom di mobile, grid 2–3 kolom di desktop; target sentuh ≥44px.

---

## 10. Kejujuran Konten (demo disclaimer)

Persyaratan eksplisit: **jangan menyajikan jadwal, harga, ulasan, atau ketersediaan
seolah-olah sudah terverifikasi.**

- `DemoNotice` ditampilkan di dekat atas halaman (banner tipis) dan di footer:
  konten bersifat contoh dan harus diganti/diverifikasi operator.
- Setiap harga disertai `priceNote` (mis. "harga contoh per orang").
- Setiap jadwal diberi label "jadwal contoh".
- Bagian ulasan diberi label jelas "Ulasan contoh — ganti dengan ulasan asli pelanggan".
- Jumlah slot/ketersediaan tidak diklaim nyata (`seatsNote` = catatan contoh).
- Konfirmasi formulir menegaskan: ini **permintaan**, bukan pemesanan terkonfirmasi.
- README memuat daftar periksa "sebelum dipakai klien": ganti konten, verifikasi harga,
  ganti foto, ganti nomor WhatsApp, hapus/sesuaikan banner demo.

---

## 11. Pengujian & Verifikasi

**Unit test (Vitest) — logika murni:**

- `filters.ts`: setiap bucket durasi; setiap bucket harga; aktivitas; kombinasi AND;
  "semua" tidak membatasi; daftar kosong; hasil tanpa kecocokan.
- `whatsapp.ts`: pesan memuat nama paket + tanggal + peserta; field kosong tidak muncul;
  normalisasi nomor (`0…` dan `+62…` → `62…`); URL ter-encode benar.
- `format.ts`: `formatRupiah` (termasuk nilai besar), `formatTanggal`.

**Verifikasi manual/wajib dijalankan:**

- `npm run lint` bersih.
- `tsc --noEmit` (atau `npm run build`) tanpa error tipe.
- `npm run build` sukses dan menghasilkan `dist/`.
- `npm run dev`: cek hero, filter mengubah daftar, detail paket, tombol WhatsApp berisi
  pesan benar, FAQ buka/tutup, form menampilkan konfirmasi, navbar mobile berfungsi,
  tidak ada anchor `href=""` / `#` kosong, tidak ada tombol tanpa aksi.

**Review Focus (kondisi yang mudah bocor):**

1. Formulir dikirim dengan tanggal lampau atau peserta 0/negatif → harus ditolak dengan pesan jelas.
2. `catch-all` pada filter (mis. kategori aktivitas tanpa paket) → tampilkan keadaan kosong dengan tombol "Reset filter", bukan grid kosong bisu.
3. Nomor WhatsApp kosong/aneh di config → tombol tidak boleh jadi tautan mati; harus dinonaktifkan dengan pesan.
4. Slug detail tidak dikenal → halaman "tidak ditemukan" dengan jalan kembali.
5. Foto gagal dimuat (offline/URL mati) → fallback placeholder, bukan gambar rusak.

---

## 12. Kriteria Sukses

- [ ] Semua section yang diminta ada dan berisi konten demo Bahasa Indonesia.
- [ ] Filter durasi/aktivitas/harga berfungsi gabungan, dengan jumlah hasil, reset, dan keadaan kosong.
- [ ] Navigasi navbar (desktop & mobile) dan tombol "Pilih Paket" bekerja.
- [ ] Detail paket menampilkan itinerary, fasilitas, termasuk/tidak termasuk, titik kumpul.
- [ ] Tombol WhatsApp membuka percakapan dengan pesan berisi nama paket; tanggal & peserta
      ikut bila diisi.
- [ ] Formulir menampilkan konfirmasi jelas dan menegaskan permintaan belum terverifikasi.
- [ ] Tidak ada tautan kosong maupun tombol tanpa respons.
- [ ] Konten terpisah dari komponen (ubah `src/content/**` tanpa menyentuh komponen).
- [ ] Tidak ada klaim terverifikasi atas jadwal/harga/ulasan/ketersediaan.
- [ ] Responsif di desktop & mobile, dasar aksesibilitas terpenuhi.
- [ ] `lint`, `tsc`, unit test, dan `npm run build` lulus.

---

## 13. Risiko & Mitigasi

| Risiko | Mitigasi |
|--------|----------|
| CDN foto eksternal tidak andal | Demo memakai artwork SVG lokal; tidak ada dependensi jaringan saat runtime. |
| Placeholder terasa kurang "foto" | Artwork dibuat setema & editorial, dilabeli "Foto contoh", dan mudah ditukar foto asli. |
| Tailwind v4 berbeda dari v3 (banyak contoh lama) | Pakai setup resmi `@tailwindcss/vite` + `@theme`. |
| Template terasa generik | Arah visual editorial + tipografi tegas + palet destinasi spesifik. |
| Data tercecer di komponen | Aturan lapisan konten + review bahwa komponen tidak memuat teks bisnis. |
| Node v25 sangat baru | Kunci versi Vite/plugin stabil terbaru; verifikasi build sebagai gerbang. |
