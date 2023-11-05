// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const borrowModel = require("../models/index").borrow;
const detailsOfBorrowModel = require("../models/index").detail_of_borrow;
const Op = require("sequelize").Op;

//mengeksport variabel supaya bisa digunakan di file lain
exports.addBorrowing = async (req, res) => {
  //menyiapkan data untuk di proses
  let newBorrow = {
    memberID: req.body.memberID,
    adminID: req.body.adminID,
    date_of_borrow: req.body.date_of_borrow,
    date_of_return: req.body.date_of_return,
    status: req.body.status,
  };
  //menjalankan proses
  borrowModel.create(newBorrow)
  //ini adalah jika promise yang awal berhasil buka dengan then
    .then((result) => {
      //mengambil borrow id dengan result id dari proses
      let borrowID = result.id;
      let detailsOfBorrow = req.body.details_of_borrow;
      //melooping untuk memasukan setiap data buku yang dipinjam 
      for (let i = 0; i < detailsOfBorrow.length; i++) {
        // menyamakan id dari setiap buku yang pinjam
        detailsOfBorrow[i].borrowID = borrowID;
      }
      //untuk menyisipkan sejumlah catatan baru ke dalam tabel yang sesuai dengan model tersebut. 
      detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
      //jika berhasil buka promise dengan then  
      .then((result) => {
          return res.json({
            success: true,
            message: "New book borrowed has been inserted",
          });
        })
        //jika gagal maka buka promise dengan catch
        .catch((error) => {
          return res.json({
            success: false,
            message: error.message,
          });
        });
    })
  //ini adalah jika promise yang awal gagal maka buka dengan catch
    .catch((error) => {
      return res.json({
        success: false,
        message: error.message,
      });
    });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.updateBorrowing = async (req, res) => {
  //menyiapkan data baru
  let newBorrow = {
    memberID: req.body.memberID,
    adminID: req.body.adminID,
    date_of_borrow: req.body.date_of_borrow,
    date_of_return: req.body.date_of_return,
    status: req.body.status,
  };
  // mengambil id menggunakan params
  let borrowID = req.params.id;
  //menjalankan proses
  borrowModel.update(newBorrow, { where: { id: borrowID } })
    //menggunakan async karena didalam nya memakai method await
    .then(async (result) => {
      // menunggu proses hapus dari data yang lama
      await detailsOfBorrowModel.destroy({ where: { borrowID: borrowID } });
      //menyiapkan data
      let detailsOfBorrow = req.body.details_of_borrow;
      //memberi id yang sama untuk setiap data
      for (let i = 0; i < detailsOfBorrow.length; i++) {
        detailsOfBorrow[i].borrowID = borrowID;
      }
      //untuk menyisipkan sejumlah catatan baru ke dalam tabel yang sesuai dengan model tersebut. 
      detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
      // jika berhasil maka buka promise dengan then
        .then((result) => {
          return res.json({
            success: true,
            message: "book borrowed has been updated",
          });
        })
        //jika gagal maka buka promise dengan catch
        .catch((error) => {
          return res.json({
            success: false,
            message: error.message,
          });
        });
    })
    //jika proses yang pertama gagal maka akan di handle dengan catch
    .catch((error) => {
      return res.json({
        success: false,
        message: error.message,
      });
    });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.deleteBorrowing = async (req, res) => {
  //mengambil id menggunakan params
  let borrowID = req.params.id;
  //proses menghapus data sesuai dengan id
  detailsOfBorrowModel.destroy({ where: { borrowID: borrowID } })
  //jika berhasil maka buka promise dengan then
    .then((result) => {
      //jalankan proses menghapus dari borrow
      borrowModel.destroy({ where: { id: borrowID } })
      //jika berhasil maka buka promise dengan then
        .then((result) => {
          return res.json({
            success: true,
            message: "borrowing book has been deleted",
          });
        })
        //jika gagal maka buka promise dengan catch
        .catch((error) => {
          return res.json({
            success: false,
            message: error.message,
          });
        });
    })
    // jika gagal memproses hapus details of borrow maka akan dihandle
    .catch((error) => {
      return res.json({
        success: false,
        message: error.message,
      });
    });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.returnBook = async (req, res) => {
  // mengambil id menggunakan params
  let borrowID = req.params.id;
  // menyiapkan variabel hari ini
  let today = new Date();
  // menyiapkan variabel current date
  let currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  // memproses update borrow
  borrowModel.update(
    // menyiapkan data
      {
        date_of_return: currentDate,
        status: true,
      },
      {
        where: { id: borrowID },
      }
    )
    // jika berhasil maka buka promise dengan then
    .then((result) => {
      return res.json({
        success: true,
        message: "book has been returned",
      });
    })
    // jika gagal maka buka promise dengan catch
    .catch((error) => {
      return res.json({
        success: false,
        message: error.message,
      });
    });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.getBorrow = async (req, res) => {
  // mencari semua data
  let data = await borrowModel.findAll({
    // untuk menentukan relasi yang harus dimuat bersama dengan data peminjaman buku
    include: [
      // anggota yang meminjam
      "member",
      // admin yang menerima peminjaman
      "admin",
      {
        // detail peminjaman buku, yang juga memiliki relasi dengan buku yang dipinjam
        model: detailsOfBorrowModel,
        as: "details_of_borrow",
        include: ["book"],
      },
    ],
  });
  // mengirim data
  return res.json({
    success: true,
    data: data,
    message: "all borrowing book have been loaded",
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.findBorrowBy = async (req, res) => {
  // mengambil id menggunakan params
  let memberID = req.params.id;
  // menunggu proses dari mencari member yang id nya sesuai
  let data = await borrowModel.findAll({ where: { memberID: memberID },
     // untuk menentukan relasi yang harus dimuat bersama dengan data peminjaman buku
    include: [
       // anggota yang meminjam
       "member",
       // admin yang menerima peminjaman
       "admin",
       {
         // detail peminjaman buku, yang juga memiliki relasi dengan buku yang dipinjam
         model: detailsOfBorrowModel,
         as: "details_of_borrow",
         include: ["book"],
       },
    ],
  });
  // mengirim data
  return res.json({
    success: true,
    data: data,
    message: "all borrowing book have been loaded",
  });
};
