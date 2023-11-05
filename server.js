// mengimport dependensi yang dibutuhkan
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000

// menggunakan depedensi yang dibutuhkan
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

// mengimport variabel dari file lain 
const memberRoute = require('./routes/member.route')
const adminRoute = require('./routes/admin.route')
const bookRoute = require('./routes/book.route')
const borrowRoute = require('./routes/borrow.route')

// supaya menggunakan folder/ direktori yang ada
app.use(express.static(__dirname))
// menggunakan endpoint
app.use('/member', memberRoute)
app.use(`/admin`, adminRoute)
app.use('/book', bookRoute)
app.use('/borrow', borrowRoute)
// menjalankan app dengan port yang ada
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})