const express = require('express')
const app = express()

app.use(express.json())
const borrowController = require('../controller/borrow.controller')

app.post("/", borrowController.addBorrowing)
app.put("/:id", borrowController.updateBorrowing)
app.delete("/:id", borrowController.deleteBorrowing)
app.get("/return/:id", borrowController.returnBook)
app.get("/", borrowController.getBorrow )

module.exports = app