const { ApolloServer} = require('apollo-server')
const schema = require('./schema')
const PORT = process.env.PORT || 4000

const server = new ApolloServer({
  schema, 
  cors: true
});


// The `listen` method launches a web server.
server.listen({port: PORT}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});