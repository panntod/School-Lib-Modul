const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

const memberRoute = require('./routes/member.route')
const adminRoute = require('./routes/admin.route')
const bookRoute = require('./routes/book.route')

app.use(express.static(__dirname))
app.use('/member', memberRoute)
app.use('/admin', adminRoute)
app.use('/book', bookRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})