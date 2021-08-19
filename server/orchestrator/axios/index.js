const axios = require('axios')

const instanceMovies = axios.create({
    baseURL: 'http://3.235.157.103/movies',
  });

const instanceTvSeries = axios.create({
    baseURL: 'http://3.83.245.235/tvseries',
  });

module.exports = {instanceMovies, instanceTvSeries}