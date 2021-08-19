const { gql } = require('apollo-server')
const {instanceMovies, instanceTvSeries} = require('../axios')
const { merge } = require('lodash')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const { typeDef: Movies, resolvers: moviesResolvers } = require('./movies')
const { typeDef: TVSeries, resolvers: tvseriesResolvers } = require('./tvseries')
const Redis = require('ioredis')
const redis = new Redis()

const Query = gql`
  type Format {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Message {
        message: String
    }

  input Form {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  type Entertain {
    movies: [Format]
    tvSeries: [Format]
  }

  type Query {
    getAll: Entertain
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
    Query: {
      getAll: async () => {
        try {
          const entertainme = await redis.get('entertainme')
          if (entertainme) {
            // console.log('from redis');
            return (JSON.parse(entertainme))
          }
          else {
              // console.log('not from redis');
              const {data: movies} = await instanceMovies({
                  method: 'get',
              })
              const {data: tvSeries} = await instanceTvSeries({
                  method: 'get',
              })
              redis.set('entertainme', JSON.stringify({movies, tvSeries}))
              return ({movies, tvSeries})
          }
        }  
        catch (err) {
            throw new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
        }
      },
    }
};


const schema = makeExecutableSchema({
    typeDefs: [ Query, Movies, TVSeries ],
    resolvers: merge(resolvers, moviesResolvers, tvseriesResolvers)
});

module.exports = schema