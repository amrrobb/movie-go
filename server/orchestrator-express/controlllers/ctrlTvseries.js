const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class Controller {
    static async findAll (req, res) {
        try {
            const tvseries = await redis.get('tvseries')
            if (tvseries) {
                res.status(200).json(JSON.parse(tvseries))
            } 
            else {
                const {data} = await axios({
                    method: 'get',
                    url: 'http://localhost:4002/tvseries'
                })
                redis.set('tvseries', JSON.stringify(data))
                res.status(200).json(data)
            }
        }
        catch(err) {
            res.status(500).json({'message': 'Internal Server Error'})
        }
    }

    static async findOne (req, res) {
        try {
            const id = req.params.id
            let tvseriesOne = await redis.get('tvseriesOne')
            tvseriesOne = JSON.parse(tvseriesOne)
            
            if (tvseriesOne && tvseriesOne._id === id) {
                res.status(200).json(tvseriesOne)
            } 
            else {
                const {data} = await axios({
                    method: 'get',
                    url: `http://localhost:4002/tvseries/${id}`
                })
                redis.set('tvseriesOne', JSON.stringify(data))
                res.status(200).json(data)
            }
        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'TV Series Not Found'})
            } 
            else {
                res.status(500).json({'message': 'Internal Server Error'})

            }
        }
    }

    static async create (req, res) {
        try {
            const {title, overview, poster_path, popularity, tags} = req.body
            if (!title || !overview || !poster_path || !popularity || !tags) {
                res.status(400).json({'message': 'The field/s cannot be empty'})
            }
            const input = {title, overview, poster_path, popularity, tags}
            
            const {data} = await axios({
                method: 'post',
                url: 'http://localhost:4002/tvseries',
                data: input
            })
            redis.del('entertainme')
            redis.del('tvseries')
            res.status(201).json(data)
        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'TV Series Not Found'})
            } 
            else {
                res.status(500).json({'message': 'Internal Server Error'})

            }
        }
    }

    static async update (req, res) {
        try {

            const id = req.params.id
            const {title, overview, poster_path, popularity, tags} = req.body
            if (!title || !overview || !poster_path || !popularity || !tags) {
                res.status(400).json({'message': 'The field/s cannot be empty'})
            }
            const input = {title, overview, poster_path, popularity, tags}
            
            const {data} = await axios({
                method: 'put',
                url: `http://localhost:4002/tvseries/${id}`,
                data: input
            })

            // res.status(200).json({'message': 'Update Item Success'})
            redis.del('tvseries')
            res.status(200).json(data)
            
        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'TV Series Not Found'})
            } 
            else {
                res.status(500).json({'message': 'Internal Server Error'})

            }
        }
    }   
    
    static async delete (req, res) {
        try {
            const id = req.params.id
            await axios({
                method: 'delete',
                url: `http://localhost:4002/tvseries/${id}`
            })
            redis.del('entertainme')
            redis.del('tvseries')
            res.status(200).json({'message': 'Delete Item Success'})
        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'TV Series Not Found'})
            } 
            else {
                res.status(500).json({'message': 'Internal Server Error'})

            }
        }
    }


}

module.exports = Controller