// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const upload = require("./upload-cover").single(`cover`);
const bookModel = require("../models/index").book;
const Op = require("sequelize").Op;
const path = require("path");
const fs = require("fs");

//mengeksport variabel supaya bisa digunakan di file lain
exports.getAllBook = async (req, res) => {
  //menyiapkan data
  let books = await bookModel.findAll();
  //mengirim data
  return res.json({
    success: true,
    data: books,
    message: "All books have been loaded",
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.findBook = async (req, res) => {
  //mengambil kata kunci dengan keyword
  let keyword = req.body.keyword;
  //mencari data
  let books = await bookModel.findAll({
    where: {
      [Op.or]: [{ isbn: { [Op.substring]: keyword } }],
    },
  });
  //mengirim data
  return res.json({
    success: true,
    data: books,
    message: "All books have been loaded",
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.addBook = async (req, res) => {
  // jalan kan function upload
  upload(req, res, async (error) => {
    // jika ada error
    if (error) return res.json({ message: error });
    //jika tidak ada file yang di upload
    if (!req.file) return res.json({ message: "nothing to upload" });
    //menyiapkan data
    let newBook = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      category: req.body.category,
      stock: req.body.stock,
      cover: req.file.filename,
    };
    //menjalankan proses membuat
    bookModel.create(newBook)
      //jika berhasil maka buka promise dengan then
      .then((result) => {
        return res.json({
          success: true,
          data: result,
          message: "new book has been inserted",
        });
      })
      //jika gagal maka buka promise dengan catch
      .catch((error) => {
        return res.json({
          success: false,
          message: error.message,
        });
      });
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.updateBook = async (request, response) => {
  //menjalankan fungsi upload
  upload(request, response, async (error) => {
    //jika ada error
    if (error) return response.json({ message: error });
    //mengambil id menggunakan params
    let id = request.params.id;
    //menyiapkan data buku
    let book = {
      isbn: request.body.isbn,
      title: request.body.title,
      author: request.body.author,
      publisher: request.body.publisher,
      category: request.body.category,
      stock: request.body.stock,
    };
    //jika ada foto baru
    if (request.file) {
      //mengambil foto lama yang ada di database
      const selectedBook = await bookModel.findOne({ where: { id: id } });
      // menyimpan foto lama di variabel
      const oldCoverBook = selectedBook.cover;
      //menyiapkan nama foto sesuai dengan nama folder
      const pathCover = path.join(__dirname, `../cover`, oldCoverBook.toString());
      //jika ada foto lama maka akan dihapus
      if (fs.existsSync(pathCover)) {
        fs.unlink(pathCover, (error) => {
          console.log(id, error);
        });
      }
      // memperbarui foto sesuai dengan inputan
      book.cover = request.file.filename;
    }
    //jalankan proses upload
    bookModel.update(book, { where: { id: id } })
      //jika berhasil maka buka promise dengan then
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: "Data book has been updated",
        });
      })
      //jika gagal maka buka promise dengan catch
      .catch((error) => {
        return response.json({
          succes: false,
          message: error.message,
        });
      });
  });
};

//mengeksport variabel supaya bisa digunakan di file lain
exports.deleteBook = async (req, res) => {
  //mengambil id menggunakan params
  const id = req.params.id;
  //menyiapkan data book sesuai dengan id
  const book = await bookModel.findOne({ where: { id: id } });
  //menyiapkan foto book di variabel
  const oldCoverBook = book.cover;
  //menamakan foto sesuai dengan nama folder
  const pathCover = path.join(__dirname, `../cover`, oldCoverBook.toString());
  //jika foto ditemukan maka akan dihapus
  if (fs.existsSync(pathCover)) {
    fs.unlink(pathCover, (error) => console.log(error));
  }
  //menjalankan perintah hapus
  bookModel.destroy({ where: { id: id } })
    //jika berhasil maka buka promise dengan then
    .then((result) => {
      return res.json({
        success: true,
        message: "book deleted",
      });
    })
    //jika gagal buka promise dengan catch
    .catch((error) => {
      return res.json({
        success: false,
        message: error.message,
      });
    });
};
