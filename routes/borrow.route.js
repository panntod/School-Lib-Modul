// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const borrowController = require('../controller/borrow.controller')
const { authorize } = require('../middleware/auth')
const express = require('express')
const app = express()
app.use(express.json())
//menggunakan endpoint
app.post("/", [authorize],  borrowController.addBorrowing)
app.put("/:id", [authorize], borrowController.updateBorrowing)
app.delete("/:id", [authorize], borrowController.deleteBorrowing)
app.get("/return/:id", [authorize], borrowController.returnBook)
app.get("/", [authorize], borrowController.getBorrow )
//mengeksport variabel supaya bisa digunakan di file lain
module.exports = app