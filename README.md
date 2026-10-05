# Jelajah Lombok — Template Landing Page Operator Paket Wisata

Template landing page profesional untuk operator paket wisata lokal. Dibangun dengan
Vite, React, TypeScript, dan Tailwind CSS v4. Semua konten (nama usaha, destinasi, paket,
harga, foto, jadwal, kontak) berada di `src/content/` sehingga mudah diganti untuk klien
tanpa menyentuh komponen tampilan.

Contoh isi memakai nama **Jelajah Lombok**. Seluruh harga, jadwal, ulasan, dan
ketersediaan di dalamnya adalah **data contoh** — ganti dengan data asli sebelum
dipublikasikan.

## Menjalankan

```bash
npm install --include=dev
npm run dev
```

> Catatan: jika shell Anda menetapkan `NODE_ENV=production`, `npm install` akan melewati
> devDependencies dan build akan gagal. Flag `--include=dev` di atas mengatasinya.

Perintah lain:

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Server pengembangan Vite |
| `npm run build` | Cek tipe (`tsc -b`) lalu build produksi ke `dist/` |
| `npm run preview` | Pratinjau hasil build |
| `npm run lint` | ESLint |
| `npm test` | Unit test (Vitest) |

## Struktur

```
src/
├─ content/     # SATU-SATUNYA tempat mengganti konten
│  ├─ types.ts        # tipe data (jangan diubah strukturnya tanpa menyesuaikan komponen)
│  ├─ site.ts         # nama usaha, kontak, WhatsApp, sosial, menu navigasi, teks hero/CTA
│  ├─ packages.ts     # daftar paket + itinerary, fasilitas, termasuk/tidak termasuk
│  ├─ gallery.ts      # item galeri
│  ├─ reviews.ts      # ulasan pelanggan
│  ├─ operator.ts     # profil pemandu/operator
│  ├─ travelInfo.ts   # transportasi, cuaca, persiapan, keamanan
│  └─ faq.ts          # daftar FAQ
├─ lib/         # logika murni + unit test (filter, WhatsApp, format, validasi)
├─ components/  # tampilan (layout, ui, packages, sections, detail)
└─ pages/       # HomePage dan PackageDetailPage
```

Aturan: **jangan menaruh teks bisnis di dalam `src/components/`**. Semua yang berpotensi
diganti klien berasal dari `src/content/`.

## Mengganti konten

1. **Identitas & kontak** — `src/content/site.ts`: `businessName`, `logoMark`, `tagline`,
   `region`, `whatsappNumber` (digit internasional, mis. `628123456789`), `email`,
   `phoneDisplay`, `address`, `socials`, `nav`, serta teks utama `heroHeadline`,
   `heroSubhead`, `closingHeadline`, `closingBody`.
2. **Paket** — `src/content/packages.ts`. Untuk menambah paket, salin satu objek dan ubah
   `slug` (harus unik — dipakai di URL `/paket/<slug>`), `title`, `destination`,
   `durationDays`, `price`, `schedule`, `itinerary`, dan seterusnya. `npm test` akan gagal
   jika ada `slug` duplikat, gambar hilang/berformat salah, atau daftar wajib
   (itinerary, termasuk/tidak termasuk, aktivitas) kosong.
3. **Galeri, ulasan, pemandu, info perjalanan, FAQ** — file terkait di `src/content/`.
   Jawaban FAQ saat ini sudah berupa jawaban nyata (bukan placeholder), jadi wajib
   disesuaikan dengan kebijakan asli operator.
4. **Filter** — opsi filter (durasi, aktivitas, harga) didefinisikan di
   `src/components/packages/PackageFilter.tsx`, sedangkan logikanya di `src/lib/filters.ts`
   (dengan unit test).
5. **Ulasan** — ganti dengan ulasan asli pelanggan.

## Mengganti tampilan

- **Warna & font** — ubah blok `@theme` di `src/index.css` (`--color-deep-900`,
  `--color-lagoon-500`, `--color-sand-50`, `--color-coral-500`, `--font-display`, …).
  Mengganti beberapa nilai ini akan mengubah seluruh tema.
- **Gambar** — letakkan file di `public/images/` lalu perbarui path di `src/content/`
  (mis. `heroImage: "/images/foto-anda.jpg"`). Disarankan lanskap **1600×1200** (rasio 4:3)
  dan versi potret **800×800** untuk foto pemandu. Komponen `SmartImage` otomatis menampilkan
  placeholder bila file tidak ditemukan, jadi tidak akan ada gambar rusak.

## Cara kerja integrasi WhatsApp

Semua tombol WhatsApp memanggil `buildWhatsAppUrl` di `src/lib/whatsapp.ts`, yang menyusun
pesan berisi **nama paket, tanggal perjalanan, dan jumlah peserta** sesuai konteks, lalu
membuat tautan `https://wa.me/<nomor>?text=…`. Bila `whatsappNumber` tidak valid, tombol
otomatis dinonaktifkan beserta keterangan (bukan tautan mati).

## Cara kerja formulir

Formulir di `#formulir` memvalidasi input di sisi klien (`src/lib/tripRequest.ts`): tanggal
tidak boleh lampau, jumlah peserta harus dalam rentang minimal–maksimal paket, dan field
wajib tidak boleh kosong. Setelah dikirim, muncul konfirmasi berisi ringkasan isian
beserta tombol lanjut ke WhatsApp.

**Tidak ada backend.** Konfirmasi menyatakan bahwa permintaan belum terverifikasi dan
belum menjadi pemesanan — jangan dihapus selama formulir belum terhubung ke sistem Anda,
karena pengunjung akan mengira pesanannya sudah masuk. Untuk menyimpan permintaan,
hubungkan `handleSubmit` di `src/components/sections/TripForm.tsx` ke API/email pilihan Anda,
lalu sesuaikan teks konfirmasinya.

## Daftar periksa sebelum dipakai klien

- [ ] Ganti `businessName`, `logoMark`, `tagline`, `region`, dan kontak di `site.ts`.
- [ ] Ganti teks `heroHeadline`, `heroSubhead`, `closingHeadline`, `closingBody` bila perlu.
- [ ] Isi `whatsappNumber` dengan nomor asli (format `62…` tanpa `+` atau spasi).
- [ ] Ganti seluruh paket, harga, jadwal, dan itinerary dengan data asli.
- [ ] Sesuaikan jawaban FAQ dengan kebijakan asli operator.
- [ ] Ganti ulasan contoh dengan ulasan asli pelanggan.
- [ ] Ganti semua gambar contoh dengan foto milik Anda (perhatikan hak/lisensi).
- [ ] Perbarui `<title>` dan `<meta name="description">` di `index.html`.
- [ ] Hubungkan formulir ke backend, lalu sesuaikan teks konfirmasinya.
- [ ] Jalankan `npm test`, `npm run lint`, dan `npm run build`.
