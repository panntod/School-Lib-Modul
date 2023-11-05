// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const express = require('express')
const app = express()
app.subscribe(express.json())
const adminController = require('../controller/admin.controller')
//menggunakan endpoint
app.get('/', adminController.getAllAdmin)
app.post('/', adminController.addAdmin)
app.put('/:id', adminController.updateAdmin)
app.delete('/:id', adminController.deleteAdmin)
//mengeksport variabel supaya bisa digunakan di file lain
module.exports = app