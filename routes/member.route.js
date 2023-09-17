const express= require('express')
const app = express()

app.use(express.json())

const memberController = require('../controller/member.controller')

app.get('/', memberController.getAllMember)

app.post('/', memberController.addMember)

app.post('/find', memberController.findMember)

app.put('/', memberController.updateMember)

app.delete('/', memberController.deleteMember)

module.exports = app