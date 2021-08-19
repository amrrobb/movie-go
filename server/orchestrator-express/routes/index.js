const router = require('express').Router()
const movies = require('./routeMovies')
const tvseries = require('./routeTvseries')
const entertainme = require('../controlllers/ctrlEntertainMe')

router.get('/',  entertainme.findAll) 
router.use('/movies', movies)
router.use('/tvseries', tvseries)

module.exports = router
