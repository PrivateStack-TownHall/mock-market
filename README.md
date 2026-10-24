# Mock Market — Json Raw Data API Server

Server mock RESTful API modular berbasis **Express.js** dan **json-server** dengan **55 entitas/koleksi** siap pakai dan total **1.429 data record**. Sangat cocok untuk prototyping, testing frontend (React, Next.js, Vue, Svelte), mobile apps (Flutter, React Native), dan showcase portofolio.

Dapat dijalankan secara lokal dengan backend Express, maupun di-host langsung sebagai **GitHub Pages** (static mock data catalog).

---

## 🌐 Live GitHub Pages Demo & Static API

- **Web Catalog**: [https://privatestack-townhall.github.io/mock-market/](https://privatestack-townhall.github.io/mock-market/)
- **Direct Static JSON Access**:
  ```http
  https://privatestack-townhall.github.io/mock-market/data/<collection>.json
  ```
  Contoh:
  - `https://privatestack-townhall.github.io/mock-market/data/products.json`
  - `https://privatestack-townhall.github.io/mock-market/data/users.json`
  - `https://privatestack-townhall.github.io/mock-market/data/articles.json`

### Cara Mengaktifkan GitHub Pages di Repository
1. Buka repo Anda di GitHub: **Settings** > **Pages**
2. Pada bagian **Build and deployment > Source**:
   - Pilih **Deploy from a branch** > Branch **`main`** > Folder **`/ (root)`** > Klik **Save**
   - *ATAU* pilih opsi **GitHub Actions** (alur kerja `.github/workflows/deploy-pages.yml` sudah disiapkan otomatis).
3. Halaman akan aktif di `https://privatestack-townhall.github.io/mock-market/`.

---

## 🚀 Fitur Utama

- **30 Koleksi Data Lengkap**: Meliputi CMS, E-Commerce, LMS, Social/Chat, HR/Recruitment, Fintech, Helpdesk, hingga CRM.
- **Kaya Data (25+ Item per File)**: Setiap dataset memiliki minimal 25 data realistis, konsisten, dan siap digunakan untuk fitur pagination, sorting, dan filter kompleks.
- **Penyimpanan Modular**: Data tersimpan rapi per entitas dalam file JSON terpisah di folder `./data/*.json`.
- **Full REST CRUD**: Otomatis mendukung metode `GET`, `POST`, `PUT`, `PATCH`, dan `DELETE`.
- **CORS Otomatis**: Siap diakses dari aplikasi frontend mana pun tanpa hambatan CORS origin.
- **Katalog Interaktif**: Tampilan visual web modern di `GET /` serta katalog data JSON di `GET /api?format=json`.
- **Hot Reload Endpoint**: `POST /api/__reload` untuk menyinkronkan perubahan file JSON tanpa perlu me-restart server.

---

## 🛠️ Panduan Menjalankan Server

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server
```bash
# Menjalankan server standar
npm start

# Mode development dengan auto-reload ketika server.js berubah
npm run dev
```
Server akan aktif di:
- **Dashboard Katalog**: [http://localhost:3000/](http://localhost:3000/)
- **API Root**: [http://localhost:3000/api](http://localhost:3000/api)

### 3. Menjalankan Pengujian / Verifikasi
```bash
npm test
```

---

## 📋 Daftar 30 Endpoint Koleksi

| No | Endpoint | Total Item | Deskripsi Entitas |
|---|---|---|---|
| 1 | `/api/articles` | 26 | Artikel blog & tutorial tech lengkap dengan HTML content & SEO metadata |
| 2 | `/api/brands` | 25 | Brand profil perusahaan teknologi, bootcamp, agensi, dan F&B |
| 3 | `/api/categories` | 26 | Kategori artikel dan topik pembelajaran |
| 4 | `/api/tags` | 26 | Label/tags teknologi (React, Node, Kubernetes, AI, dll.) |
| 5 | `/api/media` | 26 | Aset gambar media visual dengan URL resolusi tinggi |
| 6 | `/api/users` | 26 | Data pengguna (admin, developer, designer, customer) beserta profil & alamat |
| 7 | `/api/products` | 26 | Produk gadget, workstation, aksesoris dengan harga, stok, diskon, & gambar |
| 8 | `/api/orders` | 26 | Transaksi checkout pesanan pelanggan dengan status pengiriman |
| 9 | `/api/carts` | 26 | Simulasi keranjang belanja pengguna dengan item dan total kalkulasi |
| 10 | `/api/todos` | 26 | Daftar tugas teknis tim engineering dengan prioritas & tenggat waktu |
| 11 | `/api/comments` | 26 | Komentar pengguna pada artikel/postingan beserta likes |
| 12 | `/api/notifications` | 26 | Notifikasi aktivitas akun, sistem, dan pesanan |
| 13 | `/api/chats` | 26 | Riwayat pesan obrolan langsung (direct message) |
| 14 | `/api/transactions` | 26 | Riwayat transaksi pemasukan/pengeluaran fintech dalam IDR |
| 15 | `/api/reviews` | 26 | Review produk dengan rating bintang dan ulasan pelanggan |
| 16 | `/api/events` | 26 | Agenda konferensi, seminar, webinar teknologi |
| 17 | `/api/faqs` | 26 | Tanya jawab bantuan umum, teknis, dan troubleshooting |
| 18 | `/api/recipes` | 26 | Resep masakan nusantara & internasional dengan nutrisi & instruksi langkah |
| 19 | `/api/locations` | 26 | Titik koordinat destinasi wisata nusantara (latitude, longitude, rating) |
| 20 | `/api/quotes` | 26 | Kutipan inspiratif & prinsip clean code dari tokoh industri komputer |
| 21 | `/api/courses` | 26 | Kursus pelatihan coding & bootcamp intensif |
| 22 | `/api/instructors` | 26 | Profil mentor & instruktur ahli berserta keahlian dan rating |
| 23 | `/api/students` | 26 | Data siswa bootcamp dengan kursus yang diambil dan status kelulusan |
| 24 | `/api/jobs` | 26 | Lowongan kerja software engineering dengan rentang gaji IDR |
| 25 | `/api/subscriptions` | 26 | Paket langganan SaaS (Free, Starter, Pro, Enterprise) |
| 26 | `/api/testimonials` | 26 | Testimoni kepuasan alumni dan klien perusahaan |
| 27 | `/api/projects` | 26 | Showcase portofolio studi kasus aplikasi web & mobile agensi |
| 28 | `/api/tickets` | 26 | Tiket customer support & helpdesk dengan status dan tingkat prioritas |
| 29 | `/api/leads` | 26 | Calon klien B2B (inquiry prospek penjualan dan estimasi budget) |
| 30 | `/api/audit_logs` | 26 | Log audit keamanan aktivitas sistem & IP pengguna |

---

## 🔍 Panduan Query Parameter

Server mendukung query parameter standar `json-server`:

### 1. Pagination
Batasi jumlah item per halaman:
```http
GET /api/products?_page=1&_limit=10
```

### 2. Sorting (Pengurutan)
Urutkan data berdasarkan kolom dan arah (`asc` / `desc`):
```http
GET /api/products?_sort=price&_order=desc
```

### 3. Filtering (Penyaringan Nilai Persis)
```http
GET /api/users?role=developer
GET /api/articles?status=Published
```

### 4. Operator Pembanding (Range)
Gunakan `_gte` (>=), `_lte` (<=), `_ne` (!=):
```http
GET /api/products?price_gte=100&price_lte=500
```

### 5. Full-Text Search
Mencari kata kunci di seluruh field data:
```http
GET /api/articles?q=kubernetes
GET /api/courses?q=react
```

### 6. Relasi Data
```http
GET /api/orders?userId=1
GET /api/articles?brandId=1
```

---

## 📁 Struktur Direktori

```
Json Raw Data/
├── data/                    # 30 File database JSON individual
│   ├── articles.json
│   ├── audit_logs.json
│   ├── brands.json
│   ├── carts.json
│   ├── categories.json
│   ├── chats.json
│   ├── comments.json
│   ├── courses.json
│   ├── events.json
│   ├── faqs.json
│   ├── instructors.json
│   ├── jobs.json
│   ├── leads.json
│   ├── locations.json
│   ├── media.json
│   ├── notifications.json
│   ├── orders.json
│   ├── products.json
│   ├── projects.json
│   ├── quotes.json
│   ├── recipes.json
│   ├── reviews.json
│   ├── students.json
│   ├── subscriptions.json
│   ├── tags.json
│   ├── testimonials.json
│   ├── tickets.json
│   ├── todos.json
│   ├── transactions.json
│   └── users.json
├── test/
│   └── verify.js            # Automated integration & smoke test suite
├── scripts/
│   ├── migrate_and_expand_existing.js
│   ├── generate_group_a.js
│   └── generate_group_b.js
├── server.js                # Server utama Express + json-server router
├── package.json
└── README.md
```
