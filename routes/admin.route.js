// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const express = require('express')
const app = express()
app.subscribe(express.json())
const { authorize } = require('../middleware/auth')
const adminController = require('../controller/admin.controller')
//menggunakan endpoint
app.get('/', [authorize], adminController.getAllAdmin)
app.post('/', [authorize], adminController.addAdmin)
app.put('/:id', [authorize], adminController.updateAdmin)
app.delete('/:id', [authorize], adminController.deleteAdmin)
//mengeksport variabel supaya bisa digunakan di file lain
module.exports = app