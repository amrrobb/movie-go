const { getDatabase, ObjectId } = require('../config/mongodb')

class Model {
    static collection() {
        return getDatabase().collection('Movies')
    }

    static async findAll () {
        try {
            const data = await Model.collection().find().toArray()
            return data
            
        } catch (error) {}
    }

    static async findOne (id) {
        try {
            const data = await Model.collection().findOne({"_id": ObjectId(id)})
            return data 
            
        } catch (error) {}
    }

    static async create (input) {
        try {
            const data = Model.collection()
            const { insertedId } = await data.insertOne(input)
            return await data.findOne(insertedId)
            
        } catch (error) {}
    }

    static async update (input, id) {   
        try {
            const data = Model.collection()
            await data.updateOne(
                {"_id": ObjectId(id)}, 
                { $set: input }
                )
            return await Model.findOne(id) 

        } catch (error) {}
    }

    static async delete (id) {
        try {
            const data = Model.collection()
            const findOne = await Model.findOne(id)
            if (findOne) {
                await data.deleteOne(
                    {"_id": ObjectId(id)}, 
                )
                return true
            } else {
                return false
            }
            
        } catch (error) {}

    }
}

module.exports = Model