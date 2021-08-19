const { gql } = require('apollo-server')
const { ApolloError } = require('apollo-server-errors')
const {instanceMovies: axios} = require('../axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDef = gql`
    extend type Query {
        getMoviesAll(input: String): [Format]
        getMovies(id: ID!): Format
    }

    extend type Mutation {
        addMovies(input: Form!): Format
        updateMovies(id: ID!, input: Form!): Format
        delMovies(id: ID!): Message
    }  
`

const resolvers = {
    Query: {
        getMoviesAll: async(_, args) => {
            try {
                let result = null
                const {input} = args
                const movies = await redis.get('movies')
                if (movies) {
                    result = JSON.parse(movies)
                } 
                else {
                    const {data} = await axios({
                        method: 'get'
                    })
                    redis.set('movies', JSON.stringify(data))
                    result = data
                }
                if (!input) {
                    return result
                }
                else {
                    const find = new RegExp(input, 'i');
                    const filtered = result.filter(el => el.title.match(find))
                    return filtered
                }
            }
            catch(err) {
                throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
            }

        },
        getMovies: async (_, args) => {
            try {
                const id = args.id
                let movieOne = await redis.get('movieOne')
                movieOne = JSON.parse(movieOne)
                
                if (movieOne && movieOne._id === id) {
                    return movieOne
                } 
                else {
                    const {data} = await axios({
                        method: 'get',
                        url: `/${id}`
                    })
                    return data
                }
            }
            catch (err) {
                if (err.response.status === 404) {
                    throw new ApolloError('Movie Not Found', 'NOT_FOUND')
                } 
                else {
                    throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
                }
            }
        }
    },
    Mutation: {
        addMovies: async(_, args) => {
            try {
                const {title, overview, poster_path, popularity, tags} = args.input
                const input = {title, overview, poster_path, popularity, tags}
                
                const {data} = await axios({
                    method: 'post',
                    data: input
                })
                redis.del('entertainme')
                redis.del('movies')
                return data
            }
            catch (err) {
                console.log("testt");
                throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
            }
        },
        updateMovies: async(_, args) => {
            try {
                const id = args.id
                const {title, overview, poster_path, popularity, tags} = args.input
                const input = {title, overview, poster_path, popularity, tags}
                
                const {data} = await axios({
                    method: 'put',
                    url: `/${id}`,
                    data: input
                })
                redis.del('entertainme')
                redis.del('movies')
                return data
            }
            catch (err) {
                if (err.response.status === 404) {
                    throw new ApolloError('Movie Not Found', 'NOT_FOUND')
                } 
                else {
                    throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
                }
            }
        },
        delMovies: async(_, args) => {
            try {
                const id = args.id
                await axios({
                    method: 'delete',
                    url: `/${id}`
                })
                redis.del('entertainme')
                redis.del('movies')
                return ({'message': 'Delete Item Success'})
            }
            catch (err) {
                if (err.response.status === 404) {
                    console.log('errrr');
                    throw new ApolloError('Movie Not Found', 'NOT_FOUND')
                } 
                else {
                    throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
                }
            }
        }
    }
}


module.exports = { typeDef, resolvers }