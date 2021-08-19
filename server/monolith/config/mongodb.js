const { MongoClient, ObjectId } = require('mongodb')
// Connection URL
const url = 'mongodb://localhost:27017'
let database = null

async function connect() {
    const client = new MongoClient(url)
    const dbName = 'entertainMeDB'

    await client.connect()
    const db = client.db(dbName)
    database = db

    return db
} 

function getDatabase () {
    return database
}

module.exports = {
    connect,
    getDatabase,
    ObjectId
}