const { connect } = require('./config/mongodb')
const express = require('express')
const router = require('./routes/routeTvseries')
const app = express()
const port = process.env.PORT || 4002
const cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/tvseries', router)

connect().then(async (database) => {
    
    app.listen(port, () => {
        console.log(`TV Series Services running at http://localhost:${port}`)
    })
})