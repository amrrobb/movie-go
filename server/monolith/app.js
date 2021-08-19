const { connect } = require('./config/mongodb')
const express = require('express')
const router = require('./routes')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', router)

connect().then(async (database) => {
    
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
})