// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const express = require("express");
const app = express();
app.use(express.json());
const bookController = require("../controller/book.controller");
// menggunakan endpoint
app.get("/", bookController.getAllBook);
app.post("/find", bookController.findBook);
app.post("/", bookController.addBook);
app.put("/:id", bookController.updateBook);
app.delete("/:id", bookController.deleteBook);
//mengeksport variabel supaya bisa digunakan di file lain
module.exports = app;
