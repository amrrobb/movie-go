const { connect } = require('./config/mongodb')
const express = require('express')
const router = require('./routes/routeMovies')
const app = express()
const port = process.env.PORT || 4001
const cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/movies', router)

connect().then(async (database) => {
    
    app.listen(port, () => {
      console.log(`Movies Services running at http://localhost:${port}`)
    })
})