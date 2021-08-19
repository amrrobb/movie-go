const Model = require('../models/tvseries')

class Controller {
    static async findAll (req, res) {
        
        try {
            const data = await Model.findAll()
            res.status(200).json(data)
        }
        catch(err) {
            res.status(500).json({'message': 'Internal Server Error'})
        }
    }

    static async findOne (req, res) {
        try {
            const id = req.params.id
            const data = await Model.findOne(id)
            res.status(200).json(data)
            
        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'TV Series Not Found'})

            } else {
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
            
            const data = await Model.create(input)

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
            
            const data = await Model.update(input, id)
            res.status(200).json(data)
            // res.status(200).json({'message': 'Update Item Success'})
            
        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'TV Series Not Found'})

            } else {
                res.status(500).json({'message': 'Internal Server Error'})
            }
        }
    }   
    
    static async delete (req, res) {
        try {
            const id = req.params.id
            await Model.delete(id)
            res.status(200).json({'message': 'Delete Item Success'})
            
        }
        catch (err) {
            if (err.response.status === 404) {
                res.status(404).json({'message': 'TV Series Not Found'})

            } else {
                res.status(500).json({'message': 'Internal Server Error'})
            }
        }
    }
}

module.exports = Controller