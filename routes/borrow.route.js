// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const borrowController = require('../controller/borrow.controller')
const express = require('express')
const app = express()
app.use(express.json())
//menggunakan endpoint
app.post("/", borrowController.addBorrowing)
app.put("/:id", borrowController.updateBorrowing)
app.delete("/:id", borrowController.deleteBorrowing)
app.get("/return/:id", borrowController.returnBook)
app.get("/", borrowController.getBorrow )
//mengeksport variabel supaya bisa digunakan di file lain
module.exports = app