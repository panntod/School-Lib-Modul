const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')

app.use(cors())
const memberRoute = require('./routes/member.route')

app.use('/member', memberRoute)

app.listen(port, () => {
    console.log('Server is running...')
})