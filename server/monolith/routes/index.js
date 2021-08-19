const router = require('express').Router()
const movies = require('./routeMovies')
const tvseries = require('./routeTvseries')

// router.get('/', async (req, res) => {
//     res.send('Hello World!')
//   })
  

router.use('/movies', movies)
router.use('/tvseries', tvseries)

module.exports = router
