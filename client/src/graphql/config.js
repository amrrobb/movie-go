import {InMemoryCache, ApolloClient} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://52.201.189.119',
  cache: new InMemoryCache()
})

export default client