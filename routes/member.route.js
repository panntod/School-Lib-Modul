// mengimport variabel dari file lain dan dependensi yang dibutuhkan
const express= require('express')
const app = express()
app.use(express.json())
const { validateMember } = require('../middleware/validate')
const { authorize } = require('../middleware/auth')
const memberController = require('../controller/member.controller')
// menggunakan enpoint
app.get('/', [authorize], memberController.getAllMember)
app.post('/', memberController.addMember)
app.post('/find', [authorize], memberController.findMember)
app.put('/:id', [authorize], memberController.updateMember)
app.delete('/:id', [authorize], memberController.deleteMember)
//mengeksport variabel supaya bisa digunakan di file lain
module.exports = app