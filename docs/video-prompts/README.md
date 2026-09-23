# Video — Portfolio (Google Flow / Veo 3.1)

Tema: **Fullstack & AI Engineer — sistem tempat data mengalir.** Pulsa sinyal oranye
di jalur sirkuit. Preloader dan hero memakai bahasa visual yang sama.

## Yang dieksekusi (urut)

| # | File | Mode di Flow | Unggah | Simpan hasil ke |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `01-hero-signal-paths.txt` | Text to Video · 16:9 · 8 dtk | — | `public/videos/hero.mp4` |
| 2 | `02-preloader-logo-bumper.txt` | Frames to Video · 16:9 · 8 dtk | First: `logo-first-frame-16x9.png` · Last: `logo-end-frame-16x9.png` | `public/videos/logo.mp4` |

Salin blok `PROMPT` + `NEGATIVE PROMPT` dari tiap file. Kirim video **mentah**
(belum dipotong/dikompres) — kompresi, potong preloader, poster, dan pemasangan saya kerjakan.

## Cek sebelum kirim

- [ ] Tidak ada huruf / angka / logo acak di frame mana pun
- [ ] Warna hanya hitam + oranye (+ violet tipis) — tanpa biru/hijau/pink
- [ ] Gerak tenang, tanpa cut, tanpa guncangan kamera
- [ ] 02: frame terakhir identik dengan `logo-end-frame-16x9.png`
