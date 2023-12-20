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

## Pengenalan Sequelize

Sequelize adalah sebuah ORM (Object-Relational Mapping) untuk Node.js yang mendukung berbagai macam basis data relasional seperti MySQL, PostgreSQL, SQLite, dan lainnya. Ini memudahkan pengembang dalam berinteraksi dengan basis data menggunakan objek JavaScript, mengabstraksi query SQL dan memungkinkan manipulasi data dengan lebih mudah.

### Cara instalasi Sequelize:
```cmd
#npm
npm install --save sequelize

#yarn
yarn add sequelize

#pnpm
pnpm install sequelize
```
### Cara membuat Sequelize init:
- Jalankan perintah:
```cmd
npx sequelize-cli init
#Atau jika Anda sudah menginstall Sequelize CLI secara global:
sequelize-cli init
```
Perintah sequelize-cli init akan membuat struktur proyek Sequelize yang standar, termasuk folder config, models, migrations, dan seeders. Ini akan mempersiapkan proyek Anda untuk mulai menggunakan Sequelize dengan basis data yang sudah ditentukan.

Pastikan untuk menyesuaikan konfigurasi basis data Anda di file config/config.json setelah inisialisasi agar Sequelize dapat terhubung ke basis data yang diinginkan.

untuk dokumentasi lengkap bisa dilihat di [`Sequelize Documentation`](https://sequelize.org/).
### Sequelize Relationship
Sequelize relationships adalah cara untuk menghubungkan antara model-model data dalam basis data relasional menggunakan Sequelize, sehingga model-model tersebut bisa saling terkait satu sama lain.

Ini mirip dengan hubungan antar tabel dalam basis data relasional. Dalam Sequelize, terdapat beberapa jenis hubungan antara model-model:

- `One-to-One`: Setiap entitas pada satu model terhubung dengan tepat satu entitas pada model lain. Misalnya, setiap User memiliki satu Profile.

- `One-to-Many`: Setiap entitas pada satu model terhubung dengan banyak entitas pada model lain. Contohnya, satu Author dapat memiliki banyak Books.

- `Many-to-Many`: Banyak entitas pada satu model terhubung dengan banyak entitas pada model lain. Sebagai contoh, Student dapat memiliki banyak Subjects, dan setiap Subject bisa memiliki banyak Students.

Sequelize menyediakan metode untuk mendefinisikan dan mengonfigurasi jenis-jenis hubungan ini antara model-model. Anda dapat menggunakan fungsi-fungsi seperti `belongsTo`, `hasMany`, `hasOne`, dan `belongsToMany` untuk menentukan bagaimana model-model saling berhubungan.

- `belongsTo`: Menghubungkan model dengan hubungan satu-ke-satu atau satu-ke-banyak dimana model yang terkait (target) berada di sisi yang mempunyai kunci asing (foreign key). Misalnya, jika Anda memiliki model Comment yang 'belongsTo' Post, maka setiap Comment akan memiliki kunci asing yang menunjuk ke Post.

- `hasMany`: Hubungan sebaliknya dari belongsTo. Ini menghubungkan model dengan hubungan satu-ke-banyak dimana model yang terkait (target) memiliki kunci asing yang merujuk kembali ke model asal. Contohnya, jika Post memiliki 'hasMany' Comment, setiap Post dapat memiliki banyak Comment.

- `hasOne`: Menghubungkan model dengan hubungan satu-ke-satu. Ini serupa dengan belongsTo, tetapi menegaskan bahwa setiap entitas dalam model memiliki tepat satu entitas yang terkait dalam model lain.

- `belongsToMany`: Digunakan ketika hubungan antara model-model melibatkan asosiasi banyak-ke-banyak. Misalnya, jika Anda memiliki model User dan model Group, dan seorang User dapat berada di banyak Group dan sebaliknya, Anda akan menggunakan 'belongsToMany'.

Dengan menggunakan Sequelize relationships, Anda dapat melakukan operasi join, mengambil data terkait dari beberapa tabel sekaligus, dan membuat kueri yang lebih kompleks untuk mengelola data dalam basis data relasional dengan lebih mudah dan terstruktur.
### Sequelize Migration dan Model
`Sequelize Migration`: Ini adalah alat yang memungkinkan Anda untuk mengelola skema basis data. Migration adalah file JavaScript yang berisi instruksi untuk membuat atau mengubah struktur tabel dan kolom dalam basis data Anda. Dengan menggunakan migration, Anda dapat membuat perubahan pada struktur basis data secara terkendali dan dapat diterapkan secara teratur ke berbagai lingkungan (development, production, dll.) tanpa kehilangan data.

`Sequelize Model`: Model dalam Sequelize adalah representasi dari tabel dalam basis data dalam bentuk objek JavaScript. Setiap model biasanya terkait dengan tabel dalam basis data dan memungkinkan Anda untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada data dalam tabel tersebut menggunakan objek JavaScript. Anda dapat mendefinisikan struktur, hubungan, validasi, dan operasi lainnya pada model untuk mengelola data secara terstruktur.

## Pengenalan Express Js

Express.js adalah framework web yang berbasis pada Node.js yang memudahkan pembuatan aplikasi web dengan Node. Express menyediakan berbagai fitur untuk membangun server HTTP dengan mudah, seperti routing, middleware, pengelolaan permintaan dan respons, dan masih banyak lagi.
### Beberapa Fitur di Express Js
- Routing: Express memungkinkan definisi rute untuk menangani permintaan HTTP ke berbagai endpoint. Misalnya:
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Halo, ini adalah halaman utama!');
});

