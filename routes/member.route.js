// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const express= require('express')
const app = express()
app.use(express.json())
const memberController = require('../controller/member.controller')
// menggunakan enpoint
app.get('/', memberController.getAllMember)
app.post('/', memberController.addMember)
app.post('/find', memberController.findMember)
app.put('/:id', memberController.updateMember)
app.delete('/:id', memberController.deleteMember)
//mengeksport variabel supaya bisa digunakan di file lain
module.exports = app