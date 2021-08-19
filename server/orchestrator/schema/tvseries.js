const { gql } = require('apollo-server')
const { ApolloError } = require('apollo-server-errors')
const {instanceTvSeries: axios} = require('../axios')
const Redis = require('ioredis')
const redis = new Redis()

const typeDef = gql`
    extend type Query {
        getTvSeriesAll(input: String): [Format]
        getTvSeries(id: ID!): Format
    }

    extend type Mutation {
        addTvSeries(input: Form!): Format
        updateTvSeries(id: ID!, input: Form!): Format
        delTvSeries(id: ID!): Message
    }  
`

const resolvers = {
    Query: {
        getTvSeriesAll: async(_, args) => {
            try {
                let result = null
                const {input} = args
                const tvseries = await redis.get('tvseries')
                if (tvseries) {
                    result = (JSON.parse(tvseries))
                } 
                else {
                    const {data} = await axios({
                        method: 'get',
                    })
                    redis.set('tvseries', JSON.stringify(data))
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
        getTvSeries: async (_, args) => {
            try {
                const id = args.id
                let tvseriesOne = await redis.get('tvseriesOne')
                tvseriesOne = JSON.parse(tvseriesOne)
                
                if (tvseriesOne && tvseriesOne._id === id) {
                    return tvseriesOne
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
                    throw new ApolloError('Tv Series Not Found', 'NOT_FOUND')
                } 
                else {
                    throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
                }
            }
        }
    },
    Mutation: {
        addTvSeries: async(_, args) => {
            try {
                const {title, overview, poster_path, popularity, tags} = args.input
                const input = {title, overview, poster_path, popularity, tags}
                
                const {data} = await axios({
                    method: 'post',
                    data: input
                })
                redis.del('entertainme')
                redis.del('tvseries')
                return data
            }
            catch (err) {
                throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
            }
        },
        updateTvSeries: async(_, args) => {
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
                redis.del('tvseries')
                return data
            }
            catch (err) {
                // console.log('errrr', err);
                if (err.response.status === 404) {
                    throw new ApolloError('Tv Series Not Found', 'NOT_FOUND')
                } 
                else {
                    throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
                }
            }
        },
        delTvSeries: async(_, args) => {
            try {
                const id = args.id
                await axios({
                    method: 'delete',
                    url: `/${id}`
                })
                redis.del('entertainme')
                redis.del('tvseries')
                return ({'message': 'Delete Item Success'})
            }
            catch (err) {
                if (err.response.status === 404) {
                    throw new ApolloError('Tv Series Not Found', 'NOT_FOUND')
                } 
                else {
                    throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
                }
            }
        }
    }
}


module.exports = { typeDef, resolvers }