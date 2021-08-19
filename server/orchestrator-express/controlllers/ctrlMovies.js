const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class Controller {
    static async findAll (req, res) {
        try {
            const movies = await redis.get('movies')
            if (movies) {
                res.status(200).json(JSON.parse(movies))
            } 
            else {
                const {data} = await axios({
                    method: 'get',
                    url: 'http://localhost:4001/movies'
                })
                redis.set('movies', JSON.stringify(data))
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
            let movieOne = await redis.get('movieOne')
            movieOne = JSON.parse(movieOne)
            
            if (movieOne && movieOne._id === id) {
                res.status(200).json(movieOne)
            } 
            else {
                const {data} = await axios({
                    method: 'get',
                    url: `http://localhost:4001/movies/${id}`
                })
                redis.set('movieOne', JSON.stringify(data))
                res.status(200).json(data)
            }
        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'Movie Not Found'})
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
            
            // const data = await Model.create(input)
            const {data} = await axios({
                method: 'post',
                url: 'http://localhost:4001/movies',
                data: input
            })
            redis.del('entertainme')
            redis.del('movies')
            res.status(201).json(data)
        }
        catch (err) {
            res.status(500).json({'message': 'Internal Server Error'})
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
                url: `http://localhost:4001/movies/${id}`,
                data: input
            })
            redis.del('entertainme')
            redis.del('movies')
            res.status(200).json(data)

        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'Movie Not Found'})
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
                url: `http://localhost:4001/movies/${id}`
            })

            redis.del('entertainme')
            redis.del('movies')
            res.status(200).json({'message': 'Delete Item Success'})

        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'Movie Not Found'})

            } else {
                res.status(500).json({'message': 'Internal Server Error'})
            }
        }
    }


}

module.exports = Controller