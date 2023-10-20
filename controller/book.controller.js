const upload = require("./upload-cover").single(`cover`);
const bookModel = require("../models/index").book;
const Op = require("sequelize").Op;
const path = require("path");
const fs = require("fs");

exports.getAllBook = async (req, res) => {
  let books = await bookModel.findAll();
  return res.json({
    success: true,
    data: books,
    message: "All books have been loaded",
  });
};

exports.findBook = async (req, res) => {
  let keyword = req.body.keyword;
  let books = await bookModel.findAll({
    where: {
      [Op.or]: [{ isbn: { [Op.substring]: keyword } }],
    },
  });
  return res.json({
    success: true,
    data: books,
    message: "All books have been loaded",
  });
};

exports.addBook = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.json({ message: error });
    }
    if (!req.file) {
      return res.json({ message: "nothing to upload" });
    }
    let newBook = {
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      category: req.body.category,
      stock: req.body.stock,
      cover: req.file.filename,
    };
    bookModel
      .create(newBook)
      .then((result) => {
        return res.json({
          success: true,
          data: result,
          message: "new book has been inserted",
        });
      })
      .catch((error) => {
        return res.json({
          success: false,
          message: error.message,
        });
      });
  });
};
exports.updateBook = async (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      return response.json({ message: error });
    }
    let id = request.params.id;
    let book = {
      isbn: request.body.isbn,
      title: request.body.title,
      author: request.body.author,
      publisher: request.body.publisher,
      category: request.body.category,
      stock: request.body.stock,
    };
    if (request.file) {
      const selectedBook = await bookModel.findOne({ where: { id: id } });
      const oldCoverBook = selectedBook.cover;
      const pathCover = path.join(__dirname, `../cover`, oldCoverBook.toString());
      if (fs.existsSync(pathCover)) {
        fs.unlink(pathCover, (error) => {
          console.log(id, error);
        });
      }
      book.cover = request.file.filename;
    }
    bookModel
      .update(book, { where: { id: id } })
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: "Data book has been updated",
        });
      })
      .catch((error) => {
        return response.json({
          succes: false,
          message: error.message,
        });
      });
  });
};
exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  const book = await bookModel.findOne({ where: { id: id } });
  const oldCoverBook = book.cover;
  const pathCover = path.join(__dirname, `../cover`, oldCoverBook.toString());
  if (fs.existsSync(pathCover)) {
    fs.unlink(pathCover, (error) => console.log(error));
  }
  bookModel
    .destroy({ where: { id: id } })
    .then((result) => {
      return res.json({
        success: true,
        message: "book deleted",
      });
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: error.message,
      });
    });
};
