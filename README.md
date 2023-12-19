# Belajar Dasar Node dan Express Js

## Deskripsi

Dalam repo ini, berisikan documentation belajar node dan express pribadi saya untuk mempermudah belajar bagi pemula untuk mendalami node js, materi ini didapat dari [Modul Node Dasar - SMK Telkom Malang](https://drive.google.com/drive/folders/10cFXJ3iqhzZaIs8GOb0RZSjKJZCEOG-X?usp=drive_link).

### Installation

Pastikan sudah menginstal Node msi atau download menggunakan link:

[Download Node for Windows](https://nodejs.org/dist/v21.4.0/node-v21.4.0-x64.msi).

untuk memastikan apakah node sudah terinstal secara global di computer, jalankan perintah ini:
```
node -v
#or
node --version
```

## Pengenalan Singkat REST API

Website merupakan sekumpulan halaman yang diakses menggunakan browser yang dapat dilihat secara umum  banyak pengguna internet. Pengembang atau pembuat halaman website dikenal sebagai web developer. Seiring berjalannya waktu, tugas dari seorang web developer lebih spesifik dan secara umum terbagi menjadi dua bagian yaitu back-end dan front-end.
Karena back-end dan front-end adalah bagian yang terpisah, tentu membutuhkan penghubung diantara keduanya agar halaman web yang dibuat dapat digunakan sesuai dengan peruntukannya. Untuk menghubungkan kedua bagian tersebut menggunakan tool yang disebut <strong>Application Programming Interface (API).</strong> API digunakan sebagai antarmuka dari sebuah aplikasi agar dapat digunakan oleh aplikasi yang lain. Dalam pengembangan layanan berbasis web, implementasi dari API adalah <strong>REST API.</strong> REST merupakan singkatan dari <strong>RE</strong>presentational <strong>S</strong>tate <strong>T</strong>ransfer yang merupakan standar arsitektur komunikasi berbasis web yang digunakan sebagai jembatan antara back-end dan front-end. REST API menggunakan protocol HTTP (Hypertext Transfer Protocol) sebagai protocol komunikasi data. REST API menyampaikan perintah atau permintaan (request) dari sisi frontend agar diproses oleh sisi backend, selanjutnya sisi backend mengolah data sesuai dengan permintaan dan mengembalikan response kepada sisi frontend.

## Pengenalan Http Method

HTTP adalah singkatan dari <strong>Hypertext Transfer Protocol</strong>. Protokol ini digunakan untuk mentransfer data melalui internet, terutama untuk mengakses halaman web. Ini adalah protokol komunikasi yang digunakan antara klien (seperti browser web) dan server (tempat di mana situs web disimpan).
*ada banyak framework untuk mengolah http di node, tapi dalam modul ini akan memakai `express.js` 

### Beberapa contoh method HTTP yang umum digunakan:
- GET: Method ini digunakan untuk meminta data dari suatu resource di server. Contohnya adalah saat Anda mengakses sebuah halaman web melalui browser. Permintaan GET mengambil informasi tanpa mengubah data yang ada di server.

- POST: Method ini digunakan untuk mengirimkan data ke server untuk membuat atau memperbarui resource. Misalnya, ketika Anda mengisi formulir pendaftaran online dan mengklik tombol "Submit", data yang Anda masukkan dikirimkan ke server menggunakan method POST.

- PUT: Method ini digunakan untuk mengirimkan data ke server untuk memperbarui atau membuat resource di lokasi yang ditentukan. Biasanya digunakan dalam aplikasi yang memungkinkan pengguna untuk memperbarui informasi.

- DELETE: Method ini digunakan untuk menghapus resource yang ditentukan di server. Misalnya, ketika Anda ingin menghapus postingan di media sosial, permintaan DELETE akan dikirimkan ke server untuk menghapus konten tersebut.

- PATCH: Method ini digunakan untuk memperbarui sebagian kecil dari resource di server. Dibandingkan dengan PUT yang menggantikan seluruh resource, PATCH digunakan untuk melakukan perubahan kecil atau spesifik pada resource.

untuk dokumentasi lengkap bisa dilihat di [`Modul Pengenalan REST API`](https://drive.google.com/drive/folders/10cFXJ3iqhzZaIs8GOb0RZSjKJZCEOG-X?usp=drive_link).
