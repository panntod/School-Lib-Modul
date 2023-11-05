const express = require("express");
const app = express();
app.use(express.json());
const { authenticate } = require("../middleware/auth");

app.post('/', authenticate)

module.exports = app
