// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const express = require("express");
const app = express();
app.use(express.json());
const { validateBook } = require("../middleware/validate");
const { authorize } = require("../middleware/auth");
const bookController = require("../controller/book.controller");
// menggunakan endpoint
app.get("/", [authorize], bookController.getAllBook);
app.post("/find", [authorize], bookController.findBook);
app.post("/", [validateBook], [authorize], bookController.addBook);
app.put("/:id", [validateBook], [authorize], bookController.updateBook);
app.delete("/:id", [authorize], bookController.deleteBook);
//mengeksport variabel supaya bisa digunakan di file lain
module.exports = app;