app.post('/users', (req, res) => {
    // Logic untuk menambah pengguna ke basis data
    res.send('Pengguna berhasil ditambahkan!');
});
```
- Middleware: Middleware adalah fungsi-fungsi yang dijalankan sebelum permintaan tiba ke handler akhir. Contohnya adalah middleware untuk logging, autentikasi, manipulasi data, dll.
```js
app.use(express.json()); // Middleware untuk meng-handle body JSON pada request
app.use(loggerMiddleware); // Contoh middleware untuk logging
```
- Handler/ Controller untuk Permintaan HTTP: Express memungkinkan Anda menangani berbagai jenis permintaan HTTP seperti GET, POST, PUT, DELETE, dll.
```js
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    // Logika untuk mengambil informasi produk berdasarkan ID
    res.send(`Informasi produk dengan ID ${productId}`);
});
```
untuk dokumentasi lengkap bisa dilihat di [`Express Documentation`](https://expressjs.com/).


## Pembuatan Aplikasi School Library
`langkah 1` :  
jalankan perintah:
```
npm init --y 
```

`langkah 2` :
instal dependencies:
```
npm install body-parser cors express fs joi jsonwebtoken md5 multer mysql2 path sequelize
```
lalu jalankan perintah ini untuk menginisiasikan sequelize
```
npx sequelize-cli init
```
*jika terjadi error `ERR!` code ENOENT || `ERR!` syscall istat maka jalankan perintah ini terlebih dahulu ```npm install npm -g``` lalu ulangi inisialisasi sequelize

`langkah 3` :
buat database dengan menjalankan perintah ini:
```sql
CREATE DATABASE school_library;
```
sesuaikan `config.json` dengan database yang dimiliki:
```json
"development": {
    "username": "root",
    "password": null,
    "database": "school_library",
    "host": "127.0.0.1",
    "dialect": "mysql"
},
```

`langkah 4` :
sequelize migration dan model:

Dalam kasus ini kita akan membuat struktur tabel seperti berikut ini.
<div align="center">
    <img src="https://github.com/panntod/School-Lib-Modul/blob/main/table-designer.png?raw=true" alt="foto table desiger" style="display: block; margin-left: auto; margin-right: auto;">
</div>

*Struktur tabel yang dibuat terlebih dahulu adalah tabel yang bersifat parent (tidak ada relasi ke tabel yang lain)

- pembuatan migration dan model `book`, jalankan perintah ini:
```
npx sequelize-cli model:generate --name Book --attributes isbn:string,title:string,author:string,publisher:string,category:string,stock:integer,cover:string
```
- pembuatan migration dan model `member`, jalankan perintah ini:
```
npx sequelize-cli model:generate --name Member --attributes name:string,gender:string,contact:string,address:string
```
- pembuatan migration dan model `admin`, jalankan perintah ini:
```
npx sequelize-cli model:generate --name Admin --attributes name:string,contact:string,address:string,username:string,password:string
```
- pembuatan migration dan model `borrow`, jalankan perintah ini:
```
npx sequelize-cli model:generate --name Borrow --attributes memberID:integer,adminID:integer,date_of_borrow:date,date_of_return:date,status:boolean
```
- pembuatan migration dan model `details_of_borrow`, jalankan perintah ini:
```
npx sequelize-cli model:generate --name DetailOfBorrow --attributes borrowID:integer,bookID:integer,qty:integer
```

`langkah 5` :
Sequelize Relationship:

sesuaikan semua isi di `models`, contoh:
Relasi tabel “admins” dan tabel “borrows” dengan key “id” dari tabel “admins” dan key “adminID” dari tabel “borrows”. Dari sisi tabel “admins”, relasi yang terjadi adalah “each admin has many borrowed books”. Oleh karena itu di file model “admin” kita akan menambahkan code untuk membuat relasi tersebut.
```js
class admin extends Model {
   //Ini adalah metode statis yang digunakan untuk mendefinisikan asosiasi atau hubungan antara model "admin" dengan model-model lain. 
   static associate(models) {
     this.hasMany(models.borrow, {
       foreignKey: `adminID`, as: "borrow"
     })
   }
}
```

Sedangkan relasi dari sisi tabel “borrows”, relasi yang terjadi adalah “each
borrowed book belongs to one admin”. Oleh karena itu di file model “borrow”
kita akan menambahkan code untuk mengimplementasi relasi tersebut.
```js
class borrow extends Model {
       //Ini adalah metode statis yang digunakan untuk mendefinisikan asosiasi atau hubungan antara model "borrow" dengan model-model lain. 
       static associate(models) {
        this.belongsTo(models.admin)
        this.belongsTo(models.member)
        this.hasMany(models.detail_of_borrow, {
          foreignKey: `borrowID`, as: "detail_of_borrow"
        })
      }
}
```
*lakukan kepada semua table yang memiliki relationship

`langkah 6` :
Lakukan migrate database dengan perintah:
```
npx sequelize-cli db:migrate
```

jika terjadi error jalankan perintah ini:
```
npx sequelize-cli db:migrate:undo:all
```
*pastikan urutan file di `/migration` adalah `book`, `member`, `admin`, `borrow`, `detail_of_borrow`, lalu ulangi `db:migrate`

- Setelah ini kalian bisa melanjutkan dengan membaca  [`3. Modul Node - Sequelize - Part 2`](https://drive.google.com/drive/folders/10cFXJ3iqhzZaIs8GOb0RZSjKJZCEOG-X?usp=drive_link) atau melihat code yang sudah saya publikasi kan di repositori ini

Urutan Pembuatan file: 
1. config (done)
2. migration (done)
3. models (done)
4. seeders (optional)
5. controller
     - upload
     - book
     - admin
     - member
     - borrow
6. routes
     - book
     - admin
     - member
     - borrow
7. image (folder kosong)
8. middleware
     - auth
     - validate
9. routes
     - auth
10. server

Tata cara clone repositori ini
- jalankan perintah:
```git
git clone https://github.com/panntod/School-Lib-Modul.git
```
- masuk ke direktori, lalu jalankan perintah ini:
```bash
npm install
or
pnpm install
```
- untuk menjalankan aplikasi init gunakan perintah ini:
```bash
npm start
```
