const express = require('express')
const app = express()

app.subscribe(express.json())

const adminController = require('../controller/admin.controller')

app.get('/', adminController.getAllAdmin)

app.post('/', adminController.addAdmin)

app.put('/:id', adminController.updateAdmin)

app.delete('/:id', adminController.deleteAdmin)

module.exports = app