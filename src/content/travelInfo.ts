import type { TravelInfoBlock } from "./types";

export const travelInfo: TravelInfoBlock[] = [
  {
    id: "info-transport",
    title: "Transportasi",
    icon: "plane",
    body: "Bandara Internasional Lombok (LOP) menjadi titik masuk utama. Semua paket dapat menambahkan antar-jemput bandara.",
    bullets: [
      "Antar-jemput bandara tersedia atas permintaan",
      "Perjalanan antar wilayah umumnya 1–3 jam",
      "Untuk Gili, perahu berangkat dari Dermaga Bangsal",
    ],
  },
  {
    id: "info-cuaca",
    title: "Cuaca & Musim",
    icon: "sun",
    body: "Musim kemarau (April–Oktober) paling nyaman untuk laut dan pendakian. Musim hujan membawa hujan sore yang bisa mengubah jadwal.",
    bullets: [
      "Suhu pesisir 24–32°C sepanjang tahun",
      "Suhu puncak Rinjani bisa di bawah 10°C",
      "Taman nasional kadang tutup sementara saat cuaca ekstrem",
    ],
  },
  {
    id: "info-persiapan",
    title: "Persiapan Barang",
    icon: "bag",
    body: "Bawa perlengkapan sesuai aktivitas. Untuk trekking, sepatu dan jaket hangat bukan opsional.",
    bullets: [
      "Trekking: sepatu bersol kuat, jaket hangat, headlamp",
      "Bahari: pakaian cepat kering, tabir surya reef-safe",
      "Obat pribadi dan uang tunai secukupnya",
    ],
  },
  {
    id: "info-keamanan",
    title: "Keamanan & Asuransi",
    icon: "shield",
    body: "Setiap perjalanan didampingi pemandu bersertifikat. Kami tetap menyarankan asuransi perjalanan pribadi, terutama untuk pendakian.",
    bullets: [
      "Briefing keselamatan sebelum setiap aktivitas",
      "Pemeriksaan kesehatan ringan sebelum trekking",
      "Ikuti arahan pemandu soal kondisi air dan jalur",
    ],
  },
];
