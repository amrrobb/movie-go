const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class Controller {
    static async findAll(req, res) {
        try {
            const entertainme = await redis.get('entertainme')
            if (entertainme) {
                res.status(200).json(JSON.parse(entertainme))
            }
            else {
                const {data: movies} = await axios({
                    method: 'get',
                    url: 'http://localhost:4001/movies'
                })
                const {data: tvSeries} = await axios({
                    method: 'get',
                    url: 'http://localhost:4002/tvseries'
                })
                redis.set('entertainme', JSON.stringify({movies, tvSeries}))
                res.status(200).json({movies, tvSeries})
            }
        } catch (err) {
            res.status(500).json({"message": "Internal Server Error"})
        }
    }
}

module.exports = Controller