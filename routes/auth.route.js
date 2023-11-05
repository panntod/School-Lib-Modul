const express = require("express");
const app = express();
app.use(express.json());
const { authenticate } = require("../controller/auth.controller");

app.post('/', authenticate)

module.exports = app
