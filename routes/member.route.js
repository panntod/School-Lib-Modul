const express= require('express')
const app = express()

app.use(express.json())

const memberController = require('../controller/member.controller')

app.get('/', memberController.getAllMember)

app.post('/', memberController.addMember)

app.post('/find', memberController.findMember)

app.put('/:id', memberController.updateMember)

app.delete('/:id', memberController.deleteMember)

module.exports = app