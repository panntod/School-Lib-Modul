// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const multer = require('multer')
const path = require('path')
// yang berarti berkas akan disimpan di sistem berkas lokal server.
const storage = multer.diskStorage({
    //Ini adalah fungsi yang menentukan lokasi penyimpanan
    destination: (req, file, cb) => {
        //fungsi callback yang digunakan untuk memberi tahu multer di mana berkas harus disimpan
        cb(null, `./foto-admin`)
    },
      //Ini adalah fungsi yang menentukan nama berkas yang akan digunakan saat berkas diunggah.
    filename:(req,file,cb) => {
    // menyusun nama berkas dengan format cover-<timestamp><ekstensi>, path.extname(file.originalname) untuk mendapatkan ekstensi berkas yang diunggah
        cb(null,`foto-admin-${Date.now()}${path.extname(file.originalname)}`)
    }
})

//Ini adalah inisialisasi middleware multer dengan beberapa opsi yang dikonfigurasi.
const upload = multer({
    // Ini adalah konfigurasi untuk mengatur di mana berkas yang diunggah akan disimpan
    storage:storage,
    // Ini adalah fungsi yang akan digunakan untuk memfilter berkas yang diunggah
    fileFilte:(req, file, cb) => {
    // adalah array yang berisi tipe-tipe berkas yang diterima
    const acceptedType =["image/jpg",'image/jpeg',"image/png"]
    // Jika tipe berkas tidak ada dalam daftar ini, multer akan menolak berkas tersebut 
    if(!acceptedType.includes(file.mimetype)){
            cb(null, false)
            return cb(`invalid type file ${file.mimetype}`)
        }
    // digunakan untuk mendapatkan ukuran berkas yang diunggah
    const fileSize = req.headers['content-length']
    // dalah ukuran maksimum yang diperbolehkan (dalam byte).
    const  maxSize = (1 * 1024 * 1024)
    // Jika ukuran berkas melebihi maxSize, multer akan menolak berkas tersebut dan mengembalikan pesan kesalahan.
    if(fileSize > maxSize){
            cb(null, false)
            return cb(`this file is too large`)
        }
    // Selanjutnya, terdapat pengecekan jika berkas memenuhi syarat, maka callback cb akan dipanggil dengan null dan true, yang berarti berkas diterima.
    cb(null,true)
    }
})

// mengeksport supaya bisa digunakan di file lain
module.exports = upload;